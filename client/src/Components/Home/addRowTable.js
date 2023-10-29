
// import React, { useState } from "react";
// import homestyles from "./Home.module.css";
// import { AddTable } from "./RadioGroup";

// export function AddRemoteTable({ textBoxOptions, onInputChange, questionId, answerOptionsId }) {
//   const [inputValues, setInputValues] = useState({});

//   const handleInputChange = (e, rowIndex) => {
//     const title = e.target?.name || "defaultTitle";
//     const value = e.target?.value || "defaultValue";
//     console.log(title, value);
//    // console.log(e.target);

//     // Create a copy of the current state
//     const updatedInputValues = { ...inputValues };

//     // Initialize or create a new entry if necessary
//     updatedInputValues[questionId] = updatedInputValues[questionId] || [];
//     updatedInputValues[questionId][rowIndex] = updatedInputValues[questionId][rowIndex] || {};

//     // Add the value to the values array
//     updatedInputValues[questionId][rowIndex][title] = value;

//     // Update the state with the new values
//     setInputValues(updatedInputValues);

//     // Send the updated values to the parent component
//     onInputChange(questionId, updatedInputValues);

//     // Console the user-entered value
//     console.log(`User entered value: ${value}`);
//   };

//   return (
//     <div className={homestyles['input-container']}>
//       {textBoxOptions?.map((row, rowIndex) => (
//         <div className={homestyles['input-row']} key={row.title}>
//           <AddTable
//             rowOptions={row}
//             title={row.title}
//             value={
//               (inputValues[questionId] &&
//                 inputValues[questionId][rowIndex] &&
//                 inputValues[questionId][rowIndex][row.title]) || ""
//             }
//             onChange={(e) => handleInputChange(e, rowIndex)}
//             multiple={true}
//           />
//         </div>
//       ))}
//     </div>
//   );
// }


import React, { useState } from "react";
import homestyles from "./Home.module.css";
import { AddTable } from "./RadioGroup";

export function AddRemoteTable({ textBoxOptions, onInputChange, questionId, answerOptionsId }) {
  const [inputValues, setInputValues] = useState([{}]);

  const handleInputChange = (e, rowIndex) => {
    const title = e.target?.name || "defaultTitle";
    const value = e.target?.value || "defaultValue";

    // Create a copy of the current state
    const updatedInputValues = [...inputValues];

    // Initialize or create a new entry if necessary
     updatedInputValues[rowIndex] = updatedInputValues[rowIndex] || {};
    // Initialize or create a new entry if necessary
    // updatedInputValues[questionId] = updatedInputValues[questionId] || [];
    // updatedInputValues[questionId][rowIndex] = updatedInputValues[questionId][rowIndex] || {};

    // Add the value to the values object
    updatedInputValues[rowIndex][title] = value;

    // Update the state with the new values
    setInputValues(updatedInputValues);

    // Send the updated values to the parent component
    onInputChange(questionId, updatedInputValues);

    // Console the user-entered value
    console.log(`User entered value: ${value}`);
  };

  const addRow = () => {
    const newRow = {};
    setInputValues([...inputValues, newRow]);
  };

  return (
    <div className={homestyles['input-container']}>
      {inputValues.map((row, rowIndex) => (
        <div className={homestyles['input-row']} key={rowIndex}>
          {textBoxOptions?.map((option) => (
            <AddTable
              key={option.title}
              rowOptions={option}
              title={option.title}
              value={row[option.title] || ""}
              onChange={(e) => handleInputChange(e, rowIndex)}
              multiple={true}
            />
          ))}
        </div>
      ))}
      <button className={homestyles['add-button']} onClick={addRow}>Add Row</button>
    </div>
  );
}
