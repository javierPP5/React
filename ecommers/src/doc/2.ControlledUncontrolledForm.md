# Controlled form versus Uncontrolled form

sacado de la IA de Vercel: https://v0.app/

## Ventajas Uncontrolled:\*\*

- ✅ Mucho más eficiente (evita re-renders innecesarios)
- ✅ Mejor performance en formularios grandes
- ✅ Menos trabajo para React en cada keystroke

## Ventajas Controlled:\*\*

- ✅ Más "React-way" y predecible
- ✅ Más fácil de testear y debuggear
- ✅ Mejor para validaciones en tiempo real o formateo de input
- ✅ Necesario si otros componentes necesitan acceder al valor

## Solo usaría controlled si necesitas el valor del input para otras cosas en tiempo real:\*\*

- Validación visual instantanea: Mostrar fuerza de contraseña mientras escribes.
- Formateo automático del input: Formatear el numero de tarjeta mientras escribes
- Búsqueda con resultados en vivo: Necesitas filtrar mientras escribes
- Input dependientes: Cada vez que cambias la cantidad de un elemento que se actualice el total del carrito
- Autocontemplado - sugerencias

## Regla general:

- Si otro componente, cálculo o UI necesita **reaccionar inmediatamente** al valor del input, usa controlled. Si solo necesitas el valor al enviar el formulario, uncontrolled es más eficiente.