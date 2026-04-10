import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import styles from "./CatalogoCompleto.module.css";
import { Link } from "react-router-dom";
import { getProducts } from "../data/firebase.js";

const plantasPorPagina = 8;

function Catalogo() {
  const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(0);

  const [filtroPlantas, setFiltro] = useState([]);
  const [mostrarFiltros, setMostrarFiltros] = useState(false);

  const [products, setProducts] = useState([]);
  const [plantasMostradas, setPlantasMostradas] = useState([]);
  const [plantasFiltradas, setPlantasFiltradas] = useState([]);
  const [paginasTotales, setPaginasTotales] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar productos
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getProducts();
        setProducts(productsData);
        setPlantasFiltradas(productsData);
      } catch (err) {
        console.error("Error al cargar productos:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // FILTROS + BUSQUEDA
  useEffect(() => {
    const filtradas = products.filter((planta) => {
      const coincideBusqueda = planta.nombre.toLowerCase().includes(busqueda.toLowerCase());

      if (filtroPlantas.length === 0) return coincideBusqueda;

      // Verificar si planta tiene TODOS los filtros seleccionados
      const coincideFiltro = filtroPlantas.every((filtroSeleccionado) =>
        planta.filtro.includes(filtroSeleccionado)
      );
      
      return coincideBusqueda && coincideFiltro;
    });

    setPlantasFiltradas(filtradas);
    setPaginaActual(0);
  }, [busqueda, filtroPlantas, products]);

  useEffect(() => {
    const inicio = paginaActual * plantasPorPagina;
    const mostradas = plantasFiltradas.slice(inicio, inicio + plantasPorPagina);
    setPlantasMostradas(mostradas);
  }, [paginaActual, plantasFiltradas]);

  useEffect(() => {
    const totalPaginas = Math.ceil(plantasFiltradas.length / plantasPorPagina);
    setPaginasTotales(totalPaginas);
  }, [plantasFiltradas]);

  const handlePageChange = ({ selected }) => {
    setPaginaActual(selected);
  };

  const handleCambiarFiltros = (valor, isChecked) => {
    if (isChecked) {
      setFiltro([...filtroPlantas, valor]);
    } else {
      setFiltro(filtroPlantas.filter((f) => f !== valor));
    }
  };


  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>Error al cargar productos</p>;

  return (
    <main className={styles.main}>
      <h1>NUESTRO CATÁLOGO</h1>

      <div className={styles.controles}>
        <button
          className={styles.botonOrdenar}
          onClick={() => setMostrarFiltros(!mostrarFiltros)}
        >
          Filtrar plantas
        </button>

        <input
          type="text"
          placeholder="Buscar planta por nombre..."
          className={styles.buscador}
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      {mostrarFiltros && (
        <>
          <div
            className={styles.overlayFiltros}
            onClick={() => setMostrarFiltros(false)}
          ></div>

          <div className={styles.panelFiltros}>
            <h3>Filtrar por tipo</h3>

            <div className={styles.checkbox}>
              <input
                id="exterior"
                type="checkbox"
                checked={filtroPlantas.includes("Planta de exterior")}
                onChange={(e) => handleCambiarFiltros("Planta de exterior", e.target.checked)}
              />
              <label htmlFor="exterior">Planta Exterior</label>
            </div>

            <div className={styles.checkbox}>
              <input
                id="interior"
                type="checkbox"
                checked={filtroPlantas.includes("Planta de interior")}
                onChange={(e) => handleCambiarFiltros("Planta de interior", e.target.checked)}
              />
              <label htmlFor="interior">Planta Interior</label>
            </div>

            <div className={styles.checkbox}>
              <input
                id="secano"
                type="checkbox"
                checked={filtroPlantas.includes("Planta de secano")}
                onChange={(e) => handleCambiarFiltros("Planta de secano", e.target.checked)}
              />
              <label htmlFor="secano">Planta de secano</label>
            </div>

            <div className={styles.checkbox}>
              <input
                id="regadio"
                type="checkbox"
                checked={filtroPlantas.includes("Planta de regadio")}
                onChange={(e) => handleCambiarFiltros("Planta de regadio", e.target.checked)}
              />
              <label htmlFor="regadio">Planta de regadio</label>
            </div>

            <div className={styles.checkbox}>
              <input
                id="perenne"
                type="checkbox"
                checked={filtroPlantas.includes("Hoja perenne")}
                onChange={(e) => handleCambiarFiltros("Hoja perenne", e.target.checked)}
              />
              <label htmlFor="perenne">Hoja perenne</label>
            </div>

                        <div className={styles.checkbox}>
              <input
                id="perenne"
                type="checkbox"
                checked={filtroPlantas.includes("Hoja caduca")}
                onChange={(e) => handleCambiarFiltros("Hoja caduca", e.target.checked)}
              />
              <label htmlFor="perenne">Hoja caduca</label>
            </div>
            <button
              className={styles.cerrarPanel}
              onClick={() => setMostrarFiltros(false)}
            >
              Cerrar
            </button>
          </div>
        </>
      )}

      <div className={styles.contenedorPlantas}>

        {plantasMostradas.map((planta) => (
          <Link
            key={planta.id}
            to={`/planta/${planta.id}`}
            className={styles.card}
          >
            <div className={styles.cardFoto}>
              <img src={planta.foto} alt={planta.nombre} />
            </div>
            <div className={styles.cardContenido}>
              <span>{planta.nombre}</span>
              <p>{planta.tipo}</p>
              <h5>Precio: {planta.precio}€</h5>
            </div>
          </Link>
        ))}

      {plantasMostradas.length === 0 && (
        <p>No se encontraron plantas que coincidan con los criterios de búsqueda y filtro.</p>
      )}
      </div>

      {paginasTotales > 1 && (
        <ReactPaginate
          previousLabel={"<- Anterior"}
          nextLabel={"Siguiente ->"}
          breakLabel={"..."}
          pageCount={paginasTotales}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageChange}
          containerClassName={styles.pagination}
          activeClassName={styles.activePage}
          previousClassName={styles.pageBtn}
          nextClassName={styles.pageBtn}
          pageClassName={styles.pageNumber}
        />
      )}
    </main>
  );
}

export default Catalogo;
