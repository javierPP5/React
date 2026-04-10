import React, { useContext, useState, useRef, useEffect } from "react";
import navStyles from "./navigation.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { HiOutlineLightBulb } from "react-icons/hi";
import { FiUser, FiShoppingCart } from "react-icons/fi";
import { UserContext } from "../../context/ContextUser";
import { signOutUser } from "../../data/firebase";
import { toast } from "react-toastify";
import { CartContext } from "../../context/CartContext";
import CartModal from "../../components/CartModal";



function Navigation() {
  const { abierto, setAbierto } = useContext(CartContext);
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const { clearCart, setIsLoggingOut } = useContext(CartContext);
  const [darkMode, setDarkMode] = useState(() => {
    // Cargar preferencia del usuario
    return localStorage.getItem("darkMode") === "true";
  });

  const navigate = useNavigate();
  const menuRef = useRef(null);

  // Cerrar menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Cambiar modo oscuro/claro
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

const handleLogout = async () => {
  try {

    setIsLoggingOut(true);       

    clearCart();                

    toast.info("👋 Has cerrado sesión correctamente", {
      autoClose: 1000,
      onClose: () => navigate("/"),
    });

    await signOutUser();       

    setCurrentUser(null);


    setMenuOpen(false);

    setIsLoggingOut(false);  

  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    toast.error("❌ Error al cerrar sesión");
    setIsLoggingOut(false);
  }
};



  return (
    <nav>
      {/* 2. Iconos */}
      <div className={navStyles.contenedorIconos}>
        {/* Botón de modo oscuro */}
        <button className={navStyles.iconButton} onClick={toggleDarkMode}>
          <HiOutlineLightBulb
            size={26}
            color={darkMode ? "#FFD700" : "inherit"}
            title={darkMode ? "Modo claro" : "Modo oscuro"}
          />
        </button>

        {/* Menú de usuario */}
        <div className={navStyles.userMenuContainer} ref={menuRef}>
          {currentUser ? (
            <>
              <button
                className={navStyles.iconButton}
                onClick={() => setMenuOpen((prev) => !prev)}
              >
                <FiUser size={26} />
              </button>

              {menuOpen && (
                <div className={navStyles.dropdownMenu}>
                  <p className={navStyles.nombre}>{currentUser.displayName}</p>

                  <button
                    onClick={handleLogout}
                    className={navStyles.logoutButton}
                  >
                    Cerrar sesión
                  </button>
                  {currentUser.rol === "admin" && (
                    <NavLink
                      to="/Admin"
                      className={navStyles.adminLink}
                      onClick={() => setMenuOpen(false)}
                    >
                      CRUD de productos
                    </NavLink>
                  )}

                  {currentUser.rol === "admin" && (
                    <NavLink
                      to="/AdminUsers"
                      className={navStyles.adminLink}
                      onClick={() => setMenuOpen(false)}
                    >
                      CRUD de usuarios
                    </NavLink>
                  )}

                  {currentUser.rol === "user" && (
                    <NavLink
                      to="/perfilUsuarios"
                      className={navStyles.adminLink}
                      onClick={() => setMenuOpen(false)}
                    >
                      Editar perfil
                    </NavLink>
                  )}
                </div>
              )}
            </>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `${navStyles.iconButton} ${isActive ? navStyles.active : ""
                }`
              }
            >
              <FiUser size={26} />
            </NavLink>
          )}
        </div>

        {/* 4. Icono del carrito */}
        <button
          className={navStyles.iconButton}
          onClick={() => setAbierto(true)}
        >
          <FiShoppingCart size={26} />
        </button>

        {abierto && <CartModal />}
      </div>
    </nav >
  );
}

export default Navigation;
