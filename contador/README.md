# CONTADOR REACT - ENTENDIENDO EL HOOK USESTATE

## React no actualiza el estado de forma inmediata

```React
   setContador(contador + 1);
   console.log(contador);

```

## Este console no muestra el valor actualizado del contador, marca un cambio pendiente y planifica una nueva renderización

```React
   setContador(contador + 1);
   setContador(contador + 1);

```

## El resultado no es 2 sino que 1, esto pasa porque React usa el mismo valor en ambas llamadas ya que aun no ha renderizado

Lo que hace React, es poner en un batch, los diferentes de cambios de estado para solo hacer una renderización mas eficiente

Entonces, como le decimos a React, que use en cada llamada, el valor de contador, como si hubiera hecho una renderización, pues haciendo uso de callback o funciones flecha:

```React
    setContador((contadorPrevio) => contadorPrevio + 1);
    setContador((contadorPrevio) => contadorPrevio + 1);

```

## En este ejemplo, cuando se hace click en incrementar, el valor de contador no cambia inmediatamente

React marca el estado como pendiente de actualización
El console.log se ejecuta antes de que React vuelva a renderizar el conmponente

Una vez que se ha renderizado el componente, se ejecuta el primer console.log y alli se ve el estado contador actualizado

```React
    const [contador, setContador] = useState(0);
    console.log("contador actualizado", contador);
    function increment() {
        setContador((contadorPrevious) => contadorPrevious + 1);
        console.log("contador no actualizado", contador);
    }

```