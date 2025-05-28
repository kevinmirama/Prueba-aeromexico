# Instrucciones para corregir el repositorio de GitHub

## Problemas identificados

Después de analizar tu código, he identificado los siguientes problemas que podrían estar impidiendo que los evaluadores ejecuten el proyecto desde GitHub:

1. **URL de repositorio incorrecta en el README**: El archivo README.md contiene una URL genérica (`https://github.com/tu-usuario/rick-morty-app.git`) en lugar de la URL real de tu repositorio.

2. **Dependencia de json-server**: La aplicación depende de un servidor local (json-server) que debe estar ejecutándose para que la aplicación funcione correctamente, pero esto podría no estar claro para los evaluadores.

3. **Versiones de dependencias**: El proyecto utiliza versiones muy recientes de algunas dependencias (React 19, Next.js 15.3.1) que podrían causar problemas de compatibilidad.

4. **Falta de datos iniciales**: El archivo db.json podría no estar incluido correctamente en el repositorio, lo que impediría que los evaluadores puedan ejecutar el servidor de datos.

## Soluciones recomendadas

### 1. Corregir la URL del repositorio en el README

Edita el archivo README.md y reemplaza la URL genérica con la URL real de tu repositorio. Por ejemplo:

```bash
git clone https://github.com/TU-NOMBRE-DE-USUARIO-REAL/prueba-aeromexico.git
cd prueba-aeromexico
```

### 2. Mejorar las instrucciones de instalación y ejecución

Asegúrate de que las instrucciones en el README.md sean claras y completas. Específicamente:

- Destaca la necesidad de ejecutar json-server antes de iniciar la aplicación
- Explica que se necesitan dos terminales: una para json-server y otra para la aplicación
- Incluye instrucciones para generar el archivo db.json si no existe

Por ejemplo:

```markdown
## Instrucciones para ejecutar el proyecto

### Prerrequisitos
- Node.js (v16 o superior)
- npm o yarn

### Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/TU-NOMBRE-DE-USUARIO-REAL/prueba-aeromexico.git
cd prueba-aeromexico
```

2. Instala las dependencias:
```bash
npm install
```

3. Genera los datos de personajes (si el archivo db.json no existe o está vacío):
```bash
npm run update-characters
```

4. Inicia el servidor de datos (mantén esta terminal abierta):
```bash
npm run server
```

5. En una nueva terminal, inicia la aplicación:
```bash
npm run dev
```

6. Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación.
```

### 3. Asegurar que db.json esté incluido en el repositorio

Verifica que el archivo db.json esté incluido en tu repositorio y no esté siendo ignorado por .gitignore. Si el archivo es muy grande, considera incluir una versión reducida con menos personajes.

Alternativamente, asegúrate de que el script `update-characters.js` funcione correctamente y esté bien documentado para que los evaluadores puedan generar el archivo db.json ellos mismos.

### 4. Considerar versiones de dependencias

Las versiones de React 19 y Next.js 15.3.1 son muy recientes y podrían causar problemas. Considera usar versiones más estables:

```json
"dependencies": {
  "@reduxjs/toolkit": "^2.0.0",
  "next": "14.0.0",
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-redux": "^9.0.0",
  "rickmortyapi": "^2.3.0"
}
```

### 5. Incluir un script de configuración completo

Considera crear un script que configure todo automáticamente. Por ejemplo, puedes crear un archivo `setup.js` que:

1. Verifique si db.json existe
2. Si no existe, ejecute update-characters.js
3. Inicie json-server y la aplicación

Luego, actualiza el README para incluir instrucciones sobre cómo usar este script.

## Conclusión

Implementando estas correcciones, deberías resolver los problemas que impiden que los evaluadores ejecuten tu proyecto desde GitHub. Recuerda probar todo el proceso de instalación y ejecución en un entorno limpio para asegurarte de que funciona correctamente.