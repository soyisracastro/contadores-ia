---
title: "Variables y Tipos de Datos"
description: "Domina las variables y tipos de datos en Python: strings, números, booleanos y cómo usarlos en cálculos contables"
order: 3
duration: 25
premium: true
free_preview: false
videoUrl: "https://youtube.com/watch?v=ejemplo3"

email:
  subject: "Lección 3: Variables - Los bloques fundamentales de Python"
  preview: "Aprende a almacenar y manipular información como un profesional"
---

# Variables y Tipos de Datos

Bienvenido a la lección 3. Hoy profundizaremos en variables y tipos de datos, los conceptos fundamentales que usarás en todos tus programas.

## 🎯 Objetivos de esta lección

Al terminar esta lección, sabrás:
- ✅ Qué son las variables y cómo funcionan
- ✅ Los 5 tipos de datos principales en Python
- ✅ Cómo convertir entre tipos de datos
- ✅ Nombrar variables correctamente
- ✅ Aplicar estos conceptos a cálculos contables

---

## ¿Qué es una variable?

Una **variable** es como una caja etiquetada donde guardas información. Puedes poner cosas dentro, sacarlas, cambiarlas.

```python
# Crear variables
nombre_cliente = "Empresa ABC S.A. de C.V."
saldo_inicial = 50000
tiene_adeudo = True

print(nombre_cliente)  # Empresa ABC S.A. de C.V.
print(saldo_inicial)   # 50000
print(tiene_adeudo)    # True
```

### Reglas para nombrar variables

✅ **Permitido:**
```python
nombre = "Juan"
edad = 30
saldo_cuenta = 1000
cliente2 = "María"
_privado = "dato"
```

❌ **No permitido:**
```python
2cliente = "Error"     # No puede empezar con número
saldo-cuenta = 1000    # No usar guiones
class = "Contador"     # No usar palabras reservadas
mi variable = 100      # No usar espacios
```

### Convenciones de nombres (importante)

Python usa **snake_case** para variables:

```python
# ✅ Bien (snake_case)
subtotal_sin_iva = 1000
nombre_completo_cliente = "Juan Pérez"
tasa_iva_mexico = 0.16

# ❌ Mal (no es el estándar de Python)
SubtotalSinIva = 1000      # Esto es PascalCase
subtotalSinIva = 1000      # Esto es camelCase
SUBTOTAL_SIN_IVA = 1000    # Esto es UPPER_CASE (solo para constantes)
```

---

## Los 5 tipos de datos principales

### 1. Strings (str) - Texto

Strings son cadenas de texto. Van entre comillas simples `'` o dobles `"`.

```python
# Crear strings
empresa = "Contadores IA"
rfc = 'ABC123456XYZ'
direccion = "Av. Reforma 123, CDMX"

# Strings multilínea
descripcion = """
Esta es una factura
de múltiples líneas
con formato
"""

# Concatenación (unir strings)
nombre = "Juan"
apellido = "Pérez"
nombre_completo = nombre + " " + apellido
print(nombre_completo)  # Juan Pérez

# f-strings (formato moderno)
cliente = "ABC Corp"
saldo = 5000
mensaje = f"El cliente {cliente} tiene un saldo de ${saldo}"
print(mensaje)  # El cliente ABC Corp tiene un saldo de $5000

# Métodos útiles de strings
texto = "  CONTADORES IA  "
print(texto.lower())      # "  contadores ia  "
print(texto.upper())      # "  CONTADORES IA  "
print(texto.strip())      # "CONTADORES IA"
print(texto.replace("IA", "AI"))  # "  CONTADORES AI  "
```

### 2. Integers (int) - Números enteros

Números sin decimales.

```python
# Números enteros
edad = 35
cantidad_facturas = 150
año = 2024

# Operaciones básicas
a = 10
b = 3

print(a + b)   # 13 (suma)
print(a - b)   # 7  (resta)
print(a * b)   # 30 (multiplicación)
print(a / b)   # 3.333... (división - devuelve float)
print(a // b)  # 3  (división entera)
print(a % b)   # 1  (módulo - residuo)
print(a ** b)  # 1000 (potencia)

# Números grandes (sin límite)
pib_mexico = 1_427_000_000_000  # Python permite _ para legibilidad
print(pib_mexico)  # 1427000000000
```

### 3. Floats (float) - Números decimales

Números con punto decimal.

```python
# Números decimales
iva = 0.16
precio = 99.99
tasa_interes = 0.08

# Cálculos contables comunes
subtotal = 10000.00
iva_16 = subtotal * 0.16
total = subtotal + iva_16

print(f"Subtotal: ${subtotal:.2f}")
print(f"IVA 16%: ${iva_16:.2f}")
print(f"Total: ${total:.2f}")

# :.2f formatea a 2 decimales
```

**⚠️ Cuidado con precisión de floats:**

```python
# Problema conocido con floats
precio1 = 0.1
precio2 = 0.2
suma = precio1 + precio2
print(suma)  # 0.30000000000000004 😱

# Solución: usar round() o decimal
from decimal import Decimal
precio1 = Decimal('0.1')
precio2 = Decimal('0.2')
suma = precio1 + precio2
print(suma)  # 0.3 ✅
```

### 4. Booleans (bool) - Verdadero/Falso

Solo dos valores posibles: `True` o `False`.

```python
# Booleanos
pagado = True
moroso = False
tiene_adeudo = True

# Comparaciones devuelven booleanos
saldo = 5000
print(saldo > 0)        # True
print(saldo == 0)       # False
print(saldo != 0)       # True
print(saldo >= 5000)    # True

# Operadores lógicos
tiene_facturas = True
esta_al_dia = False

print(tiene_facturas and esta_al_dia)  # False
print(tiene_facturas or esta_al_dia)   # True
print(not esta_al_dia)                 # True

# Uso práctico
edad = 18
es_mayor_edad = edad >= 18
print(f"¿Es mayor de edad? {es_mayor_edad}")
```

### 5. NoneType (None) - Valor nulo

`None` representa "nada" o "sin valor".

```python
# None indica ausencia de valor
descuento = None  # El cliente no tiene descuento
rfc_extranjero = None  # Cliente sin RFC mexicano

# Útil para verificaciones
if descuento is None:
    print("Sin descuento aplicado")
```

---

## Conversión entre tipos (Casting)

A veces necesitas convertir un tipo a otro.

```python
# String a número
texto_precio = "1500"
precio_numero = int(texto_precio)
print(precio_numero + 500)  # 2000

# Número a string
cantidad = 42
texto = str(cantidad)
print("Tienes " + texto + " facturas")  # Tienes 42 facturas

# Float a int (pierde decimales)
precio = 99.99
precio_entero = int(precio)
print(precio_entero)  # 99

# Int a float
numero = 10
numero_decimal = float(numero)
print(numero_decimal)  # 10.0

# String a boolean (cuidado)
texto = "True"
booleano = bool(texto)
print(booleano)  # True (cualquier string no vacío es True)

texto_vacio = ""
booleano_vacio = bool(texto_vacio)
print(booleano_vacio)  # False
```

---

## Verificar tipo de dato

Usa `type()` para saber qué tipo de dato tienes:

```python
nombre = "Juan"
edad = 30
saldo = 1500.50
activo = True

print(type(nombre))   # <class 'str'>
print(type(edad))     # <class 'int'>
print(type(saldo))    # <class 'float'>
print(type(activo))   # <class 'bool'>

# Verificar tipo específico
if isinstance(edad, int):
    print("edad es un entero")
```

---

## Ejemplo práctico: Calculadora de nómina

Vamos a aplicar todo lo aprendido en un programa real:

```python
# Datos del empleado
nombre_empleado = "María González"
puesto = "Contador Senior"
sueldo_mensual = 25000.00
dias_trabajados = 30
dias_mes = 30

# Cálculos
sueldo_diario = sueldo_mensual / dias_mes
sueldo_real = sueldo_diario * dias_trabajados

# Deducciones
tasa_isr = 0.21
tasa_imss = 0.0315

isr = sueldo_real * tasa_isr
imss = sueldo_real * tasa_imss
deducciones_totales = isr + imss

# Neto
sueldo_neto = sueldo_real - deducciones_totales

# Imprimir recibo
print("=" * 50)
print("RECIBO DE NÓMINA")
print("=" * 50)
print(f"Empleado: {nombre_empleado}")
print(f"Puesto: {puesto}")
print(f"Días trabajados: {dias_trabajados}/{dias_mes}")
print()
print(f"Sueldo bruto: ${sueldo_real:,.2f}")
print(f"ISR (21%): -${isr:,.2f}")
print(f"IMSS (3.15%): -${imss:,.2f}")
print(f"Total deducciones: -${deducciones_totales:,.2f}")
print("-" * 50)
print(f"SUELDO NETO: ${sueldo_neto:,.2f}")
print("=" * 50)
```

**Salida:**
```
==================================================
RECIBO DE NÓMINA
==================================================
Empleado: María González
Puesto: Contador Senior
Días trabajados: 30/30

Sueldo bruto: $25,000.00
ISR (21%): -$5,250.00
IMSS (3.15%): -$787.50
Total deducciones: -$6,037.50
--------------------------------------------------
SUELDO NETO: $18,962.50
==================================================
```

---

## 📝 Ejercicios prácticos

### Ejercicio 1: Calculadora de IVA

Crea un programa que:
1. Defina un precio sin IVA
2. Calcule el IVA (16%)
3. Calcule el total con IVA
4. Muestre todo formateado

### Ejercicio 2: Conversor de divisas

Crea un programa que:
1. Defina una cantidad en pesos mexicanos
2. Defina el tipo de cambio (USD = 17.50 MXN)
3. Convierta la cantidad a dólares
4. Muestre ambas cantidades formateadas

### Ejercicio 3: Cálculo de antigüedad

Crea un programa que:
1. Defina el año de ingreso de un empleado
2. Defina el año actual
3. Calcule años de antigüedad
4. Determine si aplica para prima de antigüedad (>5 años)

**Pista:** Usa booleanos para la última parte.

---

## Errores comunes y cómo evitarlos

### Error 1: Sumar string + número
```python
# ❌ Error
edad = 30
texto = "Tengo " + edad + " años"  # TypeError

# ✅ Solución 1: Convertir
texto = "Tengo " + str(edad) + " años"

# ✅ Solución 2: f-string (mejor)
texto = f"Tengo {edad} años"
```

### Error 2: División por cero
```python
# ❌ Error
total = 100
cantidad = 0
promedio = total / cantidad  # ZeroDivisionError

# ✅ Solución: verificar antes
if cantidad != 0:
    promedio = total / cantidad
else:
    promedio = 0
```

### Error 3: Comparar tipos diferentes
```python
# ⚠️ Cuidado
edad_str = "30"
edad_int = 30
print(edad_str == edad_int)  # False (diferentes tipos)

# ✅ Solución: convertir primero
print(int(edad_str) == edad_int)  # True
```

---

## Resumen

Has aprendido:
- ✅ Qué son variables y cómo nombrarlas
- ✅ Los 5 tipos de datos principales: str, int, float, bool, None
- ✅ Cómo convertir entre tipos
- ✅ Operaciones con cada tipo
- ✅ Aplicaciones prácticas contables

---

## Próxima lección

En la **Lección 4** aprenderás sobre:
- Operadores aritméticos avanzados
- Orden de operaciones
- Funciones matemáticas del módulo `math`
- Redondeo y formateo de números

---

¡Excelente progreso! Ya dominas las bases de Python. Ahora estás listo para hacer cálculos más complejos.

Nos vemos en la siguiente lección 🚀
