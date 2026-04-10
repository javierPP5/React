import "./styles/stylesGlobales.css";
import "./styles/stylesReusables.css";
import { Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import BigLayout from "./pages/BigLayout.jsx";
import SobreNosotros from "./pages/sobre-nosotros.jsx";
import CatalogoCompleto from "./pages/CatalogoCompleto.jsx";
import Registro from "./pages/registro.jsx";
import Card from "./pages/Card.jsx"
import Admin from "./pages/Admin.jsx";
import AdminUsers from "./pages/AdminUsers.jsx";
import AdminRoute from "./components/routes/PrivateRoutes.jsx";
import PerfilUsuario from "./components/perfilUsuarios.jsx";




function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<BigLayout />} >
          <Route index element={<Home />} />

          {/* RUTAS PROTEGIDAS */}
          <Route
            path="Admin"
            element={
              <AdminRoute>
                <Admin />
              </AdminRoute>
            }
          />

          <Route
            path="AdminUsers"
            element={
              <AdminRoute>
                <AdminUsers />
              </AdminRoute>
            }
          />

          {/* RUTAS NORMALES */}
          <Route path="login" element={<Login />} />
          <Route path="sobre-nosotros" element={<SobreNosotros />} />
          <Route path="CatalogoCompleto" element={<CatalogoCompleto />} />
          <Route path="registro" element={<Registro />} />
          <Route path="PerfilUsuarios" element={<PerfilUsuario />} />
          <Route path="/planta/:id" element={<Card />} />
          <Route path='*' element={<Navigate to='/login' replace />} />
        </Route>

      </Routes>
    </>
  )
}

export default App
