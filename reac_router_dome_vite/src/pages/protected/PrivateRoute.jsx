import {Navigate} from "react-router-dom";

const PrivateRoute = ({children}) => {

    const isauth = true;
    if(!isauth) {
        return <Navigate to="/login" />
    }

    return children;
}

export default PrivateRoute;