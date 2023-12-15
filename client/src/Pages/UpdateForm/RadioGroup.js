
import React, { useState, useEffect } from "react";
import homestyles from "./Home.module.css";
import homeStyles from "./Home.module.css";

export function RadioGroup({ options, selectedValue, onChange, selectedItem }) {
  return (
    <div className={homestyles["form-checkboxes"]}>
      {options.map((option) => (
        <div key={option.id} className={homestyles["form-input"]}>
          <label>
            <input
              type="radio"
              name={option.name}
              id={option.id}
              value={option.value}
              checked={selectedValue === option.value}
              onChange={() => onChange(option)}
            />
            <span style={{ fontWeight: 'normal' }}>{option.title}</span>
          </label>
        </div>
      ))}
      {selectedItem && (
        <div className={homestyles["form-selected-item"]}>
          <p className={homestyles["selected-type"]} style={{ fontWeight: 'normal' }}>
            Selected: {selectedItem}
          </p>
          <button
            className={homestyles["change-button"]}
            onClick={() => onChange(null)}
          >
            Change
          </button>
        </div>
      )}
    </div>
  );
}

export function TextInputRow({
  label,
  name,
  id,
  value,
  score,
  onChange,
  placeholder,
  displayOptions,
}) {
  return (
    <div className="TextInputRow">
      {/* {displayOptions?.showTitle !== false && (
         <label htmlFor={id}>{label}:</label>
      )} */}
      <input
        type="text"
        name={name}
        id={id}
        value={value}
        // score={score}
        onChange={onChange}
        placeholder={placeholder}
        className={homestyles["input-field"]}
      />
    </div>
  );
}

export function TextInputDMY({ label, name, id, value, onChange, placeholder, displayOptions }) {
  return (
    <div className="TextInputDate">
      {/* {displayOptions?.showTitle !== false &&(
        <label htmlFor={id}>{label}:</label>
      )} */}
      <input
        type="date"
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        className={homestyles["input-field"]}
      />
    </div>
  );
}

export function TextInputNumber({ label, name, id, value, onChange, placeholder, displayOptions }) {
  return (
    <div className="TextInputNumber">
      {/* {displayOptions?.showTitle !== false &&(
        <label htmlFor={id}>{label}:</label>
      )} */}
      <input
        type="number"
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        className={homestyles["input-field"]}
      />
    </div>
  );
}


export function AddTable({ label, name, id, value, onChange, placeholder, displayOptions, rowOptions }) {

  return (
    <div>
      {rowOptions.map((row, index) => (
        <div key={index}>
          <input
            type="text"
            name={row.title}
            id={row.title}
            value={row.value}
            onChange={(event) => onChange(event, index)}
            placeholder={row.title}
          />
        </div>
      ))}
    </div>
  );
}


export function MultipleInputs({ label, name, id, value, onChange, placeholder, displayOptions, rowOptions }) {

  return (
    <div className="TextInputMultiple">
      {rowOptions.map((row, index) => (
        <div key={index}>
           {/* {displayOptions?.showTitle !== false && (
         <label htmlFor={id}>{label}:</label>
      )} */}
          <input
            type="text"
            name={row.title}
            id={row.title}
            value={row.value}
            onChange={(event) => onChange(event, index)}
            placeholder={row.title}
          />
        </div>
      ))}
    </div>
  );
}
