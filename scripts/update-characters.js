// Script para obtener personajes de la API de Rick y Morty y guardarlos en el JSON Server local
const fs = require('fs');
const path = require('path');
const { getCharacters } = require('rickmortyapi');

// Función principal que obtiene los personajes y los guarda en db.json
async function updateCharacters() {
  try {
    console.log('Obteniendo personajes de la API de Rick y Morty...');
    
    // Obtener personajes de las primeras 3 páginas
    let allCharacters = [];
    
    for (let page = 1; page <= 3; page++) {
      console.log(`Obteniendo página ${page}...`);
      const response = await getCharacters({ page });
      
      if (response && response.data && response.data.results) {
        allCharacters = [...allCharacters, ...response.data.results];
      }
    }
    
    console.log(`Se obtuvieron ${allCharacters.length} personajes en total.`);
    
    // Leer el archivo db.json existente
    const dbPath = path.join(__dirname, '..', 'db.json');
    
    let db = {};
    if (fs.existsSync(dbPath)) {
      const dbContent = fs.readFileSync(dbPath, 'utf8');
      db = JSON.parse(dbContent);
    } else {
      db = { characters: [] };
    }
    
    // Actualizar la lista de personajes
    db.characters = allCharacters;
    
    // Guardar el archivo actualizado
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
    
    console.log('¡Los personajes se han actualizado correctamente en db.json!');
    console.log('Ahora puedes ejecutar "npm run server" para iniciar el JSON Server con los nuevos datos.');
    
  } catch (error) {
    console.error('Error al actualizar los personajes:', error);
  }
}

// Ejecutar la función principal
updateCharacters(); 