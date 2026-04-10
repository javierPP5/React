const Order = ({openHours, closeHours}) => {
    return(<div className="order">
        <p>Estamos abiertos desde las {openHours} hasta las {closeHours}</p>
        <button className="btn">Comprar</button>
    </div>)
    
}

export default Order;