import navStyles from "./navigation.module.css";
import {Link, NavLink} from "react-router-dom";

function Navigation() {
    return (
        <nav>
            <ul className={navStyles["container-nav"]}>
                <li><NavLink to="/login" className={({isActive})=> (isActive ? isActive && navStyles.active: " ")}> Login </NavLink></li>
                <li><NavLink to="/registro" className={({isActive})=> (isActive ? isActive && navStyles.active: " ")}> Registro </NavLink></li>
                <li><NavLink to="/contacto" className={({isActive})=> (isActive ? isActive && navStyles.active: " ")}> Contacto </NavLink></li>
            </ul>
        </nav>
    )
}

export default Navigation