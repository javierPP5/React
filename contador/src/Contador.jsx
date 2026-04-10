import { useState } from "react"

function Contador() {
    const [contador, setContador] = useState(0);
    console.log("contador actualizado", contador)
    const handleInCrementar = () => {
        setContador((contadorActual) => contadorActual + 1);
        console.log("contador no actualizado", contador)
    }

    const handleDeCrementar = () => {
        setContador((contadorActual) => contadorActual - 2);
    }

    const handleReset = () => {
        setContador(0)
    }   
    
    return (
        <div>
            <h2>Contador</h2>
            <div>{contador}</div>
            <button onClick={handleInCrementar}>++</button>
            <button onClick={handleDeCrementar}>--</button>
            <button onClick={handleReset}>Reset</button>
        </div>
    )
}
export default Contador