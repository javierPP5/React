import Header from "./components/Header";
import Footer from "./components/Footer";
import Menu from "./components/Menu";

const App = () => {
  /* movida js */
  const titulo = "hola mundo";
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
};

export default App; 
