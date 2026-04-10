import { useContext, useState } from "react";
import { UserContext } from "../context/ContextUser";
import { auth, db, getUser } from "../data/firebase";
import { updateDoc, doc, deleteDoc } from "firebase/firestore";
import { deleteUser } from "firebase/auth";
import css from "./perfilUsuarios.module.css"
import { EmailAuthProvider, reauthenticateWithCredential} from "firebase/auth";
import { updateProfile } from "firebase/auth";


function PerfilUsuario() {
  const { currentUser, loading, setCurrentUser } = useContext(UserContext);

const [displayName, setDisplayName] = useState(currentUser?.displayName ?? "");

  const [guardando, setGuardando] = useState(false);
  const [eliminando, setEliminando] = useState(false);

  if (loading) return <p>Cargando...</p>;
  if (!currentUser) return <p>Debes iniciar sesión.</p>;

const handleUpdate = async () => {
  setGuardando(true);

  try {
    const user = auth.currentUser;

    if (!displayName || typeof displayName !== "string") {
      alert("El nombre no es válido.");
      return;
    }

    // 1) Actualizar nombre en Auth
    await updateProfile(user, { displayName });

    // 2) Actualizar Firestore
    const userDocRef = doc(db, "users", user.uid);
    await updateDoc(userDocRef, { displayName });

    // 3) Volver a cargar datos desde Firestore (tu fuente principal)
    const updatedData = await getUser(user.uid);

    // 4) Actualizar Context EXACTO al formato usado
    setCurrentUser({ uid: user.uid, ...updatedData });

    alert("Nombre actualizado correctamente");

  } catch (error) {
    console.error("Error actualizando:", error);
    alert("Error: " + error.message);
  } finally {
    setGuardando(false);
  }
};




const handleDeleteAccount = async () => {
  const confirmacion = window.confirm(
    "¿Seguro que quieres eliminar tu cuenta? Esta acción es permanente."
  );
  if (!confirmacion) return;

  setEliminando(true);

  try {
    const user = auth.currentUser;

    // Pedir contraseña antes de borrar
    const password = prompt("Por seguridad, ingresa tu contraseña:");

    const credential = EmailAuthProvider.credential(
      user.email,
      password
    );

    // 1) Reautenticar
    await reauthenticateWithCredential(user, credential);

    // 2) Borrar datos de Firestore
    await deleteDoc(doc(db, "users", user.uid));
    await deleteDoc(doc(db, "users", user.uid, "data", "cart"));

    // 3) Borrar cuenta Auth
    await deleteUser(user);

    setCurrentUser(null);
    alert("Cuenta eliminada correctamente.");
  } catch (error) {
    console.error("Error eliminando cuenta:", error);
    alert("Error: " + error.message);
  } finally {
    setEliminando(false);
  }
};

  return (
    <main className={css.main}>
    <div className={css.contenedor}>
      <h2>Mi Perfil</h2>
    <div>
      <label>Nombre:</label>
      <input
        type="text"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        className={css.colorInput}
      />
    </div>

    <div className={css.botones}>
      <button className={css.botonConfirmar} onClick={handleUpdate} disabled={guardando}>
        {guardando ? "Guardando..." : "Actualizar nombre"}
      </button>

      <button
        className={css.botonEliminar}
        onClick={handleDeleteAccount}
        disabled={eliminando}
      >
        {eliminando ? "Eliminando..." : "Eliminar cuenta"}
      </button>
      </div>
    </div>
    </main>
  );
}

export default PerfilUsuario;
