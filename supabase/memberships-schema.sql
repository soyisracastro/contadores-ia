-- =====================================================
-- TABLA DE MEMBRESÍAS - CONTADORES IA
-- =====================================================
-- Este script crea la tabla de membresías y todas las
-- políticas de seguridad necesarias.
--
-- INSTRUCCIONES:
-- 1. Ve a tu proyecto en Supabase
-- 2. Abre el SQL Editor
-- 3. Copia y pega este script completo
-- 4. Ejecuta (Run)
-- =====================================================

-- Tabla principal de membresías
CREATE TABLE IF NOT EXISTS public.memberships (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  plan_type TEXT NOT NULL CHECK (plan_type IN ('monthly', 'semester', 'annual', 'lifetime')),
  status TEXT NOT NULL CHECK (status IN ('active', 'expired', 'cancelled', 'pending')) DEFAULT 'active',
  start_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  end_date TIMESTAMPTZ,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Comentarios en las columnas para documentación
COMMENT ON TABLE public.memberships IS 'Membresías de usuarios premium de Contadores IA';
COMMENT ON COLUMN public.memberships.user_id IS 'Referencia al usuario en auth.users (puede ser NULL si aún no se registra)';
COMMENT ON COLUMN public.memberships.email IS 'Email del usuario (usado para matching cuando se registre)';
COMMENT ON COLUMN public.memberships.name IS 'Nombre del usuario para referencia';
COMMENT ON COLUMN public.memberships.plan_type IS 'Tipo de plan: monthly, semester, annual, lifetime';
COMMENT ON COLUMN public.memberships.status IS 'Estado: active, expired, cancelled, pending';
COMMENT ON COLUMN public.memberships.end_date IS 'Fecha de vencimiento (NULL para lifetime)';
COMMENT ON COLUMN public.memberships.stripe_customer_id IS 'ID del customer en Stripe';
COMMENT ON COLUMN public.memberships.stripe_subscription_id IS 'ID de la suscripción en Stripe';
COMMENT ON COLUMN public.memberships.metadata IS 'Datos adicionales en formato JSON';

-- Índices para mejorar performance
CREATE INDEX IF NOT EXISTS idx_memberships_user_id ON public.memberships(user_id);
CREATE INDEX IF NOT EXISTS idx_memberships_email ON public.memberships(email);
CREATE INDEX IF NOT EXISTS idx_memberships_status ON public.memberships(status);
CREATE INDEX IF NOT EXISTS idx_memberships_stripe_customer ON public.memberships(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_memberships_end_date ON public.memberships(end_date);

-- =====================================================
-- POLÍTICAS RLS (Row Level Security)
-- =====================================================

-- Habilitar RLS en la tabla
ALTER TABLE public.memberships ENABLE ROW LEVEL SECURITY;

-- Política: Los usuarios pueden leer solo su propia membresía
CREATE POLICY "Users can view own membership"
  ON public.memberships
  FOR SELECT
  USING (
    auth.uid() = user_id
    OR
    auth.email() = email
  );

-- Política: Solo service_role puede insertar membresías
CREATE POLICY "Service role can insert memberships"
  ON public.memberships
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Política: Solo service_role puede actualizar membresías
CREATE POLICY "Service role can update memberships"
  ON public.memberships
  FOR UPDATE
  TO service_role
  USING (true);

-- Política: Solo service_role puede eliminar membresías
CREATE POLICY "Service role can delete memberships"
  ON public.memberships
  FOR DELETE
  TO service_role
  USING (true);

-- =====================================================
-- FUNCIONES HELPER
-- =====================================================

-- Función para verificar si un usuario tiene membresía activa
CREATE OR REPLACE FUNCTION public.is_membership_active(p_user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM public.memberships
    WHERE user_id = p_user_id
      AND status = 'active'
      AND (
        plan_type = 'lifetime'
        OR end_date > NOW()
      )
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION public.is_membership_active IS 'Verifica si un usuario tiene una membresía activa y no vencida';

-- Función para obtener la membresía de un usuario por email
CREATE OR REPLACE FUNCTION public.get_membership_by_email(p_email TEXT)
RETURNS TABLE (
  id UUID,
  user_id UUID,
  email TEXT,
  name TEXT,
  plan_type TEXT,
  status TEXT,
  start_date TIMESTAMPTZ,
  end_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    m.id,
    m.user_id,
    m.email,
    m.name,
    m.plan_type,
    m.status,
    m.start_date,
    m.end_date,
    m.created_at
  FROM public.memberships m
  WHERE m.email = p_email;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION public.get_membership_by_email IS 'Obtiene la membresía de un usuario por su email';

-- Función para actualizar automáticamente el campo updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para actualizar updated_at automáticamente
DROP TRIGGER IF EXISTS update_memberships_updated_at ON public.memberships;
CREATE TRIGGER update_memberships_updated_at
  BEFORE UPDATE ON public.memberships
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Función para marcar membresías expiradas automáticamente
CREATE OR REPLACE FUNCTION public.mark_expired_memberships()
RETURNS INTEGER AS $$
DECLARE
  updated_count INTEGER;
BEGIN
  UPDATE public.memberships
  SET status = 'expired'
  WHERE status = 'active'
    AND plan_type != 'lifetime'
    AND end_date < NOW();

  GET DIAGNOSTICS updated_count = ROW_COUNT;
  RETURN updated_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION public.mark_expired_memberships IS 'Marca como expiradas las membresías cuya fecha de vencimiento ha pasado';

-- =====================================================
-- VISTA PARA ESTADÍSTICAS (OPCIONAL)
-- =====================================================

CREATE OR REPLACE VIEW public.membership_stats AS
SELECT
  plan_type,
  status,
  COUNT(*) as count,
  COUNT(*) FILTER (WHERE end_date > NOW() OR plan_type = 'lifetime') as active_count,
  COUNT(*) FILTER (WHERE end_date <= NOW() AND plan_type != 'lifetime') as expired_count
FROM public.memberships
GROUP BY plan_type, status;

COMMENT ON VIEW public.membership_stats IS 'Vista con estadísticas de membresías por tipo y estado';

-- =====================================================
-- GRANT PERMISSIONS
-- =====================================================

-- Permitir a authenticated users leer la vista de stats
GRANT SELECT ON public.membership_stats TO authenticated;

-- =====================================================
-- FINALIZACIÓN
-- =====================================================

-- Verificar que todo se creó correctamente
DO $$
BEGIN
  RAISE NOTICE '✅ Tabla memberships creada exitosamente';
  RAISE NOTICE '✅ Índices creados';
  RAISE NOTICE '✅ Políticas RLS configuradas';
  RAISE NOTICE '✅ Funciones helper creadas';
  RAISE NOTICE '✅ Triggers configurados';
  RAISE NOTICE '✅ Vista de estadísticas creada';
  RAISE NOTICE '';
  RAISE NOTICE '📋 Próximo paso: Ejecutar el script de importación de usuarios';
END $$;
