import clasesFooter from "./footer.module.css";
import socialLinks from "./socialLinks/SocialLinks.jsx";

function Footer() {
    return (
        <footer className={`${clasesFooter.footer} ${clasesFooter["color-fondo"]}`}>
            <span>logo</span>
            <span>movidas</span>
            <socialLinks />
        </footer>
    )
}

export default Footer