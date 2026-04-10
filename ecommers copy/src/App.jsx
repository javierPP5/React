import "./styles/stylesGlobales.css";
import "./styles/stylesReusables.css";
import {Route, Routes} from "react-router-dom";
import Login from "./pages/Login.jsx";
import Carrito from "./pages/carrito.jsx";
import Home from "./pages/Home.jsx";
import BigLayout from "./pages/BigLayout.jsx";
import SobreNosotros from "./pages/sobre-nosotros.jsx";
import CatalogoCompleto from "./pages/CatalogoCompleto.jsx";


function App() {
  return (
 
    <Routes>
      <Route path="/" element={<BigLayout />} >
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="carrito" element={<Carrito />} />
        <Route path="sobre-nosotros" element={<SobreNosotros />} />
        <Route path="CatalogoCompleto" element={<CatalogoCompleto />} />
      </Route>
    </Routes>
  
  )
}

export default App
