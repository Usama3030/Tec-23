import React, { useState, useEffect } from "react";

export function TextInputNo({ textBoxOptions, onInputChange, questionId }) {
  const [inputValues, setInputValues] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Validate that the entered value is between 0 and 10
    const intValue = parseInt(value, 10);
    if (!isNaN(intValue) && intValue >= 0 && intValue <= 20) {
      const answerOption = {
        title: value,
        _id: name,
      };
      setInputValues((prevInputValues) => ({
        ...prevInputValues,
        [name]: value,
      }));

      onInputChange(questionId, answerOption);
    }
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
    <div className="form-container">
      {textBoxOptions?.map((textbox) => (
        <div className="mb-4 form-group" key={textbox._id}>
          <div className="input-group">
            <input
              type="number"
              displayOptions={textbox.displayOptions}
              name={textbox._id}
              id={textbox._id}
              value={inputValues[textbox._id] || ""}
              onChange={handleInputChange}
              className="form-input text-sm "
            />
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Select between 0 and 20
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
