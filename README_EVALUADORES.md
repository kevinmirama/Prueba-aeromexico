# Guía para Evaluadores - Rick and Morty App

¡Hola evaluador! Este documento contiene instrucciones específicas para clonar y ejecutar correctamente este proyecto. Hemos preparado esta guía para facilitar el proceso de evaluación.

## Requisitos Previos

- **Node.js**: Versión 16.0.0 o superior
- **npm**: Versión 8.0.0 o superior
- **Puertos disponibles**: 3000 (para Next.js) y 3002 (para json-server)

## Instrucciones Paso a Paso

### 1. Clonar el Repositorio

```bash
git clone https://github.com/kevinmirama/Prueba-aeromexico.git
cd Prueba-aeromexico
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Ejecutar la Aplicación (Método Recomendado)

Hemos creado un script de configuración automática que simplifica el proceso:

```bash
npm run setup
```

Este comando:
- Verifica si el archivo db.json existe y tiene datos
- Genera los datos si es necesario
- Inicia el servidor json-server en segundo plano
- Inicia la aplicación Next.js

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

### 4. Método Alternativo (Manual)

Si el método automático no funciona, puedes seguir estos pasos manualmente:

**Terminal 1 - Generar datos y ejecutar el servidor:**
```bash
npm run update-characters
npm run server
```

**Terminal 2 - Ejecutar la aplicación:**
```bash
npm run dev
```

## Solución de Problemas Comunes

### El servidor json-server no inicia

1. Verifica que el puerto 3002 esté disponible:
   ```bash
   # En Windows (PowerShell):
   netstat -ano | findstr :3002
   ```

2. Reinstala json-server:
   ```bash
   npm uninstall json-server
   npm install json-server@1.0.0-beta.3 --save-dev
   ```

### No se muestran los personajes

1. Asegúrate de que json-server esté ejecutándose en http://localhost:3002
2. Regenera los datos:
   ```bash
   npm run update-characters
   ```

### Errores de dependencias

1. Limpia la caché e instala de nuevo:
   ```bash
   npm cache clean --force
   rm -rf node_modules
   npm install
   ```

## Documentación Adicional

- **README.md**: Contiene información general del proyecto
- **TROUBLESHOOTING.md**: Guía detallada de solución de problemas
- **RESUMEN.md**: Resumen de las funcionalidades implementadas

## Contacto

Si encuentras algún problema que no puedas resolver con esta guía, por favor contacta al desarrollador a través de GitHub.

¡Gracias por evaluar este proyecto!