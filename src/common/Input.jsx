import React from "react";

const Input = ({ state, setState, error, label, InputId }) => {
  return (
    <div className="mb-3">
      <label htmlFor={InputId} className="form-label">
        {label}
      </label>
      <input
        type="text"
        className="form-control"
        id={InputId}
        value={state}
        onChange={(e) => setState(e.target.value)}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
