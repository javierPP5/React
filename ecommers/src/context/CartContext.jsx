import { createContext, useEffect, useState } from "react";
import { 
  saveCartToFirestore, 
  getCartFromFirestore, 
  onAuthStateChangedListener 
} from "../data/firebase"; 

export const CartContext = createContext();

const mergeCarts = (localCart, remoteCart) => {
  const merged = [...remoteCart];

  localCart.forEach((localItem) => {
    const exist = merged.find((item) => item.id === localItem.id);

    if (exist) {
      exist.cantidad += localItem.cantidad; 
    } else {
      merged.push(localItem);
    }
  });

  return merged;
};

export function CartProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [carro, setCarrito] = useState(() => {
    const carroLocal = localStorage.getItem("carro");
    return carroLocal ? JSON.parse(carroLocal) : [];
  });

  const [abierto, setAbierto] = useState(false);

  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isMerging, setIsMerging] = useState(false);

  // Guardar carrito en localStorage al cambiar
  useEffect(() => {
    localStorage.setItem("carro", JSON.stringify(carro));
  }, [carro]);

  // Agregar producto
  const addToCart = (product) => {
    setCarrito((prev) => {
      const existe = prev.find((planta) => planta.id === product.id);

      if (existe) {
        return prev.map((planta) =>
          planta.id === product.id
            ? { ...planta, cantidad: planta.cantidad + 1 }
            : planta
        );
      }

      return [...prev, { ...product, cantidad: 1 }];
    });
  };

  // Eliminar producto
  const removeFromCart = (id) => {
    setCarrito((prev) => prev.filter((planta) => planta.id !== id));
  };

  // Limpiar carrito
  const clearCart = () => {
    setCarrito([]);
    localStorage.removeItem("carro");
  };

  // Subir cantidad
  const increaseQuantity = (id) => {
    setCarrito((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
      )
    );
  };

  // Bajar cantidad
  const decreaseQuantity = (id) => {
    setCarrito((prev) =>
      prev
        .map((item) =>
          item.id === id && item.cantidad > 1
            ? { ...item, cantidad: item.cantidad - 1 }
            : item
        )
        .filter((item) => item.cantidad > 0)
    );
  };

  // Merge carrito local y remoto al iniciar sesión
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(async (user) => {
      setCurrentUser(user);

      if (user) {
        setIsMerging(true);

        const localCart = JSON.parse(localStorage.getItem("carro")) || [];
        const remoteCart = await getCartFromFirestore(user.uid);

        const mergedCart = mergeCarts(localCart, remoteCart);

        setCarrito(mergedCart);
        await saveCartToFirestore(user.uid, mergedCart);

        localStorage.removeItem("carro");

        setIsMerging(false);
      }
    });

    return unsubscribe;
  }, []);

  // Sincronizar carrito con Firestore
  useEffect(() => {
    if (currentUser && !isLoggingOut && !isMerging) {
      saveCartToFirestore(currentUser.uid, carro);
    }
  }, [carro, currentUser, isLoggingOut, isMerging]);

  return (
    <CartContext.Provider
      value={{
        cart: carro,
        addToCart,
        removeFromCart,
        clearCart,          
        isLoggingOut,       
        setIsLoggingOut,    
        abierto,
        setAbierto,
        increaseQuantity,
        decreaseQuantity
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
