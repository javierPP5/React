import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import styles from "./CartModal.module.css";

function CartModal() {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity, setAbierto } =
    useContext(CartContext);
const total = parseFloat(
  cart.reduce((acc, planta) => acc + planta.precio * planta.cantidad, 0).toFixed(2)
);


  return (
    <div className={styles.overlay} onClick={() => setAbierto(false)}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.titulo}>Tu carrito</h2>

        {cart.length === 0 ? (
          <p>Carrito vacío</p>
        ) : (
          cart.map((planta) => (
            <div key={planta.id} className={styles.item}>
              <div className={styles.left}>
                <img src={planta.foto} alt={planta.nombre} />
                <div className={styles.textos}>
                  <h4>{planta.nombre}</h4>
                  <p>{(planta.precio * planta.cantidad).toFixed(2)} €</p>

                  {/* Botones de cantidad */}
                  <div className={styles.cantidadControls}>
                    <button onClick={() => decreaseQuantity(planta.id)}>-</button>
                    <span>{planta.cantidad}</span>
                    <button onClick={() => increaseQuantity(planta.id)}>+</button>
                  </div>
                </div>
              </div>

              <button
                onClick={() => removeFromCart(planta.id)}
                className={styles.removebtn}
              >
                X
              </button>
            </div>
          ))
        )}

        <p>Total: {total} €</p>
        <button className={styles.cerrar} onClick={() => setAbierto(false)}>
          Cerrar
        </button>
      </div>
    </div>
  );
}

export default CartModal;
