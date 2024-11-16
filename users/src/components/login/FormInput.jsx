function FormInput({ label, name, type, defaultValue, size }) {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label text-capitalize">
        {label}
      </label>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        id={name}
        className={`form-control ${size}`}
      />
    </div>
  );
}

export default FormInput;
