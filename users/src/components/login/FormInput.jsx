function FormInput({
  label,
  name,
  type,
  defaultValue,
  size,
  value,
  onChange,
  error,
}) {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label text-capitalize">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        defaultValue={defaultValue}
        id={name}
        className={`form-control ${size} ${error ? "is-invalid" : ""}`}
      />
      {/* Hiển thị lỗi nếu có */}
      {error && <div className="invalid-feedback">{error}</div>}{" "}
    </div>
  );
}

export default FormInput;
