import React, { useEffect, useState } from "react";
import {
  getProducts,
  updateProduct,
  deleteProduct,
  addCollectionAndDocuments,
  getProductById,
} from "../data/firebase";
import css from "./CRUDplantas.module.css";
import { ToastContainer, toast } from 'react-toastify';

const CRUDPlantas = () => {
  const [plantas, setPlantas] = useState([]);
  const [form, setForm] = useState({
    id: "",
    nombre: "",
    nombreCientifico: "",
    descripcion: "",
    precio: "",
    filtro: "",
    foto: ""
  });

  const [modoEdicion, setModoEdicion] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [cargarPlantas, setCargarPlantas] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const plantasData = await getProducts();
        setPlantas(plantasData);
      } catch (err) {
        console.error("Error al cargar productos:", err);
        setError(err);
      } finally {
        setLoading(false);
        setCargarPlantas(false);
      }
    };

    fetchProducts();
  }, [cargarPlantas]);

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>Error al cargar productos</p>;

  // Manejar formulario
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Crear nuevo producto
const handleCreate = async (e) => {
  e.preventDefault();
  try {
    // Obtener el último ID y sumarle 1
    const ultimoId = plantas.length > 0
      ? Math.max(...plantas.map((p) => parseInt(p.id)))
      : 0;
    const nuevoId = (ultimoId + 1).toString();

    const nuevaPlanta = { ...form, id: nuevoId };

    await addCollectionAndDocuments("plantas", [nuevaPlanta]);

    toast.success("producto creado correctamente!", {
        autoClose: 1000,
      });
    setForm({ nombre: "", nombreCientifico: "", descripcion: "", precio: "", filtro: "", foto: "" });
    setCargarPlantas(true);
  } catch (err) {
    console.error("Error al crear producto:", err);
    alert("Ocurrió un error al crear el producto");
  }
};


const cargarParaEditar = async (id) => {
  try {
    const data = await getProductById(id);
    setForm(data);
    setModoEdicion(true);
  } catch (err) {
    console.error("Error al cargar producto para editar:", err);
    alert("Ocurrió un error al cargar el producto");
  }
};

  // Guardar 
const handleEdit = async (e) => {
  e.preventDefault();
  try {
    await updateProduct(form.id, form);
    toast.success("producto editado correctamente!", {
        autoClose: 1000,
      });
    setModoEdicion(false);
    setForm({ id: "", nombre: "", nombreCientifico: "", descripcion: "", precio: "", filtro: "", foto: "" });
    setShowModal(false)
    setCargarPlantas(true);
  } catch (err) {
    console.error("Error al actualizar producto:", err);
    alert("Ocurrió un error al actualizar el producto");
  }
};

  // Eliminar producto
const handleDelete = async (id) => {
  if (!confirm("¿Seguro que deseas eliminar este producto?")) return;
  try {
    await deleteProduct(id);
    setCargarPlantas(true);
  } catch (err) {
    console.error("Error al eliminar producto:", err);
    alert("Ocurrió un error al eliminar el producto");
  }
};

  return (
    <main className={css.main}>
      <div className={css.contenedor}>
        <button className={css.btndefault} onClick={() => setShowModal(!showModal)}>Crear Nueva Planta</button>
        {showModal && (
          <div className={css.modalFondo}>
            <div className={css.modalContenido}>
              <form onSubmit={modoEdicion ? handleEdit : handleCreate}>
                <h2 className={css.tittleModal}>{modoEdicion ? "Editar Planta" : "Crear Planta"}</h2>

                <input className={css.colorInput}
                  type="hidden"
                  placeholder="ID"
                  name="id"
                  value={plantas.length > 0 ? (Math.max(...plantas.map(p => parseInt(p.id))) + 1) : 1}
                  disabled
                />

                <input className={css.colorInput}
                  type="text"
                  placeholder="Nombre"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  required
                />

                <input className={css.colorInput}
                  type="text"
                  placeholder="nombreCientifico"
                  name="nombreCientifico"
                  value={form.nombreCientifico}
                  onChange={handleChange}
                  required
                />

                <input className={css.colorInput}
                  type="textbox"
                  placeholder="Descripción"
                  name="descripcion"
                  value={form.descripcion}
                  onChange={handleChange}
                />
                <input className={css.colorInput}
                  type="number"
                  placeholder="Precio"
                  name="precio"
                  value={form.precio}
                  onChange={handleChange}
                />
                <input className={css.colorInput}
                  type="text"
                  placeholder="Filtro (categoría)"
                  name="filtro"
                  value={form.filtro}
                  onChange={handleChange}
                />
                <input className={css.colorInput}
                  type="text"
                  placeholder="URL foto"
                  name="foto"
                  value={form.foto}
                  onChange={handleChange}
                />

                <button className={css.btndefault} type="submit">
                  {modoEdicion ? "Guardar Cambios" : "Crear"}
                </button>

                  <button className={css.btndefault} onClick={() => {setShowModal(false);
                   setForm({ id: "", nombre: "", nombreCientifico: "", descripcion: "", precio: "", filtro: "", foto: "" });}}>
                    Cerrar
                  </button>
          
              </form>
            </div>
          </div>
        )}

        {/* LISTA */}
        <div className={css.contenedorTabla}>
          <h2>Lista de Plantas</h2>
          <table border="1" cellPadding="8">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Nombre Cientifico</th>
                <th>Precio</th>
                <th>Filtro</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {plantas.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.nombre}</td>
                  <td>{p.nombreCientifico}</td>
                  <td>{p.precio} €</td>
                  <td>{p.filtro}</td>
                  <td>
                    <button onClick={() => { cargarParaEditar(p.id); setShowModal(true); }} className={css.btnEditar}>Editar</button>
                    <button onClick={() => handleDelete(p.id)} className={css.btnEliminar}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ToastContainer autoClose={1000} />
    </main>
  );
};

export default CRUDPlantas;
