/**
 * Tipos TypeScript para el sistema de membresías
 * Contadores IA - Blog Platform
 */

/**
 * Tipos de planes de membresía disponibles
 */
export type PlanType = 'monthly' | 'semester' | 'annual' | 'lifetime';

/**
 * Estados posibles de una membresía
 */
export type MembershipStatus = 'active' | 'expired' | 'cancelled' | 'pending';

/**
 * Interfaz principal de Membresía
 */
export interface Membership {
  id: string;
  user_id: string | null;
  email: string;
  name: string | null;
  plan_type: PlanType;
  status: MembershipStatus;
  start_date: string; // ISO 8601 format
  end_date: string | null; // null para lifetime
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  metadata: Record<string, any>;
  created_at: string;
  updated_at: string;
}

/**
 * Datos para crear una nueva membresía
 */
export interface CreateMembershipData {
  email: string;
  name?: string;
  plan_type: PlanType;
  start_date: Date;
  months_duration?: number; // Para calcular end_date
  user_id?: string;
  metadata?: Record<string, any>;
}

/**
 * Resultado de verificación de acceso premium
 */
export interface PremiumAccessResult {
  hasAccess: boolean;
  membership: Membership | null;
  reason?: 'no_membership' | 'expired' | 'cancelled' | 'not_authenticated';
}

/**
 * Información resumida de membresía para UI
 */
export interface MembershipSummary {
  isActive: boolean;
  planType: PlanType;
  expiresAt: Date | null; // null para lifetime
  daysRemaining: number | null; // null para lifetime
  isExpiringSoon: boolean; // < 30 días
}

/**
 * Helper: Calcula la fecha de vencimiento según el tipo de plan
 */
export function calculateEndDate(startDate: Date, planType: PlanType): Date | null {
  if (planType === 'lifetime') {
    return null;
  }

  const endDate = new Date(startDate);

  switch (planType) {
    case 'monthly':
      endDate.setMonth(endDate.getMonth() + 1);
      break;
    case 'semester':
      endDate.setMonth(endDate.getMonth() + 6);
      break;
    case 'annual':
      endDate.setFullYear(endDate.getFullYear() + 1);
      break;
  }

  return endDate;
}

/**
 * Helper: Verifica si una membresía está activa
 */
export function isMembershipActive(membership: Membership): boolean {
  if (membership.status !== 'active') {
    return false;
  }

  // Lifetime siempre está activa
  if (membership.plan_type === 'lifetime') {
    return true;
  }

  // Verificar fecha de vencimiento
  if (!membership.end_date) {
    return false;
  }

  const now = new Date();
  const endDate = new Date(membership.end_date);

  return endDate > now;
}

/**
 * Helper: Obtiene resumen de membresía para UI
 */
export function getMembershipSummary(membership: Membership): MembershipSummary {
  const isActive = isMembershipActive(membership);
  const planType = membership.plan_type;

  if (planType === 'lifetime') {
    return {
      isActive,
      planType,
      expiresAt: null,
      daysRemaining: null,
      isExpiringSoon: false,
    };
  }

  const expiresAt = membership.end_date ? new Date(membership.end_date) : null;
  const now = new Date();

  const daysRemaining = expiresAt
    ? Math.ceil((expiresAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  const isExpiringSoon = daysRemaining > 0 && daysRemaining <= 30;

  return {
    isActive,
    planType,
    expiresAt,
    daysRemaining: daysRemaining > 0 ? daysRemaining : null,
    isExpiringSoon,
  };
}

/**
 * Helper: Formatea el tipo de plan para display
 */
export function formatPlanType(planType: PlanType): string {
  const labels: Record<PlanType, string> = {
    monthly: 'Mensual',
    semester: 'Semestral',
    annual: 'Anual',
    lifetime: 'Vitalicia',
  };
  return labels[planType];
}

/**
 * Helper: Formatea el estado de membresía para display
 */
export function formatMembershipStatus(status: MembershipStatus): string {
  const labels: Record<MembershipStatus, string> = {
    active: 'Activa',
    expired: 'Expirada',
    cancelled: 'Cancelada',
    pending: 'Pendiente',
  };
  return labels[status];
}

/**
 * Helper: Obtiene la clase de color según el estado
 */
export function getStatusColor(status: MembershipStatus): string {
  const colors: Record<MembershipStatus, string> = {
    active: 'green',
    expired: 'red',
    cancelled: 'gray',
    pending: 'yellow',
  };
  return colors[status];
}
