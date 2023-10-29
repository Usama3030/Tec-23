import React, { useEffect, useState } from "react";
import businessStyle from "./Business.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const AddBusiness = () => {
    const navigate = useNavigate();
  
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [business, setBusinessDetails] = useState({
      name: "",
      subbusinessName: "",
      buildingName: "",
      buildingPhone: "",
      buildingEmail: "",
      buildingAddress1: "",
      buildingAddress2: "",
    });
      //prevent login
   useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setBusinessDetails({
      ...business,
      [name]: value,
    });
  };
  
  const validateForm = (values) => {
    const error = {};
    const regex = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.name) {
      error.name = "Business Name is required";
    }
    if (!values.subbusinessName) {
      error.subbusinessName = "Subbusiness's Name is required";
    }
    if (!values.buildingName) {
      error.buildingName = "Building's Name is required";
    }
    if (!values.buildingPhone) {
      error.buildingPhone = "Building's Phone is required";
    }
    if (!values.buildingEmail) {
      error.buildingEmail = "Building's Email is required";
    } else if (!regex.test(values.buildingEmail)) {
      error.buildingEmail = "This is not a valid email format!";
    }
    if (!values.buildingAddress1) {
      error.buildingAddress1 = "Business's Address Line 1 is required";
    }
    if (!values.buildingAddress2) {
      error.buildingAddress2 = "Building's Address Line 2 is required";
    }
    return error;
  };
  const createHandler = async (e) => {
    e.preventDefault();
    setFormErrors(validateForm(business));
    setIsSubmit(true);
  
    if (Object.keys(formErrors).length === 0) {
      try {
        const response = await axios.post(`${process.env.REACT_APP_NODE_API}/api2/business`, business);
        if (response.status === 201) {
          alert(response.data.message);
          navigate("/dashboard", { replace: true });
        }
      } catch (error) {
        if (error.response && error.response.status === 500) {
          // Handle "Business not found" error
          setFormErrors({ ...formErrors, business: "Logical Error" });
        } else {
          // Handle other errors
          console.error("Error:", error);
          // Display a general error message to the user
          alert("An error occurred while registering.");
        }
      }
    }
  };
console.log(business);
    return(
<>
      <div className={businessStyle.business}>
        <form>
          <h1>Create Business</h1>
          <div className={businessStyle.business_body}>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter Business Name"
            onChange={changeHandler}
            value={business.name}
          />
          <p className={businessStyle.error}>{formErrors.name}</p>
          {/* <label htmlFor="subbusinessName">Subbusiness Name</label> */}
          <input
            type="text"
            name="subbusinessName"
            id="subbusinessName"
            placeholder="Enter SubBusiness Name"
            onChange={changeHandler}
            value={business.subbusinessName}
          />
          <p className={businessStyle.error}>{formErrors.subbusinessName}</p>
          <input
            type="text"
            name="buildingName"
            id="buildingName"
            placeholder="Enter Building Name"
            onChange={changeHandler}
            value={business.buildingName}
          />
          <p className={businessStyle.error}>{formErrors.buildingName}</p>
          <input
            type="text"
            name="buildingPhone"
            id="buildingPhone"
            placeholder="Enter Building Phone"
            onChange={changeHandler}
            value={business.buildingPhone}
          />
          <p className={businessStyle.error}>{formErrors.buildingPhone}</p>
          <input
            type="email"
            name="buildingEmail"
            id="buildingEmail"
            placeholder="Enter Building Email"
            onChange={changeHandler}
            value={business.buildingEmail}
          />
          <p className={businessStyle.error}>{formErrors.buildingEmail}</p>
          <input
            type="text"
            name="buildingAddress1"
            id="buildingAddress1"
            placeholder="Enter Business Address"
            onChange={changeHandler}
            value={business.buildingAddress1}
          />
          <p className={businessStyle.error}>{formErrors.buildingAddress1}</p>
          <input
            type="text"
            name="buildingAddress2"
            id="buildingAddress2"
            placeholder="Enter Business Address Line 2"
            onChange={changeHandler}
            value={business.buildingAddress2}
          />
          <p className={businessStyle.error}>{formErrors.buildingAddress2}</p>
          <button className={businessStyle.button_common} onClick={createHandler}>
            Register
          </button>
          </div>
        </form>
      </div>
    
    </>
);
};
export default AddBusiness;


// import React, { useEffect, useState } from "react";
// import businessStyle from "./Business.module.css";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// const AddBusiness = () => {
//     const navigate = useNavigate();
  
//     const [formErrors, setFormErrors] = useState({});
//     const [isSubmit, setIsSubmit] = useState(false);
//     const [business, setBusinessDetails] = useState([{
//       name: "",
//       subbusinessName: "",
//       buildingName: "",
//       buildingPhone: "",
//       buildingEmail: "",
//       buildingAddress1: "",
//       buildingAddress2: "",
//     }]);
//     // const addRow = () => {
//     //   setBusinessDetails([...business, {subbusinessName:'', buildingName:'', buildingPhone:'', buildingEmail:'', buildingAddress: ""}])
//     // }
//     // const onRemove=(i) => {
//     //   const newForm = [...business]
//     //   newForm.splice(i, 1)
//     //   setBusinessDetails(newForm)
//     // }
//     const addRow = () => {
//       setBusinessDetails([
//         ...business,
//         {
//           subbusinessName: '',
//           buildingName: '',
//           buildingPhone: '',
//           buildingEmail: '',
//           buildingAddress1: '',
//           buildingAddress2: '',
//         },
//       ]);
//     };
    
//     const onRemove = (i) => {
//       if (business.length > 1) {
//         const newForm = [...business];
//         newForm.splice(i, 1);
//         setBusinessDetails(newForm);
//       }
//     };
    
//       //prevent login
//    useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       navigate("/login");
//     }
//   }, []);

//   // const changeHandler = (e) => {
//   //   const { name, value } = e.target;
//   //   setBusinessDetails({
//   //     ...business,
//   //     [name]: value,
//   //   });
//   // };

//   const onHandle = (e, i) => {
//     let newForm = [...business]
//     newForm[i][e.target.name]= e.target.value
//     setBusinessDetails(newForm)
//   }
  
//   const validateForm = (values) => {
//     const error = {};
//     const regex = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i;
//     if (!values.name) {
//       error.name = "Business Name is required";
//     }
//     if (!values.subbusinessName) {
//       error.subbusinessName = "Subbusiness's Name is required";
//     }
//     if (!values.buildingName) {
//       error.buildingName = "Building's Name is required";
//     }
//     if (!values.buildingPhone) {
//       error.buildingPhone = "Building's Phone is required";
//     }
//     if (!values.buildingEmail) {
//       error.buildingEmail = "Building's Email is required";
//     } else if (!regex.test(values.buildingEmail)) {
//       error.buildingEmail = "This is not a valid email format!";
//     }
//     if (!values.buildingAddress1) {
//       error.buildingAddress1 = "Building's Address is required";
//     }
//     if (!values.buildingAddress2) {
//       error.buildingAddress2 = "Address line 2 is required";
//     }
//     return error;
//   };
//   const createHandler = async (e) => {
//     e.preventDefault();
//     setFormErrors(validateForm(business));
//     setIsSubmit(true);
  
//     if (Object.keys(formErrors).length === 0) {
//       try {
//         const response = await axios.post(`${process.env.REACT_APP_NODE_API}/api2/business`, business);
//         if (response.status === 201) {
//           alert(response.data.message);
//           navigate("/dashboard", { replace: true });
//         }
//       } catch (error) {
//         if (error.response && error.response.status === 500) {
//           // Handle "Business not found" error
//           setFormErrors({ ...formErrors, business: "Logical Error" });
//         } else {
//           // Handle other errors
//           console.error("Error:", error);
//           // Display a general error message to the user
//           alert("An error occurred while registering.");
//         }
//       }
//     }
//   };
// console.log(business);
//     return(
// <>
//       <div className={businessStyle.business}>
//         <form>
//           <h1>Create Business</h1>
//           <div className={businessStyle.business_body}>
//           <input
//             type="text"
//             name="name"
//             id="name"
//             placeholder="Enter Business Name"
//             onChange={ onHandle}
//             value={business.name}
//           />
//           <p className={businessStyle.error}>{formErrors.name}</p>
//           {business.map((item, i)=> (
//             <div key={i}>
//           {/* <label htmlFor="subbusinessName">Subbusiness Name</label> */}
//           <input
//             type="text"
//             name="subbusinessName"
//             id="subbusinessName"
//             placeholder="Enter SubBusiness Name"
//             // onChange={changeHandler}
//             value={item.subbusinessName}
//             onChange={(e)=> onHandle(e, i)}
//           />
//           <p className={businessStyle.error}>{formErrors.subbusinessName}</p>
//           <input
//             type="text"
//             name="buildingName"
//             id="buildingName"
//             placeholder="Enter Building Name"
//             // onChange={changeHandler}
//             onChange={(e)=> onHandle(e, i)}
//             value={item.buildingName}
//           />
//           <p className={businessStyle.error}>{formErrors.buildingName}</p>
//           <input
//             type="text"
//             name="buildingPhone"
//             id="buildingPhone"
//             placeholder="Enter Building Phone"
//             // onChange={changeHandler}
//             onChange={(e)=> onHandle(e, i)}
//             value={item.buildingPhone}
//           />
//           <p className={businessStyle.error}>{formErrors.buildingPhone}</p>
//           <input
//             type="email"
//             name="buildingEmail"
//             id="buildingEmail"
//             placeholder="Enter Building Email"
//             // onChange={changeHandler}
//             onChange={(e)=> onHandle(e, i)}
//             value={item.buildingEmail}
//           />
//           <p className={businessStyle.error}>{formErrors.buildingEmail}</p>
//           <input
//             type="text"
//             name="buildingAddress1"
//             id="buildingAddress1"
//             placeholder="Enter Business Address"
//             // onChange={changeHandler}
//             onChange={(e)=> onHandle(e, i)}
//             value={item.buildingAddress1}
//           />
//           <p className={businessStyle.error}>{formErrors.buildingAddress1}</p>
//           <input
//             type="text"
//             name="buildingAddress2"
//             id="buildingAddress2"
//             placeholder="Enter Business Address"
//             // onChange={changeHandler}
//             onChange={(e)=> onHandle(e, i)}
//             value={item.buildingAddress2}
//           />
//           <p className={businessStyle.error}>{formErrors.buildingAddress2}</p>
//           {
//                 i === 0 ? "" :  <button onClick={()=>onRemove(i)}>Remove</button>
//               }
//               </div>

//           ))}
//           <button onClick={addRow}>Add Row</button>
//           <button className={businessStyle.button_common} onClick={createHandler}>
//             Register
//           </button>
//           </div>
//         </form>
//       </div>
    
//     </>
// );
// };
// export default AddBusiness;