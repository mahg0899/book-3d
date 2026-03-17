# 3D Book Viewer

Este es un demo de un visor interactivo de libros en 3D con carrusel, admite rotación automática y arrastre de los contenidos. Desarrollado empleando HTML, CSS y JavaScript.

---

## Vista General

Este proyecto presenta una colección de libros clásicos como placeholders que fungen como modelos tridimensionales y se encuentran plenamente desarrollados y ejecutados con CSS 3D Transforms. 

Cada libro aquí presentado posee una portada sencilla, contraportada, lomo y texturas de páginas, el objetivo de este proyecto es experimentar con los límites de CSS 3D Transforms y crear una experiencia visualmente atractiva e interactiva.

## Caracteristicas

- **Modelo 3D completo** -- Cada libro tiene 6 caras: portada, contraportada, lomo, borde de paginas, borde superior e inferior, todos renderizados con transformaciones CSS 3D.
- **Rotacion por arrastre** -- Arrastra el libro activo con el mouse o dedo para rotarlo libremente en los ejes X e Y.
- **Inercia fisica** -- Al soltar el arrastre, el libro continua girando con desaceleracion progresiva mediante friccion.
- **Carrusel navegable** -- Navega entre libros con scroll, flechas, puntos indicadores o haciendo clic en un libro adyacente.
- **Auto-rotacion** -- Modo de giro automatico continuo para visualizar el libro desde todos los angulos.
- **Volteo rapido** -- Boton para girar el libro directamente a la contraportada.
- **Panel de detalles** -- Panel lateral deslizable con informacion completa del libro: autor, editorial, anio, genero, paginas, ISBN, sinopsis, etiquetas y enlaces a Goodreads y Amazon.
- **Deteccion de cara posterior** -- Un boton flotante "Ver Detalles" aparece automaticamente cuando la contraportada es visible.
- **Diseno responsivo** -- Dimensiones del libro y controles se adaptan a pantallas moviles (breakpoint 768px).
- **Atajos de teclado** -- Navegacion y controles accesibles desde el teclado.

## Libros Incluidos

| Titulo                  | Autor                     | Anio | Genero          |
|-------------------------|---------------------------|------|-----------------|
| El Principito           | Antoine de Saint-Exupery  | 1943 | Fabula          |
| Cien Anios de Soledad   | Gabriel Garcia Marquez    | 1967 | Realismo Magico |
| 1984                    | George Orwell             | 1949 | Distopia        |
| Don Quijote de la Mancha| Miguel de Cervantes       | 1605 | Novela          |
| El Alquimista           | Paulo Coelho              | 1988 | Ficcion         |

## Estructura del Proyecto

```
3d/
├── index.html       # Estructura HTML y SVGs de los controles
├── styles.css       # Estilos completos: modelo 3D, carrusel, panel, responsivo
├── script.js        # Logica: carrusel, arrastre, inercia, panel de detalles
├── assets/
│   └── pagestexture.png   # Textura para el borde de paginas del libro
└── README.md
```

## Uso

### Abrir Localmente

1. Clona o descarga el repositorio.
2. Abre `index.html` en un navegador moderno.

No requiere servidor, bundler ni instalacion de dependencias.

### Atajos de Teclado

| Tecla                           | Accion                         |
|---------------------------------|--------------------------------|
| `R`                             | Resetear vista del libro       |
| `F`                             | Voltear a la contraportada     |
| `Espacio`                       | Activar/desactivar auto-rotacion |
| `Flecha Derecha` / `Flecha Abajo` | Siguiente libro              |
| `Flecha Izquierda` / `Flecha Arriba` | Libro anterior            |
| `Escape`                        | Cerrar panel de detalles       |

### Interaccion con Mouse/Tactil

- **Arrastrar** sobre el libro activo para rotarlo en 3D.
- **Scroll** para navegar entre libros.
- **Clic** en un libro adyacente para seleccionarlo.

## Tecnologias

- **HTML5** -- Estructura semantica con SVGs inline para iconos.
- **CSS3** -- Variables CSS, transformaciones 3D (`preserve-3d`, `perspective`), animaciones con `@keyframes`, media queries, `backdrop-filter`.
- **JavaScript (ES6+)** -- IIFE, manipulacion del DOM, gestion de eventos (mouse, touch, wheel, teclado), `requestAnimationFrame` para animaciones fluidas.
- **Google Fonts** -- Playfair Display, Inter y Cormorant Garamond.
- **Font Awesome** -- Iconos de las marcas Amazon y Goodreads.

## Compatibilidad

Funciona en navegadores modernos que soporten CSS 3D Transforms y `perspective`:

- Chrome 36+
- Firefox 16+
- Safari 9+
- Edge 12+