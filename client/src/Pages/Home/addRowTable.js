import React, { useState } from "react";
import { AddTable } from "./RadioGroup";
import { IoIosClose, IoMdTrash } from "react-icons/io";

export function AddRemoteTable({
  textBoxOptions,
  onInputChange,
  questionId,
  answerOptionsId,
}) {
  const [inputValues, setInputValues] = useState([{}]);

  const handleInputChange = (e, rowIndex) => {
    const title = e.target?.name || "defaultTitle";
    const value = e.target?.value || "defaultValue";

    const updatedInputValues = [...inputValues];

    updatedInputValues[rowIndex] = updatedInputValues[rowIndex] || {};
    updatedInputValues[rowIndex][title] = value;

    setInputValues(updatedInputValues);
    onInputChange(questionId, updatedInputValues);
    console.log(`User entered value: ${value}`);
  };

  const addRow = () => {
    const newRow = {};
    setInputValues([...inputValues, newRow]);
  };

  const removeRow = (rowIndex) => {
    const updatedInputValues = [...inputValues];
    updatedInputValues.splice(rowIndex, 1);
    setInputValues(updatedInputValues);
    onInputChange(questionId, updatedInputValues);
  };

  return (
    <>
      <div className="flex justify-end">
        <button
          className="bg-gradient-to-r from-teal-500 to-blue-500 text-white px-4 py-2 rounded-md hover:bg-gradient-to-r hover:from-teal-600 hover:to-blue-600 mb-4 md:mb-0"
          onClick={addRow}
        >
          + Add Row
        </button>
      </div>
      {/* <div className="grid grid-cols-1 md:grid-cols-1 mx-4 px-2 gap-4 ">
        {inputValues.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="mb-4 p-4 rounded-md shadow-sm transition-all duration-300 hover:shadow-lg grid grid-cols-2 relative"
          >
           
            <div className="col-start-2 flex justify-end">
              <button
                className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-700"
                onClick={() => removeRow(rowIndex)}
              >
                <IoIosClose />
             
              </button>
            </div>
            {textBoxOptions?.map((option) => (
              <div key={option.title} className="col-span-2 mb-2">
                <AddTable
                  rowOptions={option}
                  title={option.title}
                  value={row[option.title] || ""}
                  onChange={(e) => handleInputChange(e, rowIndex)}
                  multiple={true}
                />
              </div>
            ))}
          </div>
        ))}
      </div> */}
      <div className="grid grid-cols-1 md:grid-cols-1 mx-4 px-2 gap-4">
        {inputValues.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="mb-4 p-4 rounded-md shadow-sm transition-all duration-300 hover:shadow-lg grid grid-cols-10"
          >
            {textBoxOptions?.map((option) => (
              <div key={option.title} className="mb-2 col-span-9">
                <AddTable
                  rowOptions={option}
                  title={option.title}
                  value={row[option.title] || ""}
                  onChange={(e) => handleInputChange(e, rowIndex)}
                  multiple={true}
                />
              </div>
            ))}
            <div className="col-span-1 flex items-center justify-end">
              <button
                className="bg-red-500 text-white px-2 py-2 rounded-md hover:bg-red-700"
                onClick={() => removeRow(rowIndex)}
              >
                <IoIosClose />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
