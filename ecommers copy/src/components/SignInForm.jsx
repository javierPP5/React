import { useState } from "react";
import { signInWithGooglePopup, createUserDocumentFromAuth } from "../data/firebase";
import { validation } from "../data/validationForm";
import { useDebouncedCallback } from "use-debounce";
import FormInput from "./FormInPutEscalabre";

function SignInForm() {
    const [email, setEmail] = useState(undefined);
    const [passwd, setPasswd] = useState(undefined);
    const [errorEmail, setErrorEmail] = useState(null);
    const [errorPasswd, setErrorPasswd] = useState(null);


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
        } catch (exception) {
            console.error("movida error", exception);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    return (

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

            <div>
                <button type="submit">Login con usuario y passwd</button>
                <button type="button" onClick={handleGoogle}>
                    Login con Google
                </button>
            </div>
        </form>
    );
}

export default SignInForm;