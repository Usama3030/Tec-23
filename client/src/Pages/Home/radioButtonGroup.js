import React, { useState } from "react";

import { RadioGroup } from "./RadioGroup";

export function RadioButtonGroup({
  radioButtonOptions,
  selectedValue,
  onRadioButtonChange,
  onInputDetailChange,
  questionId,
}) {
  const [selected, setSelected] = useState({});
  const [typeCollapsed, setTypeCollapsed] = useState(false);

  const handleTypeChange = (value, score) => {
    setSelected(value, score);
    setTypeCollapsed(true);
    onRadioButtonChange(questionId, value, score);
  };

  return (
    <div className="mt-4">
      {typeCollapsed ? (
        <div className="mt-4 flex items-center border border-gray-200 bg-gray-100 p-4 rounded shadow-md">
          {/* Selected item at the start */}
          <div className="focus:outline-none bg-gray-400 hover:bg-gray-600 hover:text-white text-black font-semibold py-2 px-4 rounded">
            <p className="font-normal">{selected?.title}</p>
          </div>
          {/* Spacer to push the button to the end */}
          <div className="flex-grow"></div>

          {/* Change button at the end */}
          <button
            className="ml-2 px-2 py-1 border border-gray-400 rounded bg-red-600  text-white hover:bg-red-500"
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
