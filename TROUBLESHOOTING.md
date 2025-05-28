# Solución de Problemas

Este documento proporciona soluciones para problemas comunes que podrías encontrar al ejecutar la aplicación Rick and Morty.

## Problemas Comunes y Soluciones

### 1. Error al iniciar el servidor json-server

**Problema**: Al ejecutar `npm run server` o `npm run setup`, aparece un error relacionado con json-server.

**Soluciones**:

- Verifica que el puerto 3002 no esté siendo utilizado por otra aplicación:
  ```bash
  # En Windows (PowerShell):
  netstat -ano | findstr :3002
  # Luego termina el proceso que usa ese puerto si es necesario
  ```

- Reinstala json-server:
  ```bash
  npm uninstall json-server
  npm install json-server@1.0.0-beta.3 --save-dev
  ```

### 2. No se muestran los personajes

**Problema**: La aplicación carga pero no muestra ningún personaje.

**Soluciones**:

- Verifica que el servidor json-server esté ejecutándose en http://localhost:3002
- Asegúrate de que el archivo db.json existe y contiene datos:
  ```bash
  npm run update-characters
  ```
- Comprueba la consola del navegador para ver si hay errores de conexión

### 3. Errores con las dependencias

**Problema**: Errores al instalar dependencias o iniciar la aplicación relacionados con versiones incompatibles.

**Soluciones**:

- Limpia la caché de npm:
  ```bash
  npm cache clean --force
  ```
- Borra node_modules y reinstala:
  ```bash
  rm -rf node_modules
  npm install
  ```

### 4. Problemas con Next.js

**Problema**: Errores al iniciar la aplicación Next.js.

**Soluciones**:

- Limpia la caché de Next.js:
  ```bash
  rm -rf .next
  npm run dev
  ```

### 5. Problemas con el script de configuración automática

**Problema**: El script `npm run setup` no funciona correctamente.

**Soluciones**:

- Ejecuta los pasos manualmente como se describe en el README.md en la sección "Método 2: Configuración manual"
- Verifica que tienes permisos para ejecutar scripts en tu sistema

## Verificación del Entorno

Para asegurarte de que tu entorno cumple con los requisitos:

1. Verifica la versión de Node.js (se recomienda v16 o superior):
   ```bash
   node -v
   ```

2. Verifica la versión de npm:
   ```bash
   npm -v
   ```

## Contacto para Soporte

Si continúas experimentando problemas después de intentar estas soluciones, por favor contacta al desarrollador a través de GitHub o por correo electrónico para obtener asistencia adicional.