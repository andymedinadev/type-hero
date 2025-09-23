# Type Hero 🎯

Una aplicación web moderna de práctica de mecanografía construida con Preact, TypeScript y Tailwind CSS. Ofrece retroalimentación visual en tiempo real, estadísticas detalladas de rendimiento y una experiencia de usuario fluida.

## 🎯 Demo

Prueba Type Hero directamente en tu navegador! No requiere instalación.

[🚀 Ver Demo en Vivo](https://type-hero-project.vercel.app/)

## 🚀 Características Principales

- **Retroalimentación en Tiempo Real**: Indicadores visuales carácter por carácter mientras escribes
- **Audio Feedback**: Sonidos de tecleo para una experiencia inmersiva
- **Estadísticas Completas**: Palabras por minuto (WPM), precisión y tiempo transcurrido
- **Diseño Responsivo**: Layout adaptativo que se ajusta a diferentes tamaños de pantalla
- **Interfaz Moderna**: Tema oscuro limpio y minimalista
- **Reset Instantáneo**: Funcionalidad de reinicio y repetición inmediata

## 🛠️ Stack Tecnológico

- **Frontend**: Preact ^10.26.9 (compatible con React)
- **Lenguaje**: TypeScript ~5.8.3
- **Estilos**: Tailwind CSS ^4.1.11
- **Build Tool**: Vite ^7.0.4
- **Herramientas de Desarrollo**: Prettier, TypeScript compiler

## 🏗️ Arquitectura

La aplicación sigue una arquitectura de separación de responsabilidades con un motor de lógica de juego centralizado:

- **Capa de Presentación**: Componentes UI (`App`, `TypingText`, `Results`)
- **Capa de Lógica**: Hook personalizado `useTypingGame` para manejo de estado
- **Utilidades**: Funciones puras para procesamiento de datos
- **Assets**: Recursos estáticos y contenido

## 🎮 Flujo de la Aplicación

1. **Estado Inicial**: Generación de texto aleatorio y instrucciones
2. **Estado de Escritura**: Captura de entrada, feedback visual y audio
3. **Estado Finalizado**: Cálculo y visualización de estadísticas

## 📁 Estructura del Proyecto

```
src/
 ├── app.tsx                            # Componente principal de la aplicación
 ├── main.tsx                           # Punto de entrada
 ├── hooks/
 │     └── useTypingGame.ts             # Lógica central del juego
 ├── components/                        # Componentes UI modulares
 ├── utils/                             # Funciones utilitarias
 └── constants/                         # Datos y constantes
```

## 💡 Características Técnicas Destacadas

- **Gestión de Estado Centralizada**: Hook personalizado que maneja todo el estado del juego
- **Captura de Entrada Optimizada**: Input oculto para capturar eventos de teclado eficientemente
- **Layout Dinámico**: Recálculo automático del layout de texto en redimensionamiento
- **Validación de Entrada**: Prevención de teclas de navegación y operaciones de portapapeles
- **Feedback Audio**: Integración de audio con control de volumen optimizado

## 📈 Métricas de Rendimiento

- Tiempo de carga optimizado con Vite
- Bundle size minimizado con tree-shaking
- Renderizado eficiente con Preact
- Hot Module Replacement para desarrollo rápido

---

**Desarrollado por Andy Medina** | [Portfolio](https://andymedinadev.vercel.app/) | [LinkedIn](https://www.linkedin.com/in/andymedinadev/)
