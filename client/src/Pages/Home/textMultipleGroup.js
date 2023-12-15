import React, { useState } from "react";

import { MultipleInputs } from "./RadioGroup";

export function MultipleInputsGroup({
  textBoxOptions,
  onInputChange,
  questionId,
  answerOptionsId,
}) {
  const [inputValues, setInputValues] = useState({});

  const handleInputChange = (e, rowIndex) => {
    const title = e.target?.name || "defaultTitle";
    const value = e.target?.value || "defaultValue";
    console.log(title, value);
    // console.log(e.target);

    // Create a copy of the current state
    const updatedInputValues = { ...inputValues };

    // Initialize or create a new entry if necessary
    updatedInputValues[questionId] = updatedInputValues[questionId] || [];
    updatedInputValues[questionId][rowIndex] =
      updatedInputValues[questionId][rowIndex] || {};

    // Add the value to the values array
    updatedInputValues[questionId][rowIndex][title] = value;

    // Update the state with the new values
    setInputValues(updatedInputValues);

    // Send the updated values to the parent component
    onInputChange(questionId, updatedInputValues);

    // Console the user-entered value
    console.log(`User entered value: ${value}`);
  };

  return (
    <div className="grid grid-cols-1 gap-4 w-full ">
      {textBoxOptions?.map((row, rowIndex) => (
        <div key={row.title} className="mb-2">
          <MultipleInputs
            displayOptions={row.displayOptions}
            rowOptions={row}
            value={
              (inputValues[questionId] &&
                inputValues[questionId][rowIndex] &&
                inputValues[questionId][rowIndex][row.title]) ||
              ""
            }
            onChange={(e) => handleInputChange(e, rowIndex)}
            multiple={true}
          />
        </div>
      ))}
    </div>
  );
}
