/**
 * Script de Importación de Usuarios a Membresías
 *
 * Este script lee el archivo memberships.csv y crea las membresías
 * en la tabla de Supabase.
 *
 * REQUISITOS:
 * 1. La tabla 'memberships' debe estar creada en Supabase
 * 2. Debes tener el SUPABASE_SERVICE_ROLE_KEY en .env
 *
 * USO:
 *   npx tsx scripts/import-users.ts
 */

import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

// Configuración
const SUPABASE_URL = process.env.PUBLIC_SUPABASE_URL || '';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const CSV_FILE = path.join(process.cwd(), 'memberships.csv');

// Fecha de inicio del taller: 14 de octubre de 2025
const START_DATE = new Date('2025-10-14T00:00:00-06:00'); // Zona horaria de México

interface CsvRow {
  email: string;
  name: string;
  membership: 'lifetime' | 'annual' | 'semester';
}

interface MembershipRecord {
  email: string;
  name: string;
  plan_type: string;
  status: string;
  start_date: string;
  end_date: string | null;
  metadata: {
    imported_at: string;
    source: string;
    notes: string;
  };
}

/**
 * Calcula la fecha de vencimiento según el tipo de membresía
 */
function calculateEndDate(startDate: Date, membershipType: string): Date | null {
  if (membershipType === 'lifetime') {
    return null;
  }

  const endDate = new Date(startDate);

  if (membershipType === 'semester') {
    // 6 meses después
    endDate.setMonth(endDate.getMonth() + 6);
  } else if (membershipType === 'annual') {
    // 12 meses después
    endDate.setFullYear(endDate.getFullYear() + 1);
  }

  return endDate;
}

/**
 * Lee y parsea el archivo CSV
 */
function readCsvFile(filePath: string): CsvRow[] {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n').filter(line => line.trim());

    // Remover header
    const dataLines = lines.slice(1);

    const rows: CsvRow[] = [];

    for (const line of dataLines) {
      // Parsear CSV manualmente (considerando que puede haber comas en los nombres)
      const parts = line.split(',');

      if (parts.length >= 3) {
        const email = parts[0].trim();
        const name = parts[1].trim();
        const membership = parts[2].trim() as 'lifetime' | 'annual' | 'semester';

        if (email && name && membership) {
          rows.push({ email, name, membership });
        }
      }
    }

    return rows;
  } catch (error) {
    console.error('Error leyendo el archivo CSV:', error);
    throw error;
  }
}

/**
 * Convierte una fila CSV a un registro de membresía
 */
function csvRowToMembership(row: CsvRow): MembershipRecord {
  const endDate = calculateEndDate(START_DATE, row.membership);

  return {
    email: row.email,
    name: row.name,
    plan_type: row.membership,
    status: 'active',
    start_date: START_DATE.toISOString(),
    end_date: endDate ? endDate.toISOString() : null,
    metadata: {
      imported_at: new Date().toISOString(),
      source: 'csv_import',
      notes: 'Usuario del taller original - Octubre 2025',
    },
  };
}

/**
 * Importa las membresías a Supabase
 */
async function importMemberships() {
  // Validar variables de entorno
  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    console.error('❌ Error: Faltan variables de entorno');
    console.error('   Asegúrate de tener PUBLIC_SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY en .env');
    process.exit(1);
  }

  // Crear cliente de Supabase con service role key
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  console.log('📋 Iniciando importación de usuarios...\n');

  // Leer CSV
  let rows: CsvRow[];
  try {
    rows = readCsvFile(CSV_FILE);
    console.log(`✅ Archivo CSV leído: ${rows.length} usuarios encontrados\n`);
  } catch (error) {
    console.error('❌ No se pudo leer el archivo CSV');
    process.exit(1);
  }

  // Convertir a registros de membresía
  const memberships = rows.map(csvRowToMembership);

  // Estadísticas
  const stats = {
    lifetime: memberships.filter(m => m.plan_type === 'lifetime').length,
    annual: memberships.filter(m => m.plan_type === 'annual').length,
    semester: memberships.filter(m => m.plan_type === 'semester').length,
  };

  console.log('📊 Distribución de membresías:');
  console.log(`   - Vitalicia: ${stats.lifetime}`);
  console.log(`   - Anual: ${stats.annual}`);
  console.log(`   - Semestral: ${stats.semester}`);
  console.log();

  // Insertar membresías
  console.log('💾 Insertando membresías en Supabase...\n');

  let successCount = 0;
  let errorCount = 0;

  for (const membership of memberships) {
    const { data, error } = await supabase
      .from('memberships')
      .insert(membership)
      .select();

    if (error) {
      console.error(`❌ Error insertando ${membership.email}:`, error.message);
      errorCount++;
    } else {
      const endDateStr = membership.end_date
        ? new Date(membership.end_date).toLocaleDateString('es-MX')
        : 'Vitalicia';

      console.log(`✅ ${membership.name} (${membership.email}) - ${membership.plan_type} - Vence: ${endDateStr}`);
      successCount++;
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('📊 RESUMEN DE IMPORTACIÓN');
  console.log('='.repeat(60));
  console.log(`✅ Exitosas: ${successCount}`);
  console.log(`❌ Errores: ${errorCount}`);
  console.log(`📝 Total: ${memberships.length}`);
  console.log('='.repeat(60));

  if (errorCount === 0) {
    console.log('\n🎉 Importación completada exitosamente!\n');
    console.log('📌 Próximos pasos:');
    console.log('   1. Verifica los datos en Supabase Table Editor');
    console.log('   2. Los usuarios ya pueden hacer login con su email');
    console.log('   3. Al hacer login, su membresía se vinculará automáticamente');
  } else {
    console.log('\n⚠️  Importación completada con errores');
    console.log('   Revisa los mensajes de error arriba');
  }
}

// Ejecutar script
importMemberships().catch((error) => {
  console.error('❌ Error fatal:', error);
  process.exit(1);
});
