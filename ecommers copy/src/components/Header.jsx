import clasesHeader from "./header.module.css";
import Navigation from "./navigation/Navigation.jsx";
import logoDeLaTierra from "/logo3.jpg";
import { Link } from "react-router-dom"; // Asegúrate de que esto esté importado

function Header() {
  return (
    <header
      className={`${clasesHeader.header} ${clasesHeader["background-header"]}`}
    >
      
      <div className={clasesHeader.logoContainer}>
        
        
        <Link to="/">
          <img
            src={logoDeLaTierra}
            alt="Logo"
            className={clasesHeader.logo}
          />
        </Link>
       
       <Link to="/" className={clasesHeader.enlace}>
        <h1 className={clasesHeader.title}>LA HIERBA FELIZ</h1>
        </Link>
      </div>

      <Navigation />
    </header>
  );
}

export default Header;