import React from 'react';
import navStyles from "./navigation.module.css";
import { NavLink } from "react-router-dom";

import { HiOutlineLightBulb } from 'react-icons/hi';
import { FiSearch, FiUser, FiShoppingCart } from 'react-icons/fi';

function Navigation() {
    return (
      
        <nav className={navStyles.navContainer}>

            {/* 1. Barra de Búsqueda */}
            <div className={navStyles.searchBar}>
                <FiSearch className={navStyles.searchIcon} size={20} />
                <input type="text" 
                placeholder="Buscar" 
                    className={navStyles.searchInput} 
                />
            </div>

            
            {/* 2. Icono de Bombilla (como un botón) */}
            <button className={navStyles.iconButton}>
                <HiOutlineLightBulb size={26} />
            </button>

            {/* 3. Icono de Usuario (enlazando a /login) */}
            <NavLink 
                to="/login" 
                className={({isActive}) => 
                    `${navStyles.iconButton} ${isActive ? navStyles.active : ''}`
                }
            >
                <FiUser size={26} />
            </NavLink>

            {/* 4. Icono de Carrito (hacer el /carrito) */}
            <NavLink 
                to="/carrito" 
                className={({isActive}) => 
                    `${navStyles.iconButton} ${isActive ? navStyles.active : ''}`
                }
            >
                <FiShoppingCart size={26} />
            </NavLink>
            
        </nav>
    )
}

export default Navigation;