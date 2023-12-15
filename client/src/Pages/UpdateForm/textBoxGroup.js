

import React, { useState, useEffect } from "react";
import homestyles from "./Home.module.css";
import { TextInputRow } from "./RadioGroup";

export function TextBoxGroup({ textBoxOptions, onInputChange, questionId, initialValue }) {
  const [inputValues, setInputValues] = useState({});
  useEffect(() => {
    console.log("initial value recieved in input file:", initialValue);
  }, [initialValue]);

  const handleInputChange = (e, score) => {
    const { name, value } = e.target;
    console.log(`User entered value for ${name}: ${value}`);
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
      if(textbox._id){
      initialValues[textbox._id] = initialValue?.answerOptions?.filter(a => a?._id == textbox._id)?.[0]?.title || "";
      }
    });
    // if(textBoxOptions.filter(t=> t._id == "6535023462aed352d3e66ea8")?.length > 0){
    //   console.log("textbox123", initialValues, initialValue, initialValue?.answerOptions?.filter(a => a?._id == "6535023462aed352d3e66ea8"))
    //     }
    setInputValues(initialValues);
  }, [initialValue]);
  useEffect(() => {
    console.log("input value eupdated in input file:", inputValues);
  }, [inputValues]);
  
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

