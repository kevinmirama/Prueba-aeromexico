# Resumen del Proyecto - Rick and Morty App

## Funcionalidades implementadas

1. **Interfaz de usuario según el diseño proporcionado**
   - Diseño oscuro con elementos verdes para destacar
   - Tarjetas de personajes con indicadores de estado (vivo/muerto)
   - Visualización detallada de personajes en un modal
   - Botones interactivos con efectos hover
   - Componente de flechas para navegar por la página

2. **Funcionalidad de favoritos con Redux**
   - Implementación de Redux Toolkit para gestionar el estado global
   - Posibilidad de marcar/desmarcar personajes como favoritos
   - Dropdown de favoritos para acceso rápido
   - Filtrado para mostrar solo personajes favoritos

3. **Búsqueda y filtrado**
   - Búsqueda de personajes por nombre
   - Indicación cuando no se encuentran resultados

4. **Pruebas unitarias**
   - Tests para el componente CharacterCard
   - Tests para la página principal
   - Mock de la API para evitar dependencias externas

5. **Integración con json-server**
   - Consumo de datos desde un servidor JSON local
   - Estructura de datos compatible con la API de Rick and Morty

## Mejoras que se podrían implementar

1. **Persistencia de datos**
   - Guardar favoritos en localStorage para mantenerlos después de refrescar la página

2. **Paginación**
   - Implementar paginación para manejar grandes cantidades de personajes

3. **Más opciones de filtrado**
   - Filtrar por especie, género, estado, etc.

4. **Animaciones avanzadas**
   - Transiciones más fluidas entre secciones
   - Animaciones en el modal y las tarjetas

5. **Modo offline**
   - Cache de datos para funcionamiento sin conexión

6. **Optimización de rendimiento**
   - Implementar lazy loading para imágenes
   - Optimización de renderizados con useMemo, useCallback, etc.

7. **Más pruebas**
   - Pruebas de integración
   - Pruebas end-to-end
   - Mayor cobertura de pruebas unitarias

## Tecnologías utilizadas

- React 19
- Next.js
- TypeScript
- CSS Modules
- Redux Toolkit
- JSON Server
- Jest y React Testing Library 