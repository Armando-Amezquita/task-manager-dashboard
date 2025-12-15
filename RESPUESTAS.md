# RESPUESTAS - Preguntas Teóricas

## React Fundamentals

### 1. Ciclo de vida de componentes: Explica cómo funcionan los efectos en React con useEffect. ¿Qué representa el array de dependencias y qué sucede si lo omites?

**useEffect** es un hook que nos permite ejecutar efectos secundarios en componentes funcionales. Básicamente, reemplaza los métodos del ciclo de vida de componentes de clase como `componentDidMount`, `componentDidUpdate` y `componentWillUnmount`.

El array de dependencias es el segundo parámetro de `useEffect` y determina cuándo se ejecutará el efecto:

- **Con array vacío `[]`**: El efecto se ejecuta solo una vez, después del primer render (equivalente a `componentDidMount`).
- **Con dependencias `[dep1, dep2]`**: El efecto se ejecuta cuando alguna de las dependencias cambia (equivalente a `componentDidUpdate` con condiciones).
- **Sin array de dependencias**: El efecto se ejecuta después de cada render, lo cual puede causar renders infinitos si modificas el estado dentro del efecto.

Si se omite el array de dependencias completamente, React ejecutará el efecto después de cada render, lo que puede llevar a problemas de rendimiento y bucles infinitos si no tienes cuidado.

### 2. Estado y Props

#### ¿Cuál es la diferencia entre state y props?

- **Props**: Son datos que se pasan de un componente padre a un componente hijo. Son inmutables desde la perspectiva del componente hijo (no puedes modificarlas directamente). Son como "parámetros" que el componente recibe.

- **State**: Es el estado interno de un componente. Solo el componente que lo posee puede modificarlo directamente. Cuando el state cambia, React re-renderiza el componente.


#### ¿Por qué no debes modificar el state directamente?

Modificar el state directamente (por ejemplo, `this.state.count = 5` o `state.count = 5`) no dispara un re-render en React, por lo que la UI no se actualizará. Además, React usa la comparación de referencias para optimizar renders, y si mutas el objeto directamente, React no detectará el cambio.

Siempre debes usar la función setter (`setState` o `useState` setter) para actualizar el state:

```javascript
// ❌ MAL
state.filters.status = 'completed';

// ✅ BIEN
setFilters(prev => ({ ...prev, status: 'completed' }));
```

#### ¿Cuándo usarías useState vs useReducer?

- **useState**: Ideal para estados simples con pocos valores o estados independientes. Es más simple y directo.

- **useReducer**: Mejor para estados complejos con múltiples subvalores, cuando la lógica de actualización es compleja, o cuando el siguiente estado depende del anterior de manera compleja. También es útil cuando quieres centralizar la lógica de actualización.


### 3. Hooks personalizados: ¿Qué son los custom hooks y cuándo crearías uno? Proporciona un ejemplo de caso de uso.

Los **custom hooks** son funciones JavaScript que comienzan con "use" y pueden llamar a otros hooks. Permiten extraer lógica de componentes para reutilizarla entre diferentes componentes.

**Cuándo crear uno:**
- Cuando hay lógica que se repite en múltiples componentes
- Cuando se separa la lógica de negocio de la lógica de presentación
- Cuando la lógica es compleja y quieres hacer el componente más legible

**Ejemplo del proyecto - useFetch:**
```javascript
export const useFetch = (fetchFn) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    fetchFn()
      .then(setData)
      .catch(() => setError('Error al cargar los datos'))
      .finally(() => setLoading(false));
  }, [fetchFn]);

  return { data, loading, error };
};
```

Este hook encapsula toda la lógica de fetching de datos, manejo de estados de carga y errores, permitiéndonos reutilizarlo para diferentes APIs sin duplicar código.

### 4. Performance: Explica las diferencias entre useMemo, useCallback y React.memo. ¿Cuándo usarías cada uno?

- **useMemo**: Memoriza el resultado de un cálculo costoso. Solo recalcula cuando sus dependencias cambian. Útil para cálculos pesados o transformaciones de datos.

- **useCallback**: Memoriza una función. Útil cuando pasas funciones como props a componentes memoizados, evitando que se recree la función en cada render.

- **React.memo**: Memoriza un componente completo. Solo re-renderiza si sus props cambian (comparación superficial). Útil para componentes que reciben las mismas props frecuentemente.

**Cuándo usar cada uno:**
- **useMemo**: Cálculos costosos, transformaciones de arrays/objetos grandes
- **useCallback**: Funciones pasadas como props a componentes memoizados
- **React.memo**: Componentes que se renderizan frecuentemente con las mismas props

### 5. Context API: ¿Cuándo usarías Context API vs prop drilling vs una librería de estado global como Redux? ¿Cuáles son los pros y contras?

**Prop Drilling:**
- **Cuándo**: Para pocos niveles de componentes, datos que solo algunos componentes necesitan
- **Pros**: Simple, explícito, fácil de seguir el flujo de datos
- **Contras**: Props pasándose por componentes intermedios que no las usan, verboso

**Context API:**
- **Cuándo**: Cuando necesitas compartir datos entre muchos componentes en diferentes niveles, temas, autenticación, configuraciones globales
- **Pros**: Evita prop drilling, nativo de React, simple para casos básicos
- **Contras**: Puede causar re-renders innecesarios si no se optimiza, no es ideal para estados que cambian frecuentemente

**Redux (o librerías similares):**
- **Cuándo**: Aplicaciones grandes, estado complejo, middleware necesario
- **Pros**: Estado predecible, herramientas de desarrollo excelentes, patrones claros, escalable
- **Contras**: Más boilerplate, curva de aprendizaje, puede ser excesivo para apps pequeñas

## JavaScript/ES6+

### 6. Destructuring y Spread: Explica cómo funcionan y da un ejemplo de uso común en React.

**Destructuring** permite extraer valores de arrays u objetos de manera concisa:

```javascript
// Objetos
const { name, email } = user;
// Equivale a: const name = user.name; const email = user.email;

// Arrays
const [first, second] = items;
// Equivale a: const first = items[0]; const second = items[1];
```

**Spread operator** (`...`) permite expandir elementos:

```javascript
// Copiar arrays
const newArray = [...oldArray, newItem];

// Copiar objetos
const newObj = { ...oldObj, newProperty: 'value' };

// Combinar objetos
const merged = { ...obj1, ...obj2 };
```

**Ejemplo común en React:**
```javascript
// En el proyecto - actualizar estado sin mutar
const handleStatusChange = (e) => {
  setFilters(f => ({ ...f, status: e.target.value }));
  // Crea un nuevo objeto con todas las propiedades de f, pero status actualizado
};

// Props destructuring
const TaskCard = ({ task, user, onClick }) => {
  // En lugar de props.task, props.user, etc.
};
```

### 7. Promesas y Async/Await: Escribe un ejemplo de cómo manejarías una llamada a API con manejo de errores usando async/await.

```javascript
// Ejemplo del proyecto
export const fetchTodos = async () => {
  try {
    const response = await fetch(`${BASE_URL}/todos`);
    
    if (!response.ok) {
      throw new Error('Error al obtener las tareas');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    // Podrías loguear el error, enviarlo a un servicio de monitoreo, etc.
    console.error('Error fetching todos:', error);
    throw error; 
  }
};

// Uso en un componente
const loadData = async () => {
  try {
    setLoading(true);
    const todos = await fetchTodos();
    setData(todos);
  } catch (error) {
    setError(error.message);
  } finally {
    setLoading(false);
  }
};
```

**Ventajas de async/await:**
- Código más legible y secuencial
- Manejo de errores más natural con try/catch
- Evita el "callback hell" de las promesas encadenadas

### 8. Array Methods: ¿Cuáles son los métodos de array más útiles en React y por qué? (map, filter, reduce, etc.)

Los métodos de array más útiles en React son:

**map**: Transforma cada elemento y retorna un nuevo array. Esencial para renderizar listas.

```javascript
// En el proyecto
{tasks.map(task => (
  <TaskCard key={task.id} task={task} />
))}
```

**filter**: Crea un nuevo array con elementos que pasan una condición. Perfecto para filtros.

```javascript
// En el proyecto
const completedTasks = tasks.filter(task => task.completed);
```

**find**: Encuentra el primer elemento que cumple una condición.

```javascript
// En el proyecto
const user = users.find(u => u.id === task.userId);
```

**reduce**: Transforma un array en un valor único. Útil para sumas, conteos, agrupaciones.

```javascript
const total = tasks.reduce((sum, task) => sum + task.value, 0);
```

**some/every**: Verifican si algunos/todos los elementos cumplen una condición.

```javascript
const hasCompleted = tasks.some(task => task.completed);
```

**Por qué son útiles:**
- Son inmutables (no modifican el array original)
- Funcionales y declarativos
- Fáciles de combinar
- React los optimiza bien

## Styling y UI

### 9. CSS-in-JS vs CSS Modules vs Tailwind: Menciona ventajas y desventajas de cada approach.

**CSS-in-JS (styled-components, emotion, etc.):**
- **Ventajas**: 
  - Estilos co-localizados con componentes
  - Props dinámicos fáciles
  - Scoping automático (sin conflictos de nombres)
  - Temas dinámicos sencillos
- **Desventajas**: 
  - Bundle size mayor
  - Curva de aprendizaje
  - Debugging más difícil

**CSS Modules:**
- **Ventajas**: 
  - Scoping local automático
  - Sintaxis CSS estándar
  - Mejor rendimiento (compilación)
  - Fácil de adoptar
- **Desventajas**: 
  - Props dinámicos más complicados
  - Configuración adicional
  - Menos flexible que CSS-in-JS

**Tailwind CSS:**
- **Ventajas**: 
  - Desarrollo muy rápido
  - Consistencia de diseño
  - Bundle pequeño (purge CSS)
  - Responsive utilities excelentes
- **Desventajas**: 
  - HTML más verboso
  - Curva de aprendizaje
  - Puede ser difícil para estilos muy específicos
  - Menos semántico

### 10. Responsive Design: ¿Cómo implementarías un diseño responsive en React? Menciona al menos 2 estrategias.

**1. Media Queries con CSS (usado en este proyecto):**
```css
/* Mobile First */
.task-list {
  display: grid;
  grid-template-columns: 1fr; /* Mobile por defecto */
  gap: 1rem;
}

/* Tablet */
@media (min-width: 481px) {
  .task-list {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop */
@media (min-width: 768px) {
  .task-list {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

**2. CSS Grid y Flexbox con propiedades adaptativas:**
```css
.filters-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  /* Se adapta automáticamente al espacio disponible */
}
```

**3. Hooks personalizados para breakpoints (alternativa):**
```javascript
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);
  
  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addListener(listener);
    return () => media.removeListener(listener);
  }, [matches, query]);
  
  return matches;
};

// Uso
const isMobile = useMediaQuery('(max-width: 480px)');
```x