// Script de configuración para facilitar la ejecución del proyecto
const fs = require('fs');
const path = require('path');
const { spawn, exec } = require('child_process');

// Función para verificar si db.json existe y tiene datos
function checkDbJson() {
  const dbPath = path.join(__dirname, 'db.json');
  
  try {
    if (fs.existsSync(dbPath)) {
      const dbContent = fs.readFileSync(dbPath, 'utf8');
      const db = JSON.parse(dbContent);
      
      if (db.characters && db.characters.length > 0) {
        console.log('✅ El archivo db.json existe y contiene datos.');
        return true;
      } else {
        console.log('⚠️ El archivo db.json existe pero no contiene personajes.');
        return false;
      }
    } else {
      console.log('⚠️ El archivo db.json no existe.');
      return false;
    }
  } catch (error) {
    console.error('❌ Error al verificar db.json:', error.message);
    return false;
  }
}

// Función para ejecutar update-characters.js
function updateCharacters() {
  return new Promise((resolve, reject) => {
    console.log('🔄 Generando datos de personajes...');
    
    exec('node scripts/update-characters.js', (error, stdout, stderr) => {
      if (error) {
        console.error('❌ Error al generar datos:', error.message);
        reject(error);
        return;
      }
      
      console.log(stdout);
      resolve();
    });
  });
}

// Función para iniciar json-server
function startJsonServer() {
  console.log('🚀 Iniciando servidor de datos (json-server)...');
  
  const jsonServer = spawn('npm', ['run', 'server'], {
    stdio: 'inherit',
    detached: true,
    shell: true
  });
  
  jsonServer.on('error', (error) => {
    console.error('❌ Error al iniciar json-server:', error.message);
  });
  
  return jsonServer;
}

// Función para iniciar la aplicación Next.js
function startNextApp() {
  console.log('🚀 Iniciando aplicación Next.js...');
  
  const nextApp = spawn('npm', ['run', 'dev'], {
    stdio: 'inherit',
    shell: true
  });
  
  nextApp.on('error', (error) => {
    console.error('❌ Error al iniciar la aplicación Next.js:', error.message);
  });
  
  return nextApp;
}

// Función principal
async function setup() {
  console.log('🔍 Verificando configuración...');
  
  // Verificar si db.json existe y tiene datos
  const dbExists = checkDbJson();
  
  // Si db.json no existe o está vacío, ejecutar update-characters.js
  if (!dbExists) {
    try {
      await updateCharacters();
    } catch (error) {
      console.error('❌ No se pudieron generar los datos. Por favor, ejecuta manualmente: npm run update-characters');
      process.exit(1);
    }
  }
  
  // Iniciar json-server
  const jsonServer = startJsonServer();
  
  // Esperar un momento para que json-server se inicie correctamente
  console.log('⏳ Esperando a que el servidor de datos esté listo...');
  
  setTimeout(() => {
    // Iniciar la aplicación Next.js
    const nextApp = startNextApp();
    
    console.log('\n✨ ¡Todo listo! La aplicación estará disponible en http://localhost:3000');
    console.log('📊 El servidor de datos está ejecutándose en http://localhost:3002');
    console.log('\n⚠️ Presiona Ctrl+C dos veces para detener ambos procesos\n');
    
    // Manejar la terminación del proceso
    process.on('SIGINT', () => {
      console.log('\n🛑 Deteniendo procesos...');
      
      if (jsonServer && !jsonServer.killed) {
        process.kill(-jsonServer.pid);
      }
      
      if (nextApp && !nextApp.killed) {
        nextApp.kill();
      }
      
      console.log('👋 ¡Hasta luego!');
      process.exit(0);
    });
  }, 3000);
}

// Ejecutar la función principal
setup();