import { useState, useContext } from "react";
import { signInWithGooglePopup, createUserDocumentFromAuth, signOutUser, signInAuthUserWithEmailAndPassword } from "../data/firebase";
import { validation } from "../data/validationForm";
import { useDebouncedCallback } from "use-debounce";
import FormInput from "./FormInPutEscalabre";
import { UserContext } from "../context/ContextUser";
import { Link } from "react-router-dom";
import styles from './SignInForm.module.css'
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';


function SignInForm() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [passwd, setPasswd] = useState("");
    const [errorEmail, setErrorEmail] = useState(null);
    const [errorPasswd, setErrorPasswd] = useState(null);

    const { setCurrentUser } = useContext(UserContext);

    const debounceEmail = useDebouncedCallback((currentEmail) => {
        if (!validation.isValidEmail(currentEmail)) {
            setErrorEmail("email incorrecto");
        } else {
            setErrorEmail(null);
        }
    }, 3000);

    const handleEmail = (event) => {
        const currentEmail = event.target.value;
        setEmail(currentEmail);
        debounceEmail(currentEmail);
    };

    const debouncePasswd = useDebouncedCallback((currentPasswd) => {
        if (!validation.isValidPassword(currentPasswd)) {
            setErrorPasswd("contraseña incorrecta");
        } else {
            setErrorPasswd(null);
        }
    }, 3000);

    const handlePasswd = (event) => {
        const currentPasswd = event.target.value;
        setPasswd(currentPasswd);
        debouncePasswd(currentPasswd);
    };

    const handleGoogle = async () => {
        try {
            const responseAuth = await signInWithGooglePopup();
            console.log("Respuesta auth"), responseAuth;

            const responseDatabase = await createUserDocumentFromAuth(responseAuth.user, { rol: "admin" })
            console.log("Respuesta database"), responseDatabase;
            toast.success("🎉 Inicio sesion exitoso!", {
                autoClose: 1000,
                onClose: () => navigate("/"),
            });
        } catch (exception) {
            console.error("error", exception);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log(email)
            console.log(passwd)
            const response = await signInAuthUserWithEmailAndPassword(email, passwd);
            console.log(response);
            setCurrentUser(response);
            toast.success("🎉 Inicio sesion exitoso!", {
                autoClose: 1000,
                onClose: () => navigate("/"),
            });
        } catch (error) {
            console.log("error", error);
        }
    };



    return (
        <>
            <div className={styles.divTitulo}>
                <h2>INICIO DE SESION</h2>
            </div>
            <form onSubmit={handleSubmit}>

                <FormInput
                    label="Email"
                    id="email"
                    type="email"
                    value={email}
                    onChange={handleEmail}
                    error={errorEmail}
                    required
                />

                <FormInput
                    label="Password"
                    id="passwd"
                    type="password"
                    value={passwd}
                    onChange={handlePasswd}
                    error={errorPasswd}
                    required
                />

                <div className={styles.divBotones}>
                    <button type="submit" className={styles.Botones}>Login con usuario y passwd</button>

                    <Link to="/registro" className={styles.Botones}>
                        Registrarse
                    </Link>
                    <button type="button" onClick={handleGoogle} className={styles.Botones}>
                        iniciar google
                    </button>
                </div>
            </form>

            <ToastContainer autoClose={1000} />
        </>
    );
}

export default SignInForm;