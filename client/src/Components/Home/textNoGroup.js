// import React, { useState, useEffect } from "react";
// import homeStyles from "./Home.module.css";
// import { TextInputNumber } from "./RadioGroup";

// export function TextInputNo({ textBoxOptions, onInputChange }){
//     const [inputValues, setInputValues] = useState({});
//     const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setInputValues((prevInputValues) => ({
//       ...prevInputValues,
//       [name]: value,
//     }));

//     // Pass the input value up to the parent component (Home)
//     onInputChange(name, value);
//   };
//     return(
//         <div className={homeStyles["input-container"]}>
//             {textBoxOptions?.map((textbox) =>(
//                 <div className={homeStyles["input-row"]}>
//                    <TextInputNumber
//                    displayOptions={textbox.displayOptions}
//                    label={textbox.title}
//                    name={textbox._id}
//                    id={textbox._id}
//                    value={inputValues[textbox._id] || ''} // Set the value from state
//                 onChange={handleInputChange}
//                    placeholder={textbox.title}
//                    />
//                  </div>
//             ))}
//         </div>
//     )
// }

import React, { useState, useEffect } from "react";
import homeStyles from "./Home.module.css";
import { TextInputNumber } from "./RadioGroup";

export function TextInputNo({ textBoxOptions, onInputChange, questionId }) {
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
    <div className={homeStyles["input-container"]}>
      {textBoxOptions?.map((textbox) => (
        <div className={homeStyles["input-row"]}>
          <TextInputNumber
            displayOptions={textbox.displayOptions}
            label={textbox.title}
            name={textbox._id}
            id={textbox._id}
            value={inputValues[textbox._id] || ""} // Set the value from state
            onChange={handleInputChange}
            placeholder={textbox.title}
          />
        </div>
      ))}
    </div>
  );
}
