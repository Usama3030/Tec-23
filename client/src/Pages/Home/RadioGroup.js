import React, { useState, useEffect } from "react";

// export function RadioGroup({ options, selectedValue, onChange, selectedItem }) {
//   return (
//     <div className={homestyles["form-checkboxes"]}>
//       {options.map((option) => (
//         <div key={option.id} className={homestyles["form-input"]}>
//           <label>
//             <input
//               type="radio"
//               name={option.name}
//               id={option.id}
//               value={option.value}
//               checked={selectedValue === option.value}
//               onChange={() => onChange(option)}
//             />
//             <span style={{ fontWeight: 'normal' }}>{option.title}</span>
//           </label>
//         </div>
//       ))}
//       {selectedItem && (
//         <div className={homestyles["form-selected-item"]}>
//           <p className={homestyles["selected-type"]} style={{ fontWeight: 'normal' }}>
//             Selected: {selectedItem}
//           </p>
//           <button
//             className={homestyles["change-button"]}
//             onClick={() => onChange(null)}
//           >
//             Change
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }
export function RadioGroup({ options, selectedValue, onChange, selectedItem }) {
  return (
    <div className="mt-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {options.map((option) => (
        <div key={option.id} className="flex flex-col items-center space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name={option.name}
              id={option.id}
              value={option.value}
              checked={selectedValue === option.value}
              onChange={() => onChange(option)}
              className="sr-only"
            />
            <div
              className={`${
                selectedValue === option.value
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700"
              } px-6 py-4 rounded-md cursor-pointer select-none shadow-md transition duration-300 transform hover:scale-105`}
            >
              {option.title}
            </div>
          </label>
        </div>
      ))}
      {selectedItem && (
        <div
        // className="flex flex-col items-center space-y-2 col-span-full"
        >
          <p className="font-normal">Selected: {selectedItem}</p>
          <div
            // className="px-6 py-4 border border-blue-500 rounded-md text-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white focus:outline-none shadow-md transition duration-300 transform hover:scale-105"
            onClick={() => onChange(null)}
          >
            Change
          </div>
        </div>
      )}
    </div>
  );
}

// export function TextInputRow({
//   label,
//   name,
//   id,
//   value,
//   score,
//   onChange,
//   placeholder,
//   displayOptions,
// }) {
//   return (
//     <div className="TextInputRow">
//       {/* {displayOptions?.showTitle !== false && (
//          <label htmlFor={id}>{label}:</label>
//       )} */}
//       <input
//         type="text"
//         name={name}
//         id={id}
//         value={value}
//         // score={score}
//         onChange={onChange}
//         placeholder={placeholder}
//         className={homestyles["input-field"]}
//       />
//     </div>
//   );
// }

// export function TextInputRow({
//   label,
//   name,
//   id,
//   value,
//   score,
//   onChange,
//   placeholder,
//   displayOptions,
// }) {
//   return (
//     <div className="flex items-center mb-6">
//       {/* {displayOptions?.showTitle !== false && (
//         <label htmlFor={id} className="text-sm font-semibold w-1/4 pr-4">{label}:</label>
//       )} */}
//       <div className="flex flex-col w-3/4">
//         <input
//           type="text"
//           name={name}
//           id={id}
//           value={value}
//           onChange={onChange}
//           placeholder={placeholder}
//           className="border border-gray-300 rounded-md px-4 py-2 mb-2 w-full focus:outline-none focus:border-gray-500 transition-all duration-300"
//         />
//       </div>
//     </div>
//   );
// }
// export function TextInputRow({
//   label,
//   name,
//   id,
//   value,
//   score,
//   onChange,
//   placeholder,
//   displayOptions,
// }) {
//   return (
//     <div className="flex items-center mb-6">

//       <div className="flex flex-col ">
//         <input
//           type="text"
//           name={name}
//           id={id}
//           value={value}
//           onChange={onChange}
//           placeholder={placeholder}
//           className="border border-gray-300 rounded-md px-4 py-2 mb-2 w-full focus:outline-none focus:border-gray-500 transition-all duration-300"
//         />
//       </div>
//     </div>
//   );
// }

export function TextInputDMY({
  label,
  name,
  id,
  value,
  onChange,
  placeholder,
  displayOptions,
}) {
  return (
    <div className="TextInputDate">
      {/* {displayOptions?.showTitle !== false &&(
        <label htmlFor={id}>{label}:</label>
      )} */}
      <input
        type="date"
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        className="input-field"
      />
    </div>
  );
}

export function TextInputNumber({
  label,
  name,
  id,
  value,
  onChange,
  placeholder,
  displayOptions,
}) {
  return (
    <div className="TextInputNumber">
      {/* {displayOptions?.showTitle !== false &&(
        <label htmlFor={id}>{label}:</label>
      )} */}
      <input
        type="number"
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        className="input-field"
      />
    </div>
  );
}

export function AddTable({
  label,
  name,
  id,
  value,
  onChange,
  placeholder,
  displayOptions,
  rowOptions,
}) {
  return (
    <div className="flex flex-row">
      {rowOptions.map((row, index) => (
        <div
          key={index}
          className={`mr-2  mt-2 w-${rowOptions.length === 2 ? "1/2" : "full"}`}
          // className={`mb-2 ${rowOptions.length === 2 ? "w-2/5" : "w-full"}`}
        >
          <input
            type="text"
            name={row.title}
            id={row.title}
            value={row.value}
            onChange={(event) => onChange(event, index)}
            placeholder={row.title}
            className="w-full rounded p-2"
          />
        </div>
      ))}
    </div>
  );
}

export function MultipleInputs({
  label,
  name,
  id,
  value,
  onChange,
  placeholder,
  displayOptions,
  rowOptions,
}) {
  return (
    <div className="flex flex-row ">
      {rowOptions.map((row, index) => (
        <div
          key={index}
          className={`mr-2  mt-2 w-${
            rowOptions.length === 2 ? "1/2" : "full"
          } `}
        >
          {/* {displayOptions?.showTitle !== false && (
         <label htmlFor={id}>{label}:</label>
      )} */}
          <input
            type="text"
            name={row.title}
            id={row.title}
            value={row.value}
            onChange={(event) => onChange(event, index)}
            placeholder={row.title}
            className="w-full rounded p-2"
          />
        </div>
      ))}
    </div>
  );
}
