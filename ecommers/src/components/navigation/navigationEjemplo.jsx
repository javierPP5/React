import { UserContext } from "../contexts/ContextUser";
import { useContext } from "react";
const Navigation = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <div>
      <h2>Panel de navegación</h2>
      {currentUser ? <span>logout</span> : <a>login</a>}
      {currentUser?.rol === "admin" && <span>panel admin</span>}
    </div>
  );
};

export default Navigation;