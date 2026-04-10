import React, { useEffect, useState } from "react";
import css from "./CRUDusers.module.css";
import { db } from "../data/firebase";
import {
    collection,
    getDocs,
    doc,
    updateDoc,
    deleteDoc
} from "firebase/firestore";


const UserAdmin = () => {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [editValues, setEditValues] = useState({ 
        displayName: "", 
        email: "",
        rol: "" 
    });
    

    // Obtener usuarios de Firestore
    const fetchUsers = async () => {
        const usersRef = collection(db, "users");
        const snapshot = await getDocs(usersRef);

        const usersList = snapshot.docs.map((d) => ({
            id: d.id,
            ...d.data(),
        }));

        setUsers(usersList);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // Manejar edición
    const handleEdit = (user) => {
        setEditingUser(user.id);
        setEditValues({
            displayName: user.displayName || "",
            email: user.email || "",
            rol: user.rol || "user", 
        });
    };

    const handleSave = async () => {
        const docRef = doc(db, "users", editingUser);

        await updateDoc(docRef, {
            ...editValues,
        });

        setEditingUser(null);
        fetchUsers();
    };

    const handleDelete = async (id) => {
        const docRef = doc(db, "users", id);
        await deleteDoc(docRef);
        fetchUsers();
    };

    return (
        <main className={css.main}>
            <div>
                <h2>Administrar Usuarios</h2>

                {users.length === 0 ? (
                    <p>No hay usuarios registrados.</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Email</th>
                                <th>Rol</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>

                                    {/* Nombre */}
                                    <td>
                                        {editingUser === user.id ? (
                                            <input
                                                className={css.colorInput}
                                                type="text"
                                                value={editValues.displayName}
                                                onChange={(e) =>
                                                    setEditValues({ ...editValues, displayName: e.target.value })
                                                }
                                            />
                                        ) : (
                                            user.displayName
                                        )}
                                    </td>

                                    {/* Email */}
                                    <td>
                                        {editingUser === user.id ? (
                                            <input
                                                className={css.colorInput}
                                                type="text"
                                                value={editValues.email}
                                                onChange={(e) =>
                                                    setEditValues({ ...editValues, email: e.target.value })
                                                }
                                            />
                                        ) : (
                                            user.email
                                        )}
                                    </td>

                                    {/* Rol */}
                                    <td>
                                        {editingUser === user.id ? (
                                            <select
                                                className={css.colorInput}
                                                value={editValues.rol}
                                                onChange={(e) =>
                                                    setEditValues({ ...editValues, rol: e.target.value })
                                                }
                                            >
                                                <option value="user">Usuario</option>
                                                <option value="admin">Administrador</option>
                                            </select>
                                        ) : (
                                            user.rol || "user"
                                        )}
                                    </td>

                                    {/* Acciones */}
                                    <td>
                                        {editingUser === user.id ? (
                                            <>
                                                <button onClick={handleSave} className={css.btnEditar}>Guardar</button>
                                                <button onClick={() => setEditingUser(null)} className={css.btnCancelar}>Cancelar</button>
                                            </>
                                        ) : (
                                            <>
                                                <button onClick={() => handleEdit(user)} className={css.btnEditar}>Editar</button>
                                                <button onClick={() => handleDelete(user.id)} className={css.btnEliminar}>
                                                    Eliminar
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </main>
    );
};

export default UserAdmin;
