import styles from "./Home.module.css";
import Carousel from "../components/carrusel.jsx";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getProducts } from "../data/firebase.js";

function Home() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getProducts();
        setProducts(productsData);
      } catch (err) {
        console.error("Error al cargar productos:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>Error al cargar productos</p>;

  return (
    <>
      <main className={styles.main}>
        <Carousel />
        <div className={styles.tituloDestacados}>
          <h2>PRODUCTOS DESTACADOS</h2>
          <hr />
        </div>

        <div className={styles.destacadosContainer}>
          {products.filter((planta) => planta.id <= 4).map((planta) => (
            <Link
              key={planta.id}
              to={`/planta/${planta.id}`} 
              className={styles.card}
            >
              <div className={styles.cardFoto}>
                <img src={planta.foto} alt={planta.nombre} />
              </div>
              <div className={styles.cardContenido}>
                <span className={styles.texto}>{planta.nombre}</span>
                <p>{planta.tipo}</p>
                <h5>Precio: {planta.precio}€</h5>
              </div>
            </Link> 
          ))}
        </div>

        <Link to="/catalogoCompleto" className={styles.catalogoBoton}>
          Catálogo Completo
        </Link>
        <div>
      </div>
      </main>
    </>
  );
}

export default Home;