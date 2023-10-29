
import React, { useState, useEffect } from "react";
import homestyles from "./Home.module.css";
import { RadioGroup } from "./RadioGroup";

export function RadioButtonGroup({ radioButtonOptions, selectedValue, onRadioButtonChange, onInputDetailChange, questionId }) {
  const [selected, setSelected] = useState({});
  const [typeCollapsed, setTypeCollapsed] = useState(false);
  //start of status and type
  const handleTypeChange = (value, score) => {
    setSelected(value, score);
    setTypeCollapsed(true);
    onRadioButtonChange(questionId, value, score);
  };
  return (
    <div className={homestyles["form-checkboxes"]}>
      {typeCollapsed ? (
        <div className={homestyles["form-selected-item"]}>
          <p style={{ fontWeight: 'normal' }} className={homestyles["selected-type"]}>{selected?.title}</p>
          <button
            className={homestyles["change-button"]}
            onClick={() => setTypeCollapsed(false)}
          >
            Change
          </button>
        </div>
      ) : (
        <RadioGroup
          options={radioButtonOptions?.map((r) => ({
            title: r.title,
            value: r._id,
            id: r._id,
            name: r._id,
            score: r.score,
          }))}
          selectedValue={selectedValue}
          onChange={handleTypeChange}
        />
      )}
    </div>
  );
}
