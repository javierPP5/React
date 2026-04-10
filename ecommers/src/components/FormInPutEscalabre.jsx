import style from "./FormInPutEscalabre.module.css";

const FormInput = ({ label, id, error, required = false, onChange, ...props }) => {
  return (
    <div className={style.inputContainer}>
      <input 
        id={id} 
        required={required} 
        placeholder=" " 
        onChange={onChange}
        {...props} 
      />
      <label htmlFor={id}>{label}</label>
      {error && <p className={style.error}>{error}</p>}
    </div>
  );
};

export default FormInput;
