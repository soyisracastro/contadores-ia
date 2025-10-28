---
title: "Prepara tu Entorno de Trabajo - Python y VS Code para Contadores"
description: "Guía paso a paso para instalar y configurar Python y Visual Studio Code. Prepara tu entorno profesional de programación para crear herramientas contables."
pubDate: 2025-10-28
author: "Contadores IA"
tags: ["python", "vscode", "instalación", "configuración", "entorno-desarrollo", "herramientas"]
premium: false
---

En el video anterior aprendimos sobre variables usando JavaScript directamente en la consola del navegador. Fue perfecto para empezar porque no tuvimos que instalar nada, pero ahora es momento de dar un paso importante: **trabajar como verdaderos programadores**.

Este video es tu puente entre aprender conceptos básicos y crear herramientas profesionales y reutilizables.

## ¿Por Qué Ya No Podemos Seguir en el Navegador?

Trabajar en la consola del navegador tiene serias limitaciones:

### 1. Tu Código Se Pierde
Si cierras el navegador, todo lo que escribiste desaparece. No hay forma de guardar tu trabajo de manera permanente.

### 2. No Puedes Crear Archivos
Necesitas guardar tus funciones y cálculos para reutilizarlos. Imagina crear una calculadora de ISR y tener que reescribirla cada vez que la necesitas.

### 3. No Tienes Ayuda al Programar
Un editor de código profesional:
- Te sugiere comandos mientras escribes
- Detecta errores antes de ejecutar
- Formatea automáticamente tu código
- Es como pasar de una calculadora básica a Excel

### 4. JavaScript en el Navegador Tiene Limitaciones
No puedes:
- Leer archivos de Excel
- Conectarte a bases de datos
- Usar librerías especializadas como Pandas
- Todas estas son herramientas esenciales para contadores

## ¿Qué es un Editor de Código?

Un editor de código es el **"Word de los programadores"**.

Técnicamente podrías usar el Bloc de Notas de Windows para escribir código (y funcionaría), pero sería como hacer la contabilidad sin Excel: posible, sí, pero innecesariamente complicado.

### Lo Que un Buen Editor Te Proporciona:

**1. Resaltado de Sintaxis**
- Cada parte del código tiene colores diferentes
- Te ayuda a entender la estructura visualmente

**2. Autocompletado**
- Si escribes `pri`, te sugiere `print()`
- Acelera tu velocidad de escritura
- Reduce errores de tipeo

**3. Detección de Errores**
- Te avisa si olvidaste un paréntesis o comilla
- Marca problemas antes de ejecutar el código

**4. Organización de Archivos**
- Maneja proyectos completos de manera profesional
- Navegación fácil entre múltiples archivos

**5. Terminal Integrada**
- Ejecuta tu código sin salir del editor
- Evita distracciones cambiando entre ventanas

## Visual Studio Code (VS Code)

Para este taller usaremos **Visual Studio Code** (VS Code para los compas).

### ¿Por Qué VS Code?

✅ **Gratuito y de código abierto**
- Sin costos ocultos ni licencias

✅ **Multiplataforma**
- Funciona en Windows, Mac y Linux
- Lo que veas aquí aplica sin importar tu sistema operativo

✅ **Ligero y veloz**
- No necesitas una supercomputadora
- Corre rápido incluso en equipos modestos

✅ **Extensiones para Python**
- Se integra perfectamente con Python
- Convierte VS Code en un IDE completo

✅ **El más usado en la industria**
- Más recursos, tutoriales y ayuda disponible
- Habilidades transferibles a cualquier empresa

### Si Ya Usas Otro Editor

Si ya trabajas con PyCharm, Sublime Text o Atom, puedes seguir usándolos. Los conceptos son los mismos - el editor es solo tu herramienta.

## ¿Por Qué Cambiar a Python?

Vamos a hacer un cambio importante: pasar de JavaScript a Python.

### JavaScript vs Python para Contadores

**JavaScript es excelente para:**
- Crear herramientas web
- Aplicaciones que corren en navegadores
- Interfaces interactivas

**Python es superior para contadores porque:**

✅ **Análisis de Datos**
- Lee y analiza archivos de Excel como bases de datos
- Procesa grandes volúmenes de información

✅ **Automatización Contable**
- Crea y modifica archivos de Excel automáticamente
- Genera reportes financieros sin intervención manual

✅ **Visualización Profesional**
- Genera gráficas de manera muy rápida
- Dashboards profesionales con pocas líneas de código

✅ **Librerías Específicas para México**
- Existen librerías especializadas en contabilidad mexicana
- Trabajo que otros ya hicieron y puedes aprovechar

### No Te Preocupes

Los conceptos que aprendimos en el video anterior (variables, referencias en memoria) funcionan **exactamente igual** en Python. Solo cambia la sintaxis.

## Guía de Instalación Paso a Paso

### Paso 1: Instalar Python

Python es el **motor** que ejecutará tu código.

**1. Descarga Python:**
- Ve a [python.org](https://www.python.org/downloads/)
- El sitio detecta automáticamente tu sistema operativo
- Haz clic en "Download Python 3.1X" (la versión más reciente)

**2. Ejecuta el instalador:**
- ⚠️ **MUY IMPORTANTE:** Marca la casilla "Add Python to PATH"
- Haz clic en "Install Now"
- Espera a que termine la instalación
- Haz clic en "Close"

**3. Verifica la instalación:**
- Presiona `Windows + R`
- Escribe `cmd` y presiona Enter
- En la ventana negra, escribe: `python --version`
- Deberías ver algo como: `Python 3.14.0`

**4. Verifica pip (gestor de paquetes):**
- En la misma ventana, escribe: `pip --version`
- Deberías ver información sobre pip

Pip es el **gestor de paquetes** de Python. Te permite instalar librerías adicionales (como pandas, openpyxl, etc.) cuando las necesites.

Para salir de la terminal, escribe `exit` y presiona Enter.

### Paso 2: Instalar Visual Studio Code

VS Code será tu **nuevo espacio de trabajo**.

**1. Descarga VS Code:**
- Ve a [code.visualstudio.com](https://code.visualstudio.com)
- Haz clic en "Download for Windows" (o tu sistema operativo)

**2. Ejecuta el instalador:**
- El proceso es más simple que Python
- Siguiente → Siguiente → Siguiente → Instalar
- No necesitas cambiar ninguna configuración especial

**3. Abre VS Code:**
- Busca "Visual Studio Code" en tu menú de inicio
- Ábrelo

### Paso 3: Configurar la Extensión de Python

Este paso le da **superpoderes** a VS Code para trabajar con Python.

**1. Abre el panel de extensiones:**
- Haz clic en el ícono de cuadrados en la barra lateral izquierda
- O presiona `Ctrl + Shift + X`

**2. Busca Python:**
- Escribe "Python" en el buscador
- Busca la extensión oficial de Microsoft
- Tiene una marca de verificación azul ✓
- Generalmente es la que tiene más descargas

**3. Instala la extensión:**
- Haz clic en "Install"
- Espera a que termine la instalación

**4. Reinicia VS Code:**
- Presiona `Ctrl + Shift + P`
- Escribe "reload"
- Selecciona "Developer: Reload Window"

Al instalar la extensión de Python, se instalarán automáticamente otras extensiones auxiliares que sugiere Microsoft para mejorar tu experiencia.

## Explorando Visual Studio Code

### La Interfaz de VS Code

**Barra Lateral Izquierda (o Derecha):**

📁 **Explorador de Archivos**
- Aquí verás todo tu proyecto
- Navega entre archivos fácilmente

🔍 **Buscador**
- Busca texto en todo tu proyecto
- Muy útil en proyectos grandes

🌿 **Control de Versiones (Git)**
- Evita los archivos "version_final_final_este_si.py"
- Gestiona cambios profesionalmente
- Más adelante aprenderemos a usar GitHub

🧩 **Extensiones**
- Instala herramientas adicionales
- Personaliza tu editor

⚙️ **Configuración**
- Ajusta el editor a tu gusto
- Cambia temas, fuentes, etc.

### La Barra de Comandos

Presiona `Ctrl + Shift + P` para abrir la paleta de comandos. Desde aquí puedes hacer prácticamente cualquier cosa en VS Code.

### Terminal Integrada

Presiona `` Ctrl + ` `` (acento grave) para abrir la terminal dentro de VS Code. Desde aquí ejecutarás tu código Python.

## Próximos Pasos

Ahora que tienes todo instalado y configurado:

✅ Python instalado y funcionando
✅ VS Code configurado profesionalmente
✅ Extensión de Python activa
✅ Listo para escribir código que puedes guardar y reutilizar

### Lo Que Viene

En el próximo video veremos **Funciones en Python**: cómo automatizar tareas repetitivas creando "recetas" de código reutilizables.

Los archivos que crearemos tendrán la extensión `.py` y podrás:
- Guardarlos permanentemente
- Ejecutarlos cuando quieras
- Compartirlos con otros
- Crear herramientas profesionales

## Verificación Final

Antes de continuar al siguiente video, asegúrate de:

- [ ] Python instalado (verifica con `python --version`)
- [ ] VS Code instalado y abierto
- [ ] Extensión de Python instalada (busca el ícono de Python en la barra lateral)
- [ ] Puedes abrir la terminal integrada (`` Ctrl + ` ``)

## Recursos Adicionales

- [Documentación oficial de Python](https://docs.python.org/es/3/)
- [Documentación de VS Code](https://code.visualstudio.com/docs)
- [Extensiones recomendadas para Python](https://code.visualstudio.com/docs/python/python-tutorial)
- [Atajos de teclado de VS Code](https://code.visualstudio.com/shortcuts/keyboard-shortcuts-windows.pdf)

## Problemas/situaciones comunes

### Python no se reconoce como comando
- Reinstala Python y asegúrate de marcar "Add Python to PATH"
- Reinicia tu computadora después de instalar

### La extensión de Python no aparece
- Verifica que instalaste la versión de Microsoft (con verificación ✓)
- Reinicia VS Code completamente

### VS Code está en inglés
- Ve a Extensiones → Busca "Spanish Language Pack"
- Instala el paquete de idioma español
- Reinicia VS Code