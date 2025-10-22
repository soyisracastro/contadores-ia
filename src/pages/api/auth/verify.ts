import type { APIRoute } from 'astro';
import { supabase } from '../../../lib/supabase';

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const formData = await request.formData();
    const email = formData.get('email')?.toString();
    const token = formData.get('token')?.toString();

    if (!email || !token) {
      return new Response(JSON.stringify({ error: 'Email y código son requeridos' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Verificar el código OTP
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: 'email'
    });

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Guardar la sesión en cookies
    if (data.session) {
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
    }

    return new Response(JSON.stringify({
      success: true,
      message: 'Autenticación exitosa'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error al procesar la solicitud' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
