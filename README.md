# User panel

Interfaz gráfica para manejo de usuarios, desarrollado usando Vue 3 (Composition API), Pinia y Tailwind para estilos.

## Prerequisitos

- Tener instalado [Nodejs](https://nodejs.org/en/)
  > Versión recomendada v18+

## Por donde comenzar

### Para clonar

```bash
https://github.com/AlexxCepeda/user-panel.git
```

### Para instalar

```bash
npm install
```

### Iniciar la app en modo desarrollo

```bash
npm run dev
```

## Funcionamiento

### Table

#### Separación de vistas.

Se implementaron ambas vistas para la tabla `Table` y `Card`, para la tabla toma diferentes props, como data, columnas, showActions (para mostrar la columna de acciones `delete` y `details`) las cuales son pasadas al componente a través de slots.

Por otro lado la card, las cuales las acciones son definidas en el mismo componente, para futuras mejoras tomar las definidas para la tabla y así reusarlas.

### User detail view

#### Button hover.

Para la funcionalidad de mostrar el botón de eliminar, este fue implementado sobre la imagen al momento de hacer hover, en la vista de detalle del usuario.

### Componentes

#### Dialog.

Para manejar el modal de interacción se utiliza el componente Dialog, el cual es reusable para diferentes objetivos.

#### Filters.

Se desarrolló un "wrapper" principal para todos los filtros, el cual es FilterDropdow, aquí envuelve a los demás filtros, como edad, país y género.

### Composables

#### Exportar csv.

Para exportar los datos de nuestra tabla no se utiliza ninguna libreria externa se genera un elemento html para hacer la descarga del mismo.

### Puntos a mejorar

- Acciones en card view: Reusar las acciones de la vista de tabla dadas por el desarrollador.
- Los estilos para vistas de detalle del usuario.
- Usar alguna libreria para crear/modificar csv con mejor desempeño.

### Dependencias

```bash
  "dependencies": {
    "@vueuse/core": "^10.11.0",
    "axios": "^1.7.2",
    "pinia": "^2.1.7",
    "vue": "^3.4.29",
    "vue-router": "^4.3.3"
  }
```

El uso de la dependecia `@vueuse/core` es para la funcionalidad al hacer click afuera del modal o del filter, y así poder cerrarlo automaticamente para comododidad del usuario.
