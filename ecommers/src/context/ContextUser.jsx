import { createContext, useState, useEffect } from "react";
import { onAuthStateChangedListener, getUser } from "../data/firebase";

const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
  loading: true,
});

function UserContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(async (user) => {
      try {
        if (user) {
          const userData = await getUser(user.uid);
          setCurrentUser({ uid: user.uid, ...userData });
        }
        else {
          setCurrentUser(null);
        }
      } catch (error) {
        console.error("Error al obtener datos del usuario:", error);
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const compartir = {
    currentUser,
    setCurrentUser,
    loading,
  };

  return (
    <UserContext.Provider value={compartir}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserContextProvider };
