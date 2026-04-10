import Pizza from "./Pizza";
import pizzaData from "../data/data.js";

const Menu = () => {
    return (<div className="menu">
        <h2>Menu Pizza</h2>
        <div className="pizzas">
            {pizzaData.map((pizza) => (
                <Pizza pizza={pizza} />
            ))}

        </div>
    </div>)
}

export default Menu;