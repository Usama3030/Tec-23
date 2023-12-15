// import { useState, useEffect } from "react";
// import React from "react";
// import axios from "axios";
// import Cookies from "js-cookie";
// import homestyles from "./Home.module.css";
// import { useLocation } from "react-router-dom";
// import { RadioButtonGroup } from "./radioButtonGroup";
// import { TextBoxGroup } from "./textBoxGroup";
// import { TextInputDate } from "./textDateGroup";
// import { TextInputNo } from "./textNoGroup";
// import { AddRemoteTable } from "./addRowTable";
// import { MultipleInputsGroup } from "./textMultipleGroup";
// import { useNavigate } from "react-router-dom";
// import { AdminNavbar } from "../../Components/AdminNavbar";

// const Home = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { formData } = location.state || {};
//   const [checklistData, setChecklistData] = useState(null);
//   const [newChecklistId, setNewChecklistId] = useState(null);
//   const [inputValues, setInputValues] = useState({});
//   const [dateInputValues, setDateInputValues] = useState({});
//   const [numberInputValues, setNumberInputValues] = useState({});
//   const [multipleInputValues, setMultipleInputValues] = useState({});
//   const [selectedRadioValues, setSelectedRadioValues] = useState({});
//   const [multiValues, setMultiValues] = useState({});

//   const [step, setStep] = useState(1);
//   //prevent login
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       navigate("/login");
//     }
//   }, []);

//   useEffect(() => {
//     const checklistId = formData?.type;

//     if (!checklistId) {
//       return;
//     }

//     axios
//       .get(
//         `${process.env.REACT_APP_NODE_API}/api5/getChecklistData/${checklistId}`
//       )
//       .then((response) => {
//         // console.log({checklistId})
//         const checklist = response.data;
//         setChecklistData(checklist);
//         console.log(checklist);
//         console.log(checklist.totalScore);
//       })
//       .catch((error) => {
//         console.error("Error fetching checklist data:", error);
//       });
//   }, [formData?.type]);

//   // start of pagination section
//   const handleNextStep = () => {
//     setStep(step + 1);
//   };

//   const handlePreviousStep = () => {
//     setStep(step - 1);
//   };
//   // end of pagination section

//   // start of cookie.js
//   useEffect(() => {
//     // Retrieve the newChecklistId from the cookie
//     const idFromCookie = Cookies.get("newChecklistId");
//     if (idFromCookie) {
//       setNewChecklistId(idFromCookie);
//     }
//   }, []);
//   //end of cookie js

//   // const handleInputChange = (questionId, name, value) => {
//   //   setInputValues((prevInputValues) => ({
//   //     ...prevInputValues,
//   //     [questionId]: {
//   //       ...(prevInputValues[questionId] || {}),
//   //       name: [value],
//   //     },
//   //   }));
//   // };

//   const handleInputChange = (questionId, answerOption) => {
//     setInputValues((prevInputValues) => ({
//       ...prevInputValues,
//       [questionId]: {
//         ...(prevInputValues[questionId] || {}),
//         answerOptions: [answerOption],
//       },
//     }));
//   };

//   const handleDateInputChange = (questionId, answerOption) => {
//     setDateInputValues((prevDateInputValues) => ({
//       ...prevDateInputValues,
//       [questionId]: {
//         ...(prevDateInputValues[questionId] || {}),
//         answerOptions: [answerOption],
//       },
//     }));
//   };

//   const handleRadioButtonChange = (questionId, value) => {
//     setSelectedRadioValues((prevValues) => ({
//       ...prevValues,
//       [questionId]: {
//         ...(prevValues[questionId] || {}),
//         answerOptions: [value],
//       },
//     }));
//   };

//   const handleMultipleInputChange = (questionId, multipleInputValues) => {
//     setMultipleInputValues((prevValues) => ({
//       ...prevValues,
//       [questionId]: multipleInputValues,
//     }));
//   };
//   const handleMultiValueChange = (questionId, multiValues) => {
//     setMultiValues((prevValues) => ({
//       ...prevValues,
//       [questionId]: multiValues,
//     }));
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const userData = {
//       checklistId: newChecklistId,
//       selectedRadioValues: selectedRadioValues,
//       dateInputValues: dateInputValues,
//       inputValues: inputValues,
//       multipleInputValues: multipleInputValues,
//       multiValues: multiValues,
//       checklistTotalScore: checklistData.totalScore,
//     };
//     if (step < checklistData.sections?.length) {
//       userData.Status = "In Progress";
//     } else {
//       userData.Status = "Completed";
//     }
//     console.log(newChecklistId);
//     console.log("Input Values:", inputValues);
//     console.log("Selected Radio Values:", selectedRadioValues);
//     console.log("Date Input Values:", dateInputValues);
//     console.log("multiple Values:", multipleInputValues);
//     console.log("multiSections Values:", multiValues);
//     console.log("total score", checklistData.totalScore);
//     try {
//       const response = await axios.post(
//         "http://localhost:8080/api5/upload",
//         userData
//       );

//       // Handle the response from the backend (e.g., show a success message)
//       console.log("Response from backend:", response.data);
//       if (step === checklistData.sections?.length) {
//         setInputValues({});
//         setDateInputValues({});
//         setSelectedRadioValues({});
//         setMultipleInputValues({});
//         setMultiValues({});
//         alert("Success! Your form has been submitted.");
//       }
//     } catch (error) {
//       console.error("Error sending user data to the backend:", error);
//     }
//   };

//   return (
//     <div className={homestyles["home"]}>
//       {/* <div className={homestyles["header-container"]}>
//         <div className={homestyles.details2}>Baskan - FireGuard Pro</div>
//         <div className={homestyles["company-name"]}>Baskan Tech</div>
//         <div className={homestyles.details}>
//           Please tap the closest problem category
//         </div>
//       </div> */}
//       <AdminNavbar />
//       <div>
//         {checklistData ? (
//           <div className={homestyles["Home-container"]}>
//             <form onSubmit={handleSubmit}>
//               {checklistData.sections?.map((section, index) => (
//                 <div
//                   key={section._id}
//                   style={{ display: step === index + 1 ? "block" : "none" }}
//                 >
//                   <h2>{section.title}</h2>
//                   <div className={homestyles["form-header"]}>
//                     {section.questions?.map((question) => (
//                       <div key={question._id}>
//                         <p style={{ fontWeight: "normal" }}>{question.title}</p>
//                         {question.answerOptions?.filter(
//                           (a) => a.type === "checkbox"
//                         ).length > 0 && (
//                           // <RadioButtonGroup radioButtonOptions={question.answerOptions}
//                           // onRadioButtonChange={(value) => handleRadioButtonChange(question.title, value)} />
//                           <RadioButtonGroup
//                             radioButtonOptions={question.answerOptions}
//                             selectedValue={
//                               selectedRadioValues[question._id]?.[
//                                 question.title
//                               ]
//                             }
//                             onRadioButtonChange={(questionId, value) =>
//                               handleRadioButtonChange(questionId, value)
//                             }
//                             questionId={question._id}
//                           />
//                         )}
//                         <div>
//                           {/* className={homestyles["textInput-container"]} */}
//                           {question.answerOptions?.filter(
//                             (a) => a.type === "input"
//                           ).length > 0 && (
//                             // <TextBoxGroup textBoxOptions={question.answerOptions.filter((b) => b.type === "input")} onInputChange={handleInputChange} />
//                             <TextBoxGroup
//                               textBoxOptions={question.answerOptions.filter(
//                                 (b) => b.type === "input"
//                               )}
//                               onInputChange={(questionId, answerOption) =>
//                                 handleInputChange(questionId, answerOption)
//                               }
//                               questionId={question._id} // Pass the question ID here
//                             />
//                           )}
//                         </div>
//                         {question.answerOptions?.filter(
//                           (a) => a.type === "input-date"
//                         ).length > 0 && (
//                           // <TextInputDate textBoxOptions={question.answerOptions}  onInputChange={handleDateInputChange} />
//                           <TextInputDate
//                             textBoxOptions={question.answerOptions}
//                             onInputChange={(questionId, answerOption) =>
//                               handleDateInputChange(questionId, answerOption)
//                             }
//                             questionId={question._id}
//                           />
//                         )}
//                         {question.answerOptions?.filter(
//                           (a) => a.type === "input-no"
//                         ).length > 0 && (
//                           // <TextInputNo textBoxOptions={question.answerOptions.filter((b) => b.type === "input-no")} onInputChange={handleInputChange} />
//                           <TextInputNo
//                             textBoxOptions={question.answerOptions.filter(
//                               (b) => b.type === "input-no"
//                             )}
//                             onInputChange={(questionId, answerOption) =>
//                               handleInputChange(questionId, answerOption)
//                             }
//                             questionId={question._id}
//                           />
//                         )}
//                         {/* {question.answerOptions?.filter((a) => a.type === "input-add").length > 0 && (
//                   // <AddRemoteTable textBoxOptions={question.answerOptions.filter((b) => b.type === "input-add")}
//                   // onInputChange={(values) => handleMultipleInputChange(question._id, "answers", values)} />
//                   <AddRemoteTable textBoxOptions={question.answerOptions.filter((b) => b.type === "input-add")}
//                   onInputChange={(questionId, multipleInputValues) =>
//                     handleMultipleInputChange(questionId, multipleInputValues)
//                   }
//                   questionId={question._id}
//                    />
//                 )} */}
//                         {question.answerOptions?.filter(
//                           (a) => a.type === "Array"
//                         ).length > 0 && (
//                           <AddRemoteTable
//                             textBoxOptions={question.answerOptions
//                               .filter((b) => b.type === "Array")
//                               .map((b) => b.detail)}
//                             onInputChange={(questionId, multipleInputValues) =>
//                               handleMultipleInputChange(
//                                 questionId,
//                                 multipleInputValues
//                               )
//                             }
//                             questionId={question._id}
//                           />
//                         )}
//                         {question.answerOptions?.filter(
//                           (a) => a.type === "MultiValue"
//                         ).length > 0 && (
//                           <MultipleInputsGroup
//                             textBoxOptions={question.answerOptions
//                               .filter((b) => b.type === "MultiValue")
//                               .map((b) => b.detail)}
//                             onInputChange={(questionId, multiValues) =>
//                               handleMultiValueChange(questionId, multiValues)
//                             }
//                             questionId={question._id}
//                           />
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//               <div className={homestyles.button_wrapper}>
//                 {step < checklistData.sections?.length && (
//                   <button
//                     className={homestyles.button_common}
//                     onClick={handleNextStep}
//                   >
//                     Next
//                   </button>
//                 )}
//                 {step === checklistData.sections?.length && (
//                   <button className={homestyles.button_common} type="submit">
//                     Submit
//                   </button>
//                 )}
//                 {step > 1 && (
//                   <button
//                     className={homestyles.button_common}
//                     onClick={handlePreviousStep}
//                   >
//                     Previous
//                   </button>
//                 )}
//               </div>
//             </form>
//           </div>
//         ) : (
//           <div className={homestyles["home-loading"]}>
//             <div className={homestyles["loading-container"]}>
//               <div className={homestyles["loading-spinner"]}></div>
//               <p className={homestyles["loading-text"]}>
//                 Loading checklist data...
//               </p>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Home;

import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";
import { RadioButtonGroup } from "./radioButtonGroup";
import { TextBoxGroup } from "./textBoxGroup";
import { TextInputDate } from "./textDateGroup";
import { TextInputNo } from "./textNoGroup";
import { AddRemoteTable } from "./addRowTable";
import { MultipleInputsGroup } from "./textMultipleGroup";
import { useNavigate } from "react-router-dom";
import { AdminNavbar } from "../../Components/AdminNavbar";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { formData } = location.state || {};
  const [checklistData, setChecklistData] = useState(null);
  const [newChecklistId, setNewChecklistId] = useState(null);
  const [inputValues, setInputValues] = useState({});
  const [dateInputValues, setDateInputValues] = useState({});
  const [numberInputValues, setNumberInputValues] = useState({});
  const [multipleInputValues, setMultipleInputValues] = useState({});
  const [selectedRadioValues, setSelectedRadioValues] = useState({});
  const [multiValues, setMultiValues] = useState({});

  const [step, setStep] = useState(1);
  //prevent login
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    const checklistId = formData?.type;

    if (!checklistId) {
      return;
    }

    axios
      .get(
        `${process.env.REACT_APP_NODE_API}/api5/getChecklistData/${checklistId}`
      )
      .then((response) => {
        // console.log({checklistId})
        const checklist = response.data;
        setChecklistData(checklist);
        console.log(checklist);
        console.log(checklist.totalScore);
      })
      .catch((error) => {
        console.error("Error fetching checklist data:", error);
      });
  }, [formData?.type]);

  // start of pagination section
  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };
  // end of pagination section

  // start of cookie.js
  useEffect(() => {
    // Retrieve the newChecklistId from the cookie
    const idFromCookie = Cookies.get("newChecklistId");
    if (idFromCookie) {
      setNewChecklistId(idFromCookie);
    }
  }, []);
  //end of cookie js

  // const handleInputChange = (questionId, name, value) => {
  //   setInputValues((prevInputValues) => ({
  //     ...prevInputValues,
  //     [questionId]: {
  //       ...(prevInputValues[questionId] || {}),
  //       name: [value],
  //     },
  //   }));
  // };

  const handleInputChange = (questionId, answerOption) => {
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [questionId]: {
        ...(prevInputValues[questionId] || {}),
        answerOptions: [answerOption],
      },
    }));
  };

  const handleDateInputChange = (questionId, answerOption) => {
    setDateInputValues((prevDateInputValues) => ({
      ...prevDateInputValues,
      [questionId]: {
        ...(prevDateInputValues[questionId] || {}),
        answerOptions: [answerOption],
      },
    }));
  };

  const handleRadioButtonChange = (questionId, value) => {
    setSelectedRadioValues((prevValues) => ({
      ...prevValues,
      [questionId]: {
        ...(prevValues[questionId] || {}),
        answerOptions: [value],
      },
    }));
  };

  const handleMultipleInputChange = (questionId, multipleInputValues) => {
    setMultipleInputValues((prevValues) => ({
      ...prevValues,
      [questionId]: multipleInputValues,
    }));
  };
  const handleMultiValueChange = (questionId, multiValues) => {
    setMultiValues((prevValues) => ({
      ...prevValues,
      [questionId]: multiValues,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userData = {
      checklistId: newChecklistId,
      selectedRadioValues: selectedRadioValues,
      dateInputValues: dateInputValues,
      inputValues: inputValues,
      multipleInputValues: multipleInputValues,
      multiValues: multiValues,
      checklistTotalScore: checklistData.totalScore,
    };
    if (step < checklistData.sections?.length) {
      userData.Status = "In Progress";
    } else {
      userData.Status = "Completed";
    }
    console.log(newChecklistId);
    console.log("Input Values:", inputValues);
    console.log("Selected Radio Values:", selectedRadioValues);
    console.log("Date Input Values:", dateInputValues);
    console.log("multiple Values:", multipleInputValues);
    console.log("multiSections Values:", multiValues);
    console.log("total score", checklistData.totalScore);
    try {
      const response = await axios.post(
        "http://localhost:8080/api5/upload",
        userData
      );

      // Handle the response from the backend (e.g., show a success message)
      console.log("Response from backend:", response.data);
      if (step === checklistData.sections?.length) {
        setInputValues({});
        setDateInputValues({});
        setSelectedRadioValues({});
        setMultipleInputValues({});
        setMultiValues({});
        alert("Success! Your form has been submitted.");
      }
    } catch (error) {
      console.error("Error sending user data to the backend:", error);
    }
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <AdminNavbar />

        <div className="w-full lg:w-5/6 xl:w-4/5 mx-auto px-2 bg-slate-50 shadow-md rounded-md">
          {checklistData ? (
            <div className="Home-container min-h-[100vh]">
              <form onSubmit={handleSubmit}>
                {checklistData.sections?.map((section, index) => (
                  <div
                    key={section._id}
                    className={`${
                      step === index + 1 ? "block" : "hidden"
                    } transition-all duration-300`}
                  >
                    <h2 className="text-3xl font-bold mb-6 text-center text-gray-600">
                      {section.title}
                    </h2>
                    <div className="form-header grid grid-cols-1">
                      {section.questions?.map((question) => (
                        <div key={question._id} className="mb-6">
                          <p className="font-semibold text-xl my-2 text-black">
                            {question.title}
                          </p>
                          <div className="">
                            {question.answerOptions?.filter(
                              (a) => a.type === "checkbox"
                            ).length > 0 && (
                              <RadioButtonGroup
                                radioButtonOptions={question.answerOptions}
                                selectedValue={
                                  selectedRadioValues[question._id]?.[
                                    question.title
                                  ]
                                }
                                onRadioButtonChange={(questionId, value) =>
                                  handleRadioButtonChange(questionId, value)
                                }
                                questionId={question._id}
                              />
                            )}
                          </div>
                          <div className="w-full">
                            {question.answerOptions?.filter(
                              (a) => a.type === "input"
                            ).length > 0 && (
                              <>
                                {question.answerOptions
                                  .filter((b) => b.type === "input")
                                  .map((textBoxOption, index) => (
                                    <div
                                      key={textBoxOption._id}
                                      className="w-full"
                                    >
                                      <TextBoxGroup
                                        textBoxOptions={[textBoxOption]}
                                        onInputChange={(
                                          questionId,
                                          answerOption
                                        ) =>
                                          handleInputChange(
                                            questionId,
                                            answerOption
                                          )
                                        }
                                        questionId={question._id}
                                      />
                                    </div>
                                  ))}
                              </>
                            )}
                          </div>
                          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                            {question.answerOptions?.filter(
                              (a) => a.type === "input-date"
                            ).length > 0 && (
                              // <TextInputDate textBoxOptions={question.answerOptions}  onInputChange={handleDateInputChange} />
                              <TextInputDate
                                textBoxOptions={question.answerOptions}
                                onInputChange={(questionId, answerOption) =>
                                  handleDateInputChange(
                                    questionId,
                                    answerOption
                                  )
                                }
                                questionId={question._id}
                              />
                            )}
                          </div>
                          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                            {question.answerOptions?.filter(
                              (a) => a.type === "input-no"
                            ).length > 0 && (
                              // <TextInputNo textBoxOptions={question.answerOptions.filter((b) => b.type === "input-no")} onInputChange={handleInputChange} />
                              <TextInputNo
                                textBoxOptions={question.answerOptions.filter(
                                  (b) => b.type === "input-no"
                                )}
                                onInputChange={(questionId, answerOption) =>
                                  handleInputChange(questionId, answerOption)
                                }
                                questionId={question._id}
                              />
                            )}
                          </div>
                          <div className="">
                            {question.answerOptions?.filter(
                              (a) => a.type === "Array"
                            ).length > 0 && (
                              <AddRemoteTable
                                textBoxOptions={question.answerOptions
                                  .filter((b) => b.type === "Array")
                                  .map((b) => b.detail)}
                                onInputChange={(
                                  questionId,
                                  multipleInputValues
                                ) =>
                                  handleMultipleInputChange(
                                    questionId,
                                    multipleInputValues
                                  )
                                }
                                questionId={question._id}
                              />
                            )}
                          </div>
                          <div className="">
                            {question.answerOptions?.filter(
                              (a) => a.type === "MultiValue"
                            ).length > 0 && (
                              <MultipleInputsGroup
                                textBoxOptions={question.answerOptions
                                  .filter((b) => b.type === "MultiValue")
                                  .map((b) => b.detail)}
                                onInputChange={(questionId, multiValues) =>
                                  handleMultiValueChange(
                                    questionId,
                                    multiValues
                                  )
                                }
                                questionId={question._id}
                              />
                            )}
                          </div>
                          {/* ... (remaining code for other input types) ... */}
                        </div>
                      ))}
                    </div>
                    {/* Render RadioButtonGroup for checkbox answer type */}

                    {/* Render TextBoxGroup for input answer type */}

                    {/* Render TextDate */}

                    {/* Render TextNumber */}

                    {/* Render Multiple inputs and AddRow */}
                  </div>
                ))}

                <div
                  className="button_wrapper mt-8"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  {step > 1 ? (
                    <button
                      className="button_common bg-gradient-to-r from-gray-700 to-gray-800 text-white px-6 py-2 rounded-md hover:opacity-90 focus:outline-none focus:border-gray-800 focus:ring focus:ring-gray-500"
                      onClick={handlePreviousStep}
                    >
                      Previous
                    </button>
                  ) : (
                    <div /> // Empty div when there is no "Previous" button
                  )}

                  {step < checklistData.sections?.length && (
                    <button
                      className="button_common bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-md hover:opacity-90 focus:outline-none focus:border-blue-600 focus:ring focus:ring-blue-300"
                      onClick={handleNextStep}
                    >
                      Next
                    </button>
                  )}

                  {step === checklistData.sections?.length && (
                    <button
                      className="button_common bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-md hover:opacity-90 focus:outline-none focus:border-green-600 focus:ring focus:ring-green-300"
                      type="submit"
                    >
                      Submit
                    </button>
                  )}
                </div>
              </form>
            </div>
          ) : (
            <div className="flex items-center justify-center h-screen">
              <div className="text-center">
                <div className="loading-spinner animate-spin rounded-full border-t-4 border-blue-500 border-opacity-25 h-12 w-12 mx-auto"></div>
                <p className="loading-text text-gray-700 mt-4">
                  Loading checklist data...
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
