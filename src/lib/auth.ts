import type { AstroCookies } from 'astro';
import { createClient } from '@supabase/supabase-js';
import type { Membership, PremiumAccessResult } from '../types/membership';
import { isMembershipActive } from '../types/membership';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

/**
 * Obtiene el usuario autenticado desde las cookies
 */
export async function getUser(cookies: AstroCookies) {
  const accessToken = cookies.get('sb-access-token')?.value;
  const refreshToken = cookies.get('sb-refresh-token')?.value;

  if (!accessToken) {
    return null;
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  // Establecer la sesión desde las cookies
  const { data, error } = await supabase.auth.setSession({
    access_token: accessToken,
    refresh_token: refreshToken || '',
  });

  if (error) {
    return null;
  }

  return data.user;
}

/**
 * Verifica si el usuario está autenticado
 */
export async function isAuthenticated(cookies: AstroCookies): Promise<boolean> {
  const user = await getUser(cookies);
  return user !== null;
}

/**
 * Obtiene la membresía del usuario autenticado
 * Busca por user_id o por email si el usuario aún no tiene membresía vinculada
 */
export async function getUserMembership(cookies: AstroCookies): Promise<Membership | null> {
  const user = await getUser(cookies);

  if (!user) {
    return null;
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  // Primero intentar buscar por user_id
  let { data: membership, error } = await supabase
    .from('memberships')
    .select('*')
    .eq('user_id', user.id)
    .single();

  // Si no se encuentra por user_id, buscar por email
  if (!membership && user.email) {
    const result = await supabase
      .from('memberships')
      .select('*')
      .eq('email', user.email)
      .single();

    membership = result.data;
    error = result.error;

    // Si encontramos la membresía por email, actualizar el user_id
    if (membership && membership.user_id !== user.id) {
      await supabase
        .from('memberships')
        .update({ user_id: user.id })
        .eq('id', membership.id);
    }
  }

  if (error || !membership) {
    return null;
  }

  return membership as Membership;
}

/**
 * Verifica si el usuario tiene una membresía activa
 */
export async function hasMembershipActive(cookies: AstroCookies): Promise<boolean> {
  const membership = await getUserMembership(cookies);

  if (!membership) {
    return false;
  }

  return isMembershipActive(membership);
}

/**
 * Verifica si el usuario puede acceder a contenido premium
 * Retorna información detallada sobre el acceso
 */
export async function canAccessPremiumContent(
  cookies: AstroCookies
): Promise<PremiumAccessResult> {
  const user = await getUser(cookies);

  if (!user) {
    return {
      hasAccess: false,
      membership: null,
      reason: 'not_authenticated',
    };
  }

  const membership = await getUserMembership(cookies);

  if (!membership) {
    return {
      hasAccess: false,
      membership: null,
      reason: 'no_membership',
    };
  }

  if (membership.status === 'cancelled') {
    return {
      hasAccess: false,
      membership,
      reason: 'cancelled',
    };
  }

  if (!isMembershipActive(membership)) {
    return {
      hasAccess: false,
      membership,
      reason: 'expired',
    };
  }

  return {
    hasAccess: true,
    membership,
  };
}
