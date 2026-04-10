const FormInput = ({ label, id, error, required = false, ...props }) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} required={required} {...props} />
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default FormInput;