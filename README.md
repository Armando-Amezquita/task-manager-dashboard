# Task Manager Dashboard

Una aplicación moderna de gestión de tareas construida con React que consume datos de APIs externas y permite visualizar, filtrar y gestionar tareas de manera eficiente.

## 📋 Descripción del Proyecto

Task Manager Dashboard es una aplicación web responsive que permite:

- **Visualizar tareas**: Muestra todas las tareas en un diseño de cards moderno y limpio
- **Filtrar tareas**: Sistema de filtros combinados por estado, usuario y búsqueda en tiempo real
- **Ver detalles**: Modal con información completa de tareas y usuarios asignados
- **Estadísticas**: Panel de estadísticas con métricas generales y progreso por usuario

La aplicación consume datos de [JSONPlaceholder](https://jsonplaceholder.typicode.com/) para obtener tareas y usuarios.

## 🚀 Instalación y Ejecución

### Prerrequisitos

- Node.js 18+ 
- npm o yarn

### Pasos de Instalación

1. Clona el repositorio:
```bash
git clone <url-del-repositorio>
cd task-manager-dashboard
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm run dev
```

4. Abre tu navegador en `http://localhost:5173`

### Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la build de producción
- `npm run lint` - Ejecuta el linter para verificar el código

## 🛠️ Tecnologías Utilizadas

- **React 19.2.0** - Biblioteca de JavaScript para construir interfaces de usuario
- **Vite 7.2.5** - Build tool y servidor de desarrollo rápido
- **Hooks de React**:
  - `useState` - Manejo de estado local
  - `useEffect` - Efectos secundarios
  - `useMemo` - Optimización de cálculos
- **Custom Hooks**:
  - `useFetch` - Hook personalizado para manejo de peticiones HTTP
  - `useFilteredTasks` - Hook personalizado para filtrado de tareas
- **CSS3** - Estilos modernos con diseño responsive
- **APIs Externas**:
  - JSONPlaceholder API para tareas y usuarios

## 📁 Estructura del Proyecto

```
task-manager-dashboard/
├── public/
│   └── vite.svg
├── src/
│   ├── api/
│   │   └── api.js              # Funciones para consumir APIs
│   ├── components/
│   │   ├── ErrorMessage.jsx    # Componente de mensaje de error
│   │   ├── ErrorMessage.css
│   │   ├── Filters.jsx         # Componente de filtros
│   │   ├── Filters.css
│   │   ├── Loader.jsx          # Componente de carga
│   │   ├── Loader.css
│   │   ├── StatsPanel.jsx      # Panel de estadísticas
│   │   ├── StatsPanel.css
│   │   ├── TaskCard.jsx        # Card individual de tarea
│   │   ├── TaskCard.css
│   │   ├── TaskList.jsx        # Lista de tareas
│   │   ├── TaskList.css
│   │   ├── TaskModal.jsx       # Modal de detalles
│   │   └── TaskModal.css
│   ├── hooks/
│   │   ├── useFetch.jsx        # Custom hook para fetch
│   │   └── useFilteredTasks.jsx # Custom hook para filtrado
│   ├── pages/
│   │   ├── Dashboard.jsx       # Página principal
│   │   └── Dashboard.css
│   ├── styles/
│   │   └── global.css
│   ├── App.jsx                 # Componente raíz
│   ├── App.css
│   ├── index.css               # Estilos globales
│   └── main.jsx                # Punto de entrada
├── package.json
├── vite.config.js
└── README.md
```

## ✨ Características Principales

### 1. Vista Principal - Lista de Tareas

- **Cards Responsive**: Diseño de grid que se adapta a diferentes tamaños de pantalla
- **Información Visible**:
  - Título de la tarea
  - ID de la tarea
  - Estado (Completada ✓ / Pendiente ○)
  - Nombre del usuario asignado
- **Interactividad**: Click en cualquier card para ver detalles completos

### 2. Sistema de Filtros

Filtros que funcionan en conjunto:

- **Por Estado**: 
  - Todas las tareas
  - Solo completadas
  - Solo pendientes
- **Por Usuario**: Dropdown con lista de todos los usuarios
- **Búsqueda**: Input de texto para buscar por título (búsqueda en tiempo real)
- **Botón Limpiar**: Resetea todos los filtros a sus valores por defecto

### 3. Vista de Detalle (Modal)

Al hacer clic en una tarea, se muestra un modal con:

- **Información de la Tarea**:
  - ID
  - Título completo
  - Estado (Completada/Pendiente)
- **Información del Usuario**:
  - Nombre completo
  - Email (con enlace mailto)
  - Teléfono (con enlace tel)
  - Empresa
- **Botón de Cerrar**: Cierra el modal

### 4. Panel de Estadísticas

Muestra métricas importantes:

- **Total de Tareas**: Número total de tareas (según filtros aplicados)
- **Tareas Completadas**: Cantidad y porcentaje
- **Tareas Pendientes**: Cantidad y porcentaje
- **Tasa de Completación**: Porcentaje general
- **Progreso por Usuario**: 
  - Barra de progreso visual
  - Porcentaje de completación por usuario
  - Cantidad de tareas completadas vs total

### 5. Estados de Carga y Error

- **Loading Spinner**: Animación mientras se cargan los datos
- **Manejo de Errores**: Mensaje amigable con opción de reintentar

## 🎨 Decisiones Técnicas Importantes

### 1. Custom Hooks

- **`useFetch`**: Centraliza la lógica de peticiones HTTP, manejo de estados de carga y errores. Facilita la reutilización y mantenimiento.
- **`useFilteredTasks`**: Optimiza el filtrado usando `useMemo` para evitar recálculos innecesarios cuando los datos no cambian.

### 2. Componentes Reutilizables

Todos los componentes están separados por responsabilidad:
- Cada componente tiene su propio archivo CSS para mantener estilos encapsulados
- Componentes funcionales con arrow functions para consistencia
- Props bien definidas para facilitar el testing y mantenimiento

### 3. Diseño Responsive

- **Mobile First**: Diseño pensado primero para móviles
- **Breakpoints**:
  - Desktop: > 768px
  - Tablet: 481px - 768px
  - Mobile: ≤ 480px
- **Grid Adaptativo**: Uso de CSS Grid con `auto-fill` y `minmax` para adaptación automática
- **Flexbox**: Para alineación y distribución de elementos

### 4. Optimizaciones

- **useMemo**: Para cálculos costosos como filtrado y estadísticas
- **Lazy Loading**: Los datos se cargan solo cuando son necesarios
- **CSS Variables**: Preparado para temas (aunque actualmente usa valores fijos)

### 5. Accesibilidad

- Labels en todos los inputs y selects
- Botones con aria-labels donde es necesario
- Contraste adecuado en colores
- Navegación por teclado funcional

### 6. Manejo de Estados

- **Estado Local**: `useState` para filtros y tarea seleccionada
- **Estado Derivado**: Estadísticas calculadas a partir de las tareas filtradas
- **Estado de Carga**: Manejado por el custom hook `useFetch`

## 📱 Diseño Responsive

La aplicación está completamente optimizada para:

- **Desktop** (≥ 768px): Grid de 3-4 columnas, sidebar de estadísticas
- **Tablet** (481px - 768px): Grid de 2 columnas, layout adaptado
- **Mobile** (≤ 480px): Una columna, elementos apilados verticalmente

## 🎯 Funcionalidades Implementadas

✅ Vista principal con lista de tareas en cards  
✅ Sistema de filtros combinados (estado, usuario, búsqueda)  
✅ Modal de detalles con información completa  
✅ Panel de estadísticas con progreso por usuario  
✅ Estados de carga con spinner animado  
✅ Manejo de errores con mensajes amigables  
✅ Diseño responsive para todos los dispositivos  
✅ Custom hooks para lógica reutilizable  
✅ Componentes modulares y reutilizables  

## 🔮 Posibles Mejoras Futuras

- [ ] Persistencia de filtros en localStorage
- [ ] Modo oscuro/claro
- [ ] Paginación para grandes volúmenes de datos
- [ ] Ordenamiento de tareas (por fecha, estado, usuario)
- [ ] Animaciones de transición más suaves
- [ ] Tests unitarios y de integración
- [ ] Internacionalización (i18n)
- [ ] PWA (Progressive Web App)

## 📝 Notas Adicionales

- La aplicación consume datos de JSONPlaceholder, una API de prueba
- Los datos son estáticos y no persisten cambios (API de demostración)
- El diseño utiliza un esquema de colores moderno con gradientes
- Todos los componentes están escritos como funciones de constante (arrow functions)

## 👤 Autor

Desarrollado como proyecto de demostración de habilidades en React y desarrollo frontend moderno.

---

**Versión**: 1.0.0  
**Última actualización**: 2024
