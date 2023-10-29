

import React, { useState, useEffect } from "react";
import homestyles from "./Home.module.css";
import { TextInputRow } from "./RadioGroup";

export function TextBoxGroup({ textBoxOptions, onInputChange, questionId }) {
  const [inputValues, setInputValues] = useState({});

  const handleInputChange = (e, score) => {
    const { name, value } = e.target;
    const answerOption = {
      title: value,
      _id: name,
      score: score,
    };
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [name]: value,
    }));

    onInputChange(questionId, answerOption);
  };

  useEffect(() => {
    // Initialize input values based on textBoxOptions
    const initialValues = {};
    textBoxOptions?.forEach((textbox) => {
      initialValues[textbox._id] = inputValues[textbox._id] || "";
    });
    setInputValues(initialValues);
  }, [textBoxOptions]);

  return (
    <div className={homestyles["textInput-container"]}>
      {textBoxOptions?.map((textbox) => (
        <div className={homestyles["input-row"]} key={textbox._id}>
          <TextInputRow
            displayOptions={textbox.displayOptions}
            label={textbox.title}
            name={textbox._id}
            id={textbox._id}
            // score={textbox.score || 0}
            value={inputValues[textbox._id] || ""}
            onChange={(e)=>{handleInputChange(e, textbox.score)}}
            placeholder={textbox.title}
          />
        </div>
      ))}
    </div>
  );
}

