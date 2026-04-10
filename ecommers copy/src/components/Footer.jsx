import clasesFooter from "./footer.module.css";
import NavigationFooter from "./navigation/NavigationFooter";
import logoDeLaTierra from "/logo3.jpg";

function Footer() {
    return (
        <footer className={`${clasesFooter.footer} ${clasesFooter["color-fondo"]}`}>
            <div className={clasesFooter.logoContainer}>
                <img src={logoDeLaTierra} alt="Logo" className={clasesFooter.logo} />
            </div>
            <NavigationFooter />
        </footer>
    )
}

export default Footer