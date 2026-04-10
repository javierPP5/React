import { useParams, Link } from "react-router-dom";
import styles from "./Card.module.css";
import { useState, useEffect } from "react";
import { getProducts } from "../data/firebase.js";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Card() {
    const { addToCart } = useContext(CartContext);
    const { id } = useParams();
    const currentId = String(id);

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [similares, setSimilares] = useState([]);
    
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productsData = await getProducts();
                setProducts(productsData);

                //productos similares
                const recomendados = productsData
                    .filter((p) => p.id !== currentId)
                    .sort(() => Math.random() - 0.5)
                    .slice(0, 4);
                setSimilares(recomendados);
            } catch (err) {
                console.error("Error al cargar productos:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [currentId]);

    if (loading) return <p>Cargando productos...</p>;
    if (error) return <p>Error al cargar productos</p>;

    const planta = products.find((p) => p.id === currentId);

    if (!planta) return <p>Producto no encontrado</p>;

    return (
        <main className={styles.main}>
            {/* Producto principal */}
            <div className={styles.productoPrincipal}>
                <div className={styles.fotoPrincipal}>
                    <img src={planta.foto} alt={planta.nombre} />
                </div>
                <div className={styles.infoPrincipalCard}>
                    <h1>{planta.nombre}</h1>
                    <span>{planta.nombreCientifico}</span>
                    <p>{planta.tipo}</p>
                    <p>{planta.descripcion}</p>
                    <p>{planta.precio}€</p>

                    <button
                        className={styles.botonComprar}
                        onClick={() => addToCart(planta)}
                    >
                        AGREGAR AL CARRITO
                    </button>
                </div>
            </div>

            {/* Productos similares */}
            <div className={styles.seccionSimilares}>
                <h2 className={styles.similaresTitulo}>PRODUCTOS SIMILARES</h2>
                <div className={styles.similaresGrid}>
                    {similares.map((plantasRecomendadas) => (
                        <Link
                            key={plantasRecomendadas.id}
                            to={`/planta/${plantasRecomendadas.id}`}
                            className={styles.card}
                        >
                            <div className={styles.infoPrincipal}>
                                <div className={styles.cardFoto}>
                                    <img
                                        src={plantasRecomendadas.foto}
                                        alt={plantasRecomendadas.nombre}
                                    />
                                </div>
                                <div className={styles.cardContenido}>
                                    <span className={styles.texto}>
                                        {plantasRecomendadas.nombre}
                                    </span>
                                    <p>{plantasRecomendadas.nombreCientifico}</p>
                                    <p>{plantasRecomendadas.tipo}</p>
                                    <h5>Precio: {plantasRecomendadas.precio}€</h5>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <Link to="/catalogoCompleto" className={styles.catalogoBoton}>
                Catálogo Completo
            </Link>
        </main>
    );
}

export default Card;
