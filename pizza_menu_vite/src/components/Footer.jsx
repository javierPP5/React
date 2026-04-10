import Order from "./Order";

const Footer = () => {
    const openHours = "10"  
    const closeHours = "19"
    const currentHours = new Date().getHours();
    const isOpen = currentHours >= openHours && currentHours <= closeHours;

    return (
    <footer className="footer">
        <div>
            <p>Soy el footer:</p>
            {isOpen && (<Order closeHours={closeHours} openHours={openHours}/>)}
        </div>
    </footer>
    ); 
};

export default Footer;