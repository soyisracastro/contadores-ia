---
title: "Instalación de Python y VS Code"
description: "Aprende a instalar y configurar Python y Visual Studio Code en tu computadora, el entorno profesional que usarás durante todo el curso"
order: 2
duration: 20
premium: true
free_preview: false
videoUrl: "https://youtube.com/watch?v=ejemplo2"
downloadables:
  - title: "Guía de instalación paso a paso (PDF)"
    url: "/downloads/instalacion-python-vscode.pdf"
  - title: "Script de configuración automática"
    url: "/downloads/setup-python.py"
  - title: "Lista de extensiones recomendadas"
    url: "/downloads/vscode-extensions.txt"

email:
  subject: "Lección 2: Instala Python y VS Code como un profesional"
  preview: "Hoy configurarás tu entorno de desarrollo profesional paso a paso"
---

# Instalación de Python y VS Code

¡Bienvenido a la segunda lección! Hoy configurarás tu entorno de desarrollo profesional. Al finalizar esta lección, tendrás todo listo para empezar a programar.

## 🎯 Objetivos de esta lección

Al terminar, habrás instalado:
- ✅ Python 3.12 (la versión más reciente)
- ✅ Visual Studio Code (tu editor de código)
- ✅ Extensiones esenciales para Python
- ✅ Tu primer programa: "Hola Contador"

**Tiempo estimado: 20-30 minutos**

---

## Parte 1: Instalación de Python

Python es el lenguaje de programación que usaremos. Piensa en él como el "motor" que ejecutará tus programas.

### Para Windows

1. **Descarga Python**
   - Ve a [python.org/downloads](https://python.org/downloads)
   - Haz clic en el botón amarillo "Download Python 3.12.x"
   - Guarda el archivo (será algo como `python-3.12.0-amd64.exe`)

2. **Instala Python**
   - Ejecuta el instalador descargado
   - ⚠️ **MUY IMPORTANTE**: Marca la casilla "Add Python to PATH"
   - Haz clic en "Install Now"
   - Espera a que termine la instalación
   - Haz clic en "Close"

3. **Verifica la instalación**
   - Abre el "Símbolo del sistema" (busca "cmd" en el menú inicio)
   - Escribe: `python --version`
   - Deberías ver algo como: `Python 3.12.0`

### Para Mac

1. **Descarga Python**
   - Ve a [python.org/downloads](https://python.org/downloads)
   - Descarga el instalador para macOS
   - Archivo será como `python-3.12.0-macos11.pkg`

2. **Instala Python**
   - Abre el archivo `.pkg` descargado
   - Sigue las instrucciones del asistente
   - Acepta los términos y condiciones
   - Instala en la ubicación predeterminada

3. **Verifica la instalación**
   - Abre "Terminal" (búscala en Spotlight)
   - Escribe: `python3 --version`
   - Deberías ver: `Python 3.12.0`

### Para Linux (Ubuntu/Debian)

Python generalmente ya viene instalado, pero actualicémoslo:

```bash
sudo apt update
sudo apt install python3 python3-pip python3-venv
python3 --version
```

---

## Parte 2: Instalación de Visual Studio Code

VS Code es el editor donde escribirás tu código. Es gratis, potente y usado por millones de desarrolladores.

### Para todos los sistemas operativos

1. **Descarga VS Code**
   - Ve a [code.visualstudio.com](https://code.visualstudio.com)
   - Haz clic en "Download" (detectará tu sistema automáticamente)

2. **Instala VS Code**
   - **Windows**: Ejecuta el `.exe` descargado y sigue el asistente
   - **Mac**: Abre el `.zip`, arrastra VS Code a "Aplicaciones"
   - **Linux**: Instala el `.deb` o `.rpm` según tu distribución

3. **Primer inicio**
   - Abre VS Code
   - Te dará la bienvenida con un tour opcional
   - Puedes cerrarlo por ahora

---

## Parte 3: Configuración de VS Code para Python

Ahora configuraremos VS Code para trabajar con Python cómodamente.

### Instalar la extensión de Python

1. En VS Code, haz clic en el ícono de **extensiones** (cuatro cuadrados en la barra lateral izquierda)
2. Busca: `Python`
3. Instala la extensión oficial de Microsoft (tiene millones de descargas)
4. Espera a que se instale y reinicia VS Code si te lo pide

### Extensiones adicionales recomendadas

Instala estas extensiones para mejorar tu experiencia:

- **Pylance**: Autocompletado inteligente de código
- **Python Indent**: Indentación automática correcta
- **Error Lens**: Muestra errores directamente en el código
- **Material Icon Theme**: Íconos bonitos para archivos

---

## Parte 4: Tu primer programa en Python

¡Ahora sí! Vamos a escribir tu primer programa.

### Paso 1: Crear una carpeta de trabajo

1. Crea una carpeta llamada `python-contadores` en tu escritorio o documentos
2. En VS Code, ve a **File > Open Folder** (Archivo > Abrir carpeta)
3. Selecciona la carpeta `python-contadores` que acabas de crear

### Paso 2: Crear tu primer archivo

1. En VS Code, haz clic en el ícono de "Nuevo archivo" o presiona `Ctrl+N` (Windows/Linux) o `Cmd+N` (Mac)
2. Guárdalo como `hola_contador.py`
3. Escribe el siguiente código:

```python
# Mi primer programa en Python
# Curso: Python para Contadores

print("¡Hola, Contador!")
print("Bienvenido a Python")

# Pequeño cálculo
iva = 0.16
precio = 1000
total = precio * (1 + iva)

print(f"Precio: ${precio}")
print(f"IVA (16%): ${precio * iva}")
print(f"Total: ${total}")
```

### Paso 3: Ejecutar tu programa

**Opción 1: Desde VS Code**
- Haz clic derecho en el archivo
- Selecciona "Run Python File in Terminal"

**Opción 2: Desde terminal**
- Abre la terminal integrada en VS Code: `Ctrl+Ñ` (Windows/Linux) o `Cmd+Ñ` (Mac)
- Escribe: `python hola_contador.py` (o `python3` en Mac/Linux)

**Resultado esperado:**
```
¡Hola, Contador!
Bienvenido a Python
Precio: $1000
IVA (16%): $160.0
Total: $1160.0
```

🎉 **¡Felicidades! Has escrito y ejecutado tu primer programa en Python.**

---

## Entendiendo el código

Analicemos qué hiciste:

```python
print("¡Hola, Contador!")
```
- `print()` es una **función** que muestra texto en pantalla
- El texto va entre comillas

```python
iva = 0.16
precio = 1000
```
- Creaste **variables** para guardar valores
- `iva` guarda el porcentaje (16% = 0.16)
- `precio` guarda un número

```python
total = precio * (1 + iva)
```
- Realizaste un **cálculo**
- Python puede hacer operaciones matemáticas como una calculadora

```python
print(f"Total: ${total}")
```
- La `f` antes de las comillas crea un **f-string**
- Permite insertar variables dentro del texto con `{variable}`

---

## Configuración adicional recomendada

### Configurar el formateo automático

Esto hará que tu código siempre se vea limpio y profesional:

1. En VS Code, presiona `Ctrl+,` (Windows/Linux) o `Cmd+,` (Mac) para abrir configuración
2. Busca: `format on save`
3. Activa la casilla "Format On Save"

### Configurar el intérprete de Python

1. En VS Code, presiona `Ctrl+Shift+P` (Windows/Linux) o `Cmd+Shift+P` (Mac)
2. Escribe: `Python: Select Interpreter`
3. Selecciona la versión de Python que instalaste (3.12.x)

---

## Solución de problemas comunes

### ❌ "Python no se reconoce como comando"
**Solución:** No marcaste "Add Python to PATH" durante la instalación. Reinstala Python marcando esa opción.

### ❌ "VS Code no encuentra Python"
**Solución:**
1. Abre VS Code
2. Presiona `Ctrl+Shift+P` (o `Cmd+Shift+P`)
3. Escribe "Python: Select Interpreter"
4. Selecciona manualmente tu instalación de Python

### ❌ "El código no se ejecuta"
**Solución:** Asegúrate de guardar el archivo con extensión `.py` antes de ejecutarlo.

---

## 📝 Ejercicio práctico

Crea un nuevo archivo llamado `calculadora_isr.py` y escribe un programa que:

1. Defina un ingreso anual (ej: 400,000 pesos)
2. Calcule el ISR según una tarifa simplificada del 30%
3. Muestre el ingreso bruto, el ISR a pagar y el ingreso neto

**Ejemplo de salida esperada:**
```
Ingreso bruto anual: $400,000
ISR (30%): $120,000
Ingreso neto: $280,000
```

**Pista:** Usa el código del ejemplo como base y modifica los cálculos.

---

## Próxima lección

En la **Lección 3** aprenderás sobre:
- Variables en profundidad
- Tipos de datos (strings, números, booleanos)
- Cómo Python guarda información en memoria
- Operaciones matemáticas avanzadas para contadores

---

## Recursos descargables

Al final de esta lección encontrarás:
- 📄 PDF con capturas de pantalla del proceso de instalación
- 🐍 Script de configuración automática
- 📋 Lista completa de extensiones recomendadas

---

## ¿Tuviste problemas?

Si algo no funcionó, **no te preocupes**. Escríbenos a [soporte@contadores-ia.com](mailto:soporte@contadores-ia.com) con:
- Tu sistema operativo
- Qué error viste (captura de pantalla si es posible)
- En qué paso te trabaste

Te responderemos en menos de 24 horas.

---

**¡Excelente trabajo!** Ya tienes tu entorno profesional listo. Ahora sí, empezaremos a programar de verdad.

Nos vemos en la siguiente lección 🚀
