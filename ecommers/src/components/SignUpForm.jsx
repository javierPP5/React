import { useState, useRef } from "react";
import {
  createUserDocumentFromAuth,
  createAuthUserWithEmailAndPassword,
} from "../data/firebase";
import { validation } from "../data/validationForm";
import { useDebouncedCallback } from "use-debounce";
import FormInput from "./FormInPutEscalabre";
import styles from "./SignUpForm.module.css"
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

function SignUpForm() {
  const navigate = useNavigate()
  const emailRef = useRef(null);
  const displayNameRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const [serverError, setServerError] = useState(null);

  const [errors, setErrors] = useState({
    email: null,
    password: null,
    displayName: null,
  });

  const debounceEmail = useDebouncedCallback(() => {
    setErrors((prev) => ({
      ...prev,
      email: validation.isValidEmail(emailRef.current.value)
        ? null
        : "Email incorrecto",
    }));
  }, 3000);

  const debouncePasswd = useDebouncedCallback(() => {
    setErrors((prev) => ({
      ...prev,
      password: validation.isValidPassword(passwordRef.current.value)
        ? null
        : "Contraseña incorrecta",
    }));
  }, 3000);

  const handleSignUp = async (event) => {
    event.preventDefault();
    if (serverError) setServerError(null);

    const name = displayNameRef.current.value.trim();
    if (!name) {
      setErrors((prev) => ({
        ...prev,
        displayName: "Nombre no puede estar vacío",
      }));
      return;
    }

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      setErrors((prev) => ({
        ...prev,
        password: "Las contraseñas no coinciden",
      }));
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(

        emailRef.current.value,
        passwordRef.current.value

      );


      await createUserDocumentFromAuth(user, {
        displayName: displayNameRef.current.value,
        rol: "user",
      });

      console.log("User created:", user);

      toast.success("🎉 Registro exitoso!", {
        autoClose: 2000,
        onClose: () => navigate("/login"),
      });
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setServerError("El email ya está registrado");
      } else if (error.code === "auth/weak-password") {
        setServerError("La contraseña es demasiado débil");
      } else {
        setServerError("Error inesperado al registrar usuario");
        console.error(error);
      }
    }


  };

  return (
    <>
      <div className={styles.divTitulo}><h2>Registro</h2></div>
      {serverError && <p className="error">{serverError}</p>}
      <form onSubmit={handleSignUp}>
        <FormInput
          label="Email"
          idd="email"
          type="email"
          ref={emailRef}
          onChange={debounceEmail}
          error={errors.email}
          required
        />

        <FormInput
          label="Display Name"
          idd="displayName"
          type="text"
          ref={displayNameRef}
          error={errors.displayName}
          required
        />

        <FormInput
          label="Password"
          idd="password"
          type="password"
          ref={passwordRef}
          onChange={debouncePasswd}
          error={errors.password}
          required
        />

        <FormInput
          label="Confirm Password"
          idd="confirmPassword"
          type="password"
          ref={confirmPasswordRef}
          required
        />

        <div>
          <button type="submit" className={styles.botones} >Registro</button>
        </div>
      </form>

      <ToastContainer autoClose={3000} />
    </>
  );
}

export default SignUpForm;
