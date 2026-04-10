import { useState } from "react"; 
import styles from "./CatalogoCompleto.module.css";
import plantasData from "../data/plantas.js";

function CatalogoCompleto() {
 
  const [busqueda, setBusqueda] = useState("");

  const plantasFiltradas = plantasData.filter((planta) =>
    planta.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>NUESTRO CATÁLOGO</h1>

      <div className={styles.controles}>
        <button className={styles.botonOrdenar}>ORDENAR POR</button>
        <input
          type="text" placeholder="Buscar planta por nombre..." className={styles.buscador}
          value={busqueda} onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      <div className={styles.contenedorPlantas}>
       
        {plantasFiltradas.map((planta) => (
          <div key={planta.id} className={styles.card}>
            <div className={styles.cardFoto}>
              <img src={planta.foto} alt={planta.nombre} />
            </div>
            <div className={styles.cardContenido}>
              <span>{planta.nombre}</span>
              <p>{planta.descripcion}</p>
              <h5>Precio: {planta.precio}€</h5>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default CatalogoCompleto;