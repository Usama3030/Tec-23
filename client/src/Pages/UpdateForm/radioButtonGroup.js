
import React, { useState, useEffect } from "react";
import homestyles from "./Home.module.css";
import { RadioGroup } from "./RadioGroup";

export function RadioButtonGroup({ radioButtonOptions, selectedValue, onRadioButtonChange, onInputDetailChange, questionId, initialValue }) {
  const [selected, setSelected] = useState({});
  const [typeCollapsed, setTypeCollapsed] = useState(false);
  //start of status and type
  const handleTypeChange = (value, score) => {
    setSelected(value, score);
    console.log(`User entered value for ${value}: ${score}: ${selected}`);
    setTypeCollapsed(true);
    onRadioButtonChange(questionId, value, score);

  };
 

 useEffect(() => {
  console.log("initial value recieved in radio file:", initialValue);
}, [initialValue]);
  //   useEffect(() => {
  //   // Initialize input values based on textBoxOptions
  //   const initialValues = {};
  //   radioButtonOptions?.forEach((r) => {
  //     if(r._id){
  //     initialValues[r._id] = initialValue?.answerOptions?.filter(a => a?._id == r._id)?.[0].title || "";
  //     }
  //   });
  //   // if(radioButtonOptions.filter(t=> t._id == "6535023462aed352d3e66e9d")?.length > 0){
  //   //   console.log("radio file123", initialValues, initialValue, initialValue?.answerOptions?.filter(a => a?._id == "6535023462aed352d3e66e9d"))
  //   //     }
  //       setSelected(initialValues);
  // }, [initialValue]);
  


  return (
    <div className={homestyles["form-checkboxes"]}>
      {typeCollapsed ? (
        <div className={homestyles["form-selected-item"]}>
          <p style={{ fontWeight: 'normal' }} className={homestyles["selected-type"]}>{selected?.title}</p>
          <button
            className={homestyles["change-button"]}
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










// import React, { useState, useEffect } from "react";
// import homestyles from "./Home.module.css";
// import { RadioGroup } from "./RadioGroup";

// export function RadioButtonGroup({
//   radioButtonOptions,
//   selectedValue,
//   onRadioButtonChange,
//   onInputDetailChange,
//   questionId,
//   initialValue,
// }) {
//   const [selected, setSelected] = useState({});
//   const [typeCollapsed, setTypeCollapsed] = useState(false);

//   const handleTypeChange = (value, score) => {
//     setSelected({ title: value, value, score });
//     setTypeCollapsed(true);
//     onRadioButtonChange(questionId, value, score);
//   };
//   useEffect(() => {
//     console.log("value in radio file:", initialValue)
//   }, [initialValue])

//   useEffect(() => {
//     let isMounted = true;
  
//     if (initialValue && initialValue.answerOptions && initialValue.answerOptions.length > 0) {
//       const selectedOption = initialValue.answerOptions[0];
//       if (selectedOption && isMounted) {
//         setSelected(selectedOption._id);
//         setTypeCollapsed(true);
//         onRadioButtonChange(
//           questionId,
//           selectedOption._id,
//           selectedOption.score
//         );
//       }
//     }
  
//     // Cleanup function
//     return () => {
//       isMounted = false;
//     };
//   }, [initialValue, questionId]);
  
  
//   return (
//     <div className={homestyles["form-checkboxes"]}>
//       {typeCollapsed ? (
//         <div className={homestyles["form-selected-item"]}>
//           <p style={{ fontWeight: 'normal' }} className={homestyles["selected-type"]}>
//             {/* {selected?.title} */}
//             {radioButtonOptions.find((option) => option._id === selected)?.title}

//           </p>
//           <button
//             className={homestyles["change-button"]}
//             onClick={() => setTypeCollapsed(false)}
//           >
//             Change
//           </button>
//         </div>
//       ) : (
//         <RadioGroup
//           options={radioButtonOptions?.map((r) => ({
//             title: r.title,
//             value: r._id,
//             id: r._id,
//             name: r._id,
//             score: r.score,
//           }))}
//           selectedValue={selectedValue}
//           onChange={handleTypeChange}
//         />
//       )}
//     </div>
//   );
// }


