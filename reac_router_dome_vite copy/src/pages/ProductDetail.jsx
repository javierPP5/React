import {useParams} from "react-router-dom";

function ProductDetail() {
    const {productId} = useParams();
    return (
        <div>
            <h2>Detalle del Producto {productId}</h2>
        </div>
    );
}

export default ProductDetail;