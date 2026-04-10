# PROBAR ESTOS PRIMERO, SI FUNCIONA EL CARRUSEL CON ESTO, OLVIDA EL RESTO
npm i react-alice-carousel
npm install -D sass-embedded
npm i react-toastify

# REACT

1. Login con Controlled Form (useState)

2. Login con Uncontrolled form (useRef)

3. Agrupar los estados en un estado objeto => entender que los estados no pueden mutar, siempre se crea una copia del mismo con el spread operator

   ```jsx
   setError((prev) => ({
     ...prev,
     email: "error email",
   }));
   ```

**El estado en React es inmutable, nunca se puede modificar, se crean copias del mismo**

4. Reusabilidad y escalabilidad: formInput

   ```jsx
   // Ejemplo de uso del componente FormInput
   <FormInput
     label="Email"
     id="email"
     type="email"
     value={email}
     onChange={handleEmail}
     error={errorEmail}
     required
   />;

   /*
   ({ label, id, error, required = false, ...props })  => "meter en la mochila": guarda en un objeto todas las props que sobran
   
   <input id={id} required={required} {...props} /> => "sacar de la mochila": expande el objeto en atributos individuales dentro del JSX
   */

   const FormInput = ({ label, id, error, required = false, ...props }) => {
     return (
       <div>
         <label htmlFor={id}>{label}</label>
         <input id={id} required={required} {...props} />
         {error && <p className="error">{error}</p>}
       </div>
     );
   };
   ```

**En los props el spread operator actua como un mecanismo de meter y sacar de la mochila**
**En los estados el spread operator, ya no mete ni saca de la mochila, clona la mochila anterior (el estado viejo) y creo uno nuevo**

5. Libreria useDebounce: tiempo de inactividad
6. Asincronia de los estados

   ```jsx
   const handlePasswd = (event) => {
     const currentPasswd = event.target.value;
     setPasswd(currentPasswd);
     debouncePasswd(currentPasswd);
     //debouncePasswd(passwd);
   };
   ```

**Los estados en React se actualizan de forma asíncrona, React programa el cambio de estado para el próximo render**

Entonces otra opción sería con useEffect

```jsx
const handlePasswd = (event) => {
  const currentPasswd = event.target.value;
  setPasswd(currentPasswd);
  //debouncePasswd(currentPasswd);
  //debouncePasswd(passwd);
};

useEffect(() => {
  debouncePasswd(passwd);
}, [passwd]);
```

---

# [FIREBASE](./3.Firebase.md)

# FILOSOFANDO CON LA IA SOBRE LA VIDA Y REACT

1. [controlled form versus Uncontrolled form](./2.ControlledUncontrolledForm.md)