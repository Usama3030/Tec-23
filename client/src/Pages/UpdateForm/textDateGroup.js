import React, { useState, useEffect } from "react";
import homeStyles from "./Home.module.css";
import { TextInputDMY } from "./RadioGroup";

export function TextInputDate({ textBoxOptions, onInputChange, questionId, initialValue }) {
  const [inputValues, setInputValues] = useState({});

   const handleInputChange = (e) => {
    const { name, value } = e.target;
    const answerOption = {
      title: value,
      _id: name,
    };
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [name]: value,
    }));

    // Pass the input value up to the parent component (Home)
    onInputChange(questionId, answerOption);
  };

  useEffect(() => {
    // Initialize input values based on textBoxOptions
    const initialValues = {};
    textBoxOptions?.forEach((textbox) => {
      if(textbox._id){
      initialValues[textbox._id] = initialValue?.answerOptions?.filter(a => a?._id == textbox._id)?.[0]?.title || "";
      }
    });
    setInputValues(initialValues);
  }, [initialValue]);

  return (
    <div className={homeStyles["input-container"]}>
      {textBoxOptions?.map((textbox) => (
        <div className={homeStyles["input-row"]} key={textbox._id}>
          <TextInputDMY
            displayOptions={textbox.displayOptions}
            label={textbox.title}
            name={textbox._id}
            id={textbox._id}
            value={inputValues[textbox._id] || ""}
            onChange={handleInputChange}
            placeholder={textbox.title}
          />
        </div>
      ))}
    </div>
  );
}
