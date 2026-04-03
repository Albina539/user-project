const InputField = ({ label, type, placeholder, name, required = false }) => {
  return (
    <div className="inputField">
      <label>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        required={required}
      />
    </div>
  );
};

export default InputField;
