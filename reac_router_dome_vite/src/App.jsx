import "./styles/stylesGlobales.css";
import "./styles/stylesReusables.css";
import Home from "./pages/Home";
import Pagina2 from "./pages/Pagina2";
import {Route, Routes} from "react-router-dom";
import Login from "./pages/login.jsx";
import Registo from "./pages/registro.jsx";
import Contacto from "./pages/contacto.jsx";
import BigLayout from "./pages/BigLayout.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import PrivateRoute from "./pages/protected/PrivateRoute.jsx";
import Dashboard from "./pages/Dashboard.jsx";

function App() {
  return (
  <div>
    <Routes>
      <Route path="/" element={<BigLayout />} >
        <Route index element={<Home />} />
        <Route path="pagina2" element={<Pagina2 />} />
        <Route path="login" element={<Login />} />
        <Route path="contacto" element={<Contacto />} />
        <Route path="registro" element={<Registo />} />
        <Route path="home/:productId" element={<ProductDetail />} />
        <Route path="dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      </Route>
    </Routes>
  </div>
  )
}

export default App
