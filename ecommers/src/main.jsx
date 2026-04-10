import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { UserContextProvider } from "./context/ContextUser.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UserContextProvider >
        <CartProvider>
        <App />
      </CartProvider>
    </UserContextProvider>
  </BrowserRouter>
  </StrictMode >
);
