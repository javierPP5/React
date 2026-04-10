md de pizza menu:
# MOVIDA REACT

## Instalación y puesta en ejecución en desarrollo

- Con vite:

  - npm create vite@latest
  - npm run dev

- De la forma nativa:
  - npx create-react-app@5 pizza-menu
  - npm start

## Component composition

- En app lo más limpio posible: Header-menu-footer
- Tal que se van creando subcomponentes funcionales con props, por ejemplo: order en footer

## Reusabilidad - Props

- Uso de props para hacer un componente reusable, y saber destructurar ese props.

## Uso de map y key en map

- map: declarativo, devuelve un array, no muta el estado-array, es más legible (1 sola línea), recomendado por React Docs
- forEecha: imperativo, no devuelve nada, si muta el estado-array (push), es ménos legible (varias líneas), no recomendado por React Docs: https://react.dev
- Cada vez que se usa map para renderizar una lista de componentes hay que pasarle un key para que React pueda identificar ese componente en el DOM de forma unívoca en cada renderización
- Map se puede usar con llaves o paréntesis, ejemplo:

  ```React
    #Map con paréntesis - lleva un return implícito
    {pizzaData.map((itemPizza) => (
            <Pizza key={itemPizza.name} pizza={itemPizza} loquesea="hjfafa" />
          ))}
  ```

  ```React
    #Map con llave - hay que especificar el return
    {pizzaData.map((itemPizza) => {
            return <Pizza key={itemPizza.name} pizza={itemPizza} loquesea="hjfafa" /> }
          )}
  ```

## Renderización condicional tanto para los estilos CSS como para los bloques JSX:

- Operadore ternario si hay else tbe => ? ::
- Operador lógico si solo hay un if: &&
- múltiples returns

## Extensión react developers tools

- para ver árbol de componentes

## Fragmentos de React

- Para envolver los nodos a devolver en un único nodo

  ```React
  return(<>
        <Header />
        <Menu />
        <Footer />

  </>);

  ```

- Esto es lo mismo

  ```React
  import {Fragment} from "react";
  <Fragment>
        <Header />
        <Menu />
        <Footer />

  </Fragment>

  ```
bzu-mvgi-dfz