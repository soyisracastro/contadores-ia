import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';
import { supabase } from '../../lib/supabase';

export const GET: APIRoute = async ({ request, cookies, redirect }) => {
  try {
    const url = new URL(request.url);
    console.log('Callback URL:', url.toString());
    console.log('Hash:', url.hash);

    // Verificar si hay errores en la URL
    const error = url.searchParams.get('error');
    const errorCode = url.searchParams.get('error_code');

    if (error) {
      console.error('Auth error:', error, errorCode);
      return redirect('/login?error=auth_error');
    }

    // Verificar si hay un código de autorización en los parámetros de búsqueda
    const code = url.searchParams.get('code');
    console.log('Code parameter:', code);

    if (code) {
      console.log('Found authorization code, exchanging for session');

      // Crear cliente de Supabase para el servidor
      const supabase = createClient(
        import.meta.env.PUBLIC_SUPABASE_URL,
        import.meta.env.SUPABASE_SERVICE_ROLE_KEY || import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
        {
          auth: {
            autoRefreshToken: false,
            persistSession: false,
            detectSessionInUrl: false,
          },
        }
      );

      // Verificar la sesión usando exchangeCodeForSession
      const { data, error: sessionError } = await supabase.auth.exchangeCodeForSession(code);

      if (sessionError) {
        console.error('Error exchanging code for session:', sessionError);
        return redirect('/login?error=session_error');
      }

      if (!data.session || !data.user) {
        console.error('No session or user data after exchange');
        return redirect('/login?error=no_session');
      }

      // Guardar la sesión en cookies
      cookies.set('sb-access-token', data.session.access_token, {
        path: '/',
        httpOnly: true,
        secure: import.meta.env.PROD,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7 // 7 días
      });

      cookies.set('sb-refresh-token', data.session.refresh_token, {
        path: '/',
        httpOnly: true,
        secure: import.meta.env.PROD,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30 // 30 días
      });

      console.log('Auth callback successful for user:', data.user.email);

      // Redirigir al usuario a la página principal
      return redirect('/');
    }

    // Si no hay código ni tokens, redirigir con error
    console.error('No authorization code or tokens found in callback URL');
    return redirect('/login?error=no_auth_data');

  } catch (error) {
    console.error('Auth callback error:', error);
    return redirect('/login?error=callback_error');
  }
};