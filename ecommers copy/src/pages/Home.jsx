import styles from "./Home.module.css";
import Carousel from "../components/carrusel.jsx";
import { Link } from "react-router-dom";
import plantasData from "../data/plantas.js"
import plantasDestacadasNombres from "../data/plantasFiltro.js";


const plantasDestacadas = plantasData.filter((planta) =>
  plantasDestacadasNombres.includes(planta.nombre)
);

function Home() {
  return (
    <>

    <main className={styles.main}>
          <Carousel />
      <div className={styles.tituloDestacados}>
        <h2>PRODUCTOS DESTACADOS</h2>
        <hr />
      </div>

      
      <div className={styles.destacadosContainer}>
        {plantasDestacadas.map((planta) => (
          
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
     

      <Link to="/catalogoCompleto" className={styles.catalogoBoton}>
        Catálogo Completo
      </Link>
    </main>
    </>
  );
}

export default Home;