import navStyles from "./navigationFooter.module.css";
import { NavLink } from "react-router-dom";
import { FiFacebook, FiInstagram, FiTwitter } from 'react-icons/fi';

function NavigationFooter() {
    return (
        <nav className={navStyles.navContainer}>

            {/* 1. icono de twiteer */}
            <NavLink
                to="https://x.com/leroymerlin_es?lang=es"
                className={navStyles.iconButton}
                target="_blank"
                rel="twitter"
            >
                <FiTwitter size={20} />
            </NavLink>

            {/* 2. Logo facebook */}
            <NavLink
                to="https://www.facebook.com/leroymerlines/?locale=es_ES"
                className={navStyles.iconButton}
                target="_blank"
                rel="facebook"
            >
                <FiFacebook size={20} />
            </NavLink>

            {/* 3. Logo de instagram */}
            <NavLink
                to="https://www.instagram.com/leroymerlines/?hl=es"
                className={navStyles.iconButton}
                target="_blank"
                rel="instagram"
            >
                <FiInstagram size={20} />
            </NavLink>

            {/* 4. Sobre nosotros */}
            <NavLink
                to="/sobre-nosotros"
                className={navStyles.iconButton}
            >
                <h6>SOBRE NOSOTROS</h6>
            </NavLink>

        </nav>
    )
}

export default NavigationFooter;