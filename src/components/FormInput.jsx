export default function FormInput({ label, type = "text", name, value, onChange, error, placeholder }) {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label fw-bold">{label}</label>
      <input
        type={type}
        className={`form-control ${error ? 'is-invalid' : ''}`}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {error && <div className="invalid-feedback d-block">{error}</div>}
    </div>
  );
}