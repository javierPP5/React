import clasesHeader from "./header.module.css";
import Navigation from "./navigation/Navigation.jsx";

function Header() {
    return (
        <header className={`${clasesHeader.header} ${clasesHeader["background-header"]}`}>
            <span>logo</span>
        <Navigation />
        </header>
    )
}

export default Header