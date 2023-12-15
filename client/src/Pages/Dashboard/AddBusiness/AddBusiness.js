import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../../Components/Navbar";
import newUserIcon from "../../../assets/check-list.png";
const AddBusiness = () => {
  const navigate = useNavigate();

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [business, setBusinessDetails] = useState({
    name: "",
  });
  // const [phoneList, setPhoneList]= useState([{buildingPhone:''}]);
  // const [emailList, setEmailList]= useState([{buildingEmail:''}]);
  const [buildingList, setBuildingList] = useState([
    {
      phoneList: [{ buildingPhone: "" }],
      emailList: [{ buildingEmail: "" }],
      buildingName: "",
      buildingAddress1: "",
      buildingAddress2: "",
      buildingPostalCode: "",
      buildingCity: "",
      buildingState: "",
      buildingCountry: "",
    },
  ]);

  const [subBusinessList, setSubBusinessList] = useState([
    {
      subbusinessName: "",
      buildingList: [
        {
          phoneList: [{ buildingPhone: "" }],
          emailList: [{ buildingEmail: "" }],
          buildingName: "",
          buildingAddress1: "",
          buildingAddress2: "",
          buildingPostalCode: "",
          buildingCity: "",
          buildingState: "",
          buildingCountry: "",
        },
      ],
    },
  ]);
  //prevent login
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);
  //phone
  const changeHandlePhone = (
    e,
    subBusinessIndex,
    buildingIndex,
    phoneIndex
  ) => {
    const { name, value } = e.target;
    const list = [...subBusinessList];
    list[subBusinessIndex].buildingList[buildingIndex].phoneList[
      phoneIndex
    ].buildingPhone = value;
    setSubBusinessList(list);
  };

  const handleremovePhone = (subBusinessIndex, buildingIndex, phoneIndex) => {
    const list = [...subBusinessList];
    list[subBusinessIndex].buildingList[buildingIndex].phoneList.splice(
      phoneIndex,
      1
    );
    setSubBusinessList(list);
  };

  const handleaddclickPhone = (subBusinessIndex, buildingIndex) => {
    const list = [...subBusinessList];
    console.log(subBusinessIndex, buildingIndex);
    list[subBusinessIndex].buildingList[buildingIndex].phoneList.push({
      buildingPhone: "",
    });
    setSubBusinessList(list);
  };
  //email
  const changeHandleEmail = (
    e,
    subBusinessIndex,
    buildingIndex,
    emailIndex
  ) => {
    // console.log("console value in email:", subBusinessIndex, buildingIndex, emailIndex)
    const { name, value } = e.target;
    const list = [...subBusinessList];
    // console.log("emillll",list[subBusinessIndex]);
    list[subBusinessIndex].buildingList[buildingIndex].emailList[
      emailIndex
    ].buildingEmail = value;
    setSubBusinessList(list);
  };

  const handleremoveEmail = (subBusinessIndex, buildingIndex, emailIndex) => {
    const list = [...subBusinessList];
    list[subBusinessIndex].buildingList[buildingIndex].emailList.splice(
      emailIndex,
      1
    );
    setSubBusinessList(list);
  };

  const handleaddclickEmail = (subBusinessIndex, buildingIndex) => {
    const list = [...subBusinessList];
    // console.log(subBusinessIndex, buildingIndex)
    list[subBusinessIndex].buildingList[buildingIndex].emailList.push({
      buildingEmail: "",
    });
    setSubBusinessList(list);
  };

  // Building
  const changeHandleBuilding = (e, subBusinessIndex, buildingIndex) => {
    const { name, value } = e.target;
    const list = [...subBusinessList];
    const updatedSubBusiness = { ...list[subBusinessIndex] };
    updatedSubBusiness.buildingList[buildingIndex][name] = value;
    list[subBusinessIndex] = updatedSubBusiness;
    setSubBusinessList(list);
  };

  const handleremoveBuilding = (subBusinessIndex, buildingIndex) => {
    const list = [...subBusinessList];
    list[subBusinessIndex].buildingList.splice(buildingIndex, 1);
    setSubBusinessList(list);
  };

  const handleaddclickBuilding = (subBusinessIndex) => {
    console.log("Console values ", subBusinessIndex, subBusinessList.length);
    const list = [...subBusinessList];
    list[subBusinessIndex].buildingList.push({
      phoneList: [{ buildingPhone: "" }],
      emailList: [{ buildingEmail: "" }],
      buildingName: "",
      buildingAddress1: "",
      buildingAddress2: "",
      buildingPostalCode: "",
      buildingCity: "",
      buildingState: "",
      buildingCountry: "",
    });
    setSubBusinessList(list);
  };

  // SubBusiness
  const changeHandleSubBusiness = (e, subBusinessIndex) => {
    const { name, value } = e.target;
    const list = [...subBusinessList];
    list[subBusinessIndex][name] = value;
    setSubBusinessList(list);
  };

  const handleremoveSubBusiness = (subBusinessIndex) => {
    const list = [...subBusinessList];
    list.splice(subBusinessIndex, 1);
    setSubBusinessList(list);
  };

  const handleaddclickSubBusiness = () => {
    setSubBusinessList([
      ...subBusinessList,
      {
        subbusinessName: "",
        buildingList: [
          {
            phoneList: [{ buildingPhone: "" }],
            emailList: [{ buildingEmail: "" }],
            buildingName: "",
            buildingAddress1: "",
            buildingAddress2: "",
            buildingPostalCode: "",
            buildingCity: "",
            buildingState: "",
            buildingCountry: "",
          },
        ],
      },
    ]);
  };

  const validateForm = (values) => {
    const errors = {};
    const regex = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.name) {
      errors.name = "Business Name is required";
    }

    // Add validation for other fields as needed

    return errors;
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setBusinessDetails({
      ...business,
      [name]: value,
    });
  };

  const createHandler = async (e) => {
    e.preventDefault();
    setFormErrors(validateForm(business));
    setIsSubmit(true);

    if (Object.keys(formErrors).length === 0) {
      try {
        // const businessData = {
        //   business: business,
        //   subBusinessList: subBusinessList,
        // };
        const businessData = {
          business: business,
          subBusinessList: subBusinessList.map((subBusiness) => {
            return {
              subbusinessName: subBusiness.subbusinessName,
              buildingList: subBusiness.buildingList.map((building) => {
                return {
                  ...building,
                  phoneList: building.phoneList,
                  emailList: building.emailList,
                };
              }),
            };
          }),
        };
        // if (Object.keys(formErrors).length === 0) {
        //   try {
        //     const businessData = {
        //       business: business,
        //       subBusinessList: subBusinessList.map((subBusiness) => ({
        //         subbusinessName: subBusiness.subbusinessName,
        //         buildingList: subBusiness.buildingList.map((building) => ({
        //           ...building,
        //           phoneList: building.phoneList,
        //           emailList: building.emailList,
        //         })),
        //       })),
        //     };
        console.log(businessData);
        const response = await axios.post(
          `${process.env.REACT_APP_NODE_API}/api2/business`,
          businessData
        );
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

  return (
    <>
      <div className="min-h-screen bg-gray-800 overflow-hidden w-full mx-1 ">
        {" "}
        {/* mx-2 md:mx-1 */}
        <Navbar />
        {/* <div className="container mx-auto mt-10 p-6 bg-white border rounded-lg shadow-md"> */}
        <div>
          <div className="container mx-auto mt-10 px-4 h-full w-96 ">
            <div className="flex content-center items-center justify-center h-full w-full ">
              <div className="w-full px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0 w-full">
                  <div className="rounded-t mb-0 px-6 py-6">
                    <div className="text-center mb-3 flex items-center  justify-center p-4 inline-block">
                      {/* Add icon or image here */}
                      <img
                        src={newUserIcon}
                        alt="New User Icon"
                        className="mr-2 h-9 w-9"
                      />
                      <h6 className="text-blueGray-500 text-sm font-bold">
                        Assign Task to User
                      </h6>
                    </div>
                    <hr className="mt-10 border-b-1 border-blueGray-300" />
                  </div>
                  <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <div className="text-blueGray-400 text-center mb-3 font-bold">
                      {/* <small>Or sign up with credentials</small> */}
                    </div>
                    <form>
                      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-3">
                        {/* Business */}
                        <div className="relative mb-3">
                          <label
                            htmlFor="name"
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          >
                            Business Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Enter Business Name"
                            onChange={changeHandler}
                            value={business.name}
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          />
                          <p className="text-red-500 text-xs mt-1">
                            {formErrors.name}
                          </p>
                        </div>
                      </div>

                      {/* SubBusiness */}

                      {/* Subbusiness start here */}
                      <div className="relative mb-3">
                        {subBusinessList.map(
                          (subBusiness, subBusinessIndex) => (
                            <div
                              key={subBusinessIndex}
                              className="relative bg-gray-200 p-4 mb-4 rounded-lg"
                            >
                              <div className="bg-white p-6 rounded-lg shadow-md relative">
                                <div className="absolute top-2 right-2 flex space-x-4">
                                  <div className="flex items-center">
                                    {subBusinessList.length !== 1 && (
                                      <button
                                        className="bg-red-500 text-white py-2 px-4 rounded"
                                        onClick={() =>
                                          handleremoveSubBusiness(
                                            subBusinessIndex
                                          )
                                        }
                                      >
                                        -
                                      </button>
                                    )}
                                  </div>
                                  <div className="flex items-center">
                                    {subBusinessList.length - 1 ===
                                      subBusinessIndex && (
                                      <button
                                        className="bg-green-500 text-white py-2 px-4 rounded"
                                        onClick={handleaddclickSubBusiness}
                                      >
                                        +
                                      </button>
                                    )}
                                  </div>
                                </div>

                                <div className="mb-6">
                                  <h2 className="text-2xl font-bold">
                                    Create SubBusiness
                                  </h2>
                                </div>
                                {/* Other subBusiness content */}
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-3">
                                  {/* Sub Business */}
                                  <div className="relative mb-3">
                                    <label
                                      htmlFor="subbusinessName"
                                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                    >
                                      SubBusiness Name
                                    </label>
                                    <input
                                      type="text"
                                      name="subbusinessName"
                                      id="subbusinessName"
                                      placeholder="Enter SubBusiness Name"
                                      // onChange={changeHandleSubBusiness}
                                      onChange={(e) =>
                                        changeHandleSubBusiness(
                                          e,
                                          subBusinessIndex
                                        )
                                      }
                                      value={subBusiness.subbusinessName}
                                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    />
                                    <p className="text-red-500 text-xs mt-1">
                                      {formErrors.subbusinessName}
                                    </p>
                                  </div>
                                </div>
                                {/* Building start here */}
                                <div className="relative mb-3">
                                  {subBusiness.buildingList.map(
                                    (building, buildingIndex) => (
                                      <div
                                        key={buildingIndex}
                                        className="relative bg-gray-200 p-4 mb-4 rounded-lg"
                                      >
                                        <div className="bg-white p-6 rounded-lg shadow-md relative">
                                          <div className="absolute top-2 right-2 flex space-x-4">
                                            <div className="flex items-center">
                                              {subBusiness.buildingList
                                                .length !== 1 && (
                                                <button
                                                  className="bg-red-500 text-white py-2 px-4 rounded"
                                                  onClick={() =>
                                                    handleremoveBuilding(
                                                      buildingIndex
                                                    )
                                                  }
                                                >
                                                  -
                                                </button>
                                              )}
                                            </div>
                                            <div className="flex items-center">
                                              {subBusiness.buildingList.length -
                                                1 ===
                                                buildingIndex && (
                                                <button
                                                  type="button"
                                                  className="bg-green-500 text-white py-2 px-4 rounded"
                                                  onClick={() =>
                                                    handleaddclickBuilding(
                                                      subBusinessIndex
                                                    )
                                                  }
                                                >
                                                  +
                                                </button>
                                              )}
                                            </div>
                                          </div>

                                          <div className="mb-6">
                                            <h2 className="text-2xl font-bold">
                                              Buildings
                                            </h2>
                                          </div>
                                          {/* Other Building content */}
                                          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-3">
                                            {/* Building */}
                                            <div className="relative mb-3">
                                              <label
                                                htmlFor="buildingName"
                                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                              >
                                                Place
                                              </label>

                                              <input
                                                type="text"
                                                name="buildingName"
                                                id="buildingName"
                                                placeholder="Enter valid Name"
                                                onChange={(e) =>
                                                  changeHandleBuilding(
                                                    e,
                                                    subBusinessIndex,
                                                    buildingIndex
                                                  )
                                                }
                                                value={building.buildingName}
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                              />
                                              <p className="text-red-500 text-xs mt-1">
                                                {formErrors.buildingName}
                                              </p>
                                            </div>
                                            {/* Building Address 1 */}
                                            <div className="relative mb-3">
                                              <label
                                                htmlFor="buildingAddress1"
                                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                              >
                                                Address Line 1
                                              </label>
                                              <input
                                                type="text"
                                                name="buildingAddress1"
                                                id="buildingAddress1"
                                                placeholder="Enter Business Address"
                                                onChange={(e) =>
                                                  changeHandleBuilding(
                                                    e,
                                                    subBusinessIndex,
                                                    buildingIndex
                                                  )
                                                }
                                                value={
                                                  building.buildingAddress1
                                                }
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                              />

                                              <p className="text-red-500 text-xs mt-1">
                                                {formErrors.buildingAddress1}
                                              </p>
                                            </div>
                                            {/* Building Address 2 */}
                                            <div className="relative mb-3">
                                              <label
                                                htmlFor="buildingAddress2"
                                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                              >
                                                Address Line 2
                                              </label>
                                              <input
                                                type="text"
                                                name="buildingAddress2"
                                                id="buildingAddress2"
                                                placeholder="Enter Business Address Line 2"
                                                // onChange={changeHandleBuilding}
                                                onChange={(e) =>
                                                  changeHandleBuilding(
                                                    e,
                                                    subBusinessIndex,
                                                    buildingIndex
                                                  )
                                                }
                                                value={
                                                  building.buildingAddress2
                                                }
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                              />

                                              <p className="text-red-500 text-xs mt-1">
                                                {formErrors.buildingAddress2}
                                              </p>
                                            </div>
                                            {/* Building Phone List */}
                                            <div className="relative mb-3">
                                              {building.phoneList.map(
                                                (phone, phoneIndex) => (
                                                  <div key={phoneIndex}>
                                                    <label
                                                      htmlFor="buildingPhone"
                                                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                    >
                                                      Phone no.
                                                    </label>

                                                    <input
                                                      type="text"
                                                      name="buildingPhone"
                                                      id="buildingPhone"
                                                      placeholder="Enter Ph no."
                                                      // onChange={changeHandleBuilding}
                                                      onChange={(e) =>
                                                        changeHandlePhone(
                                                          e,
                                                          subBusinessIndex,
                                                          buildingIndex,
                                                          phoneIndex
                                                        )
                                                      }
                                                      value={
                                                        phone.buildingPhone
                                                      }
                                                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                    />

                                                    <p className="text-red-500 text-xs mt-1">
                                                      {formErrors.buildingPhone}
                                                    </p>
                                                    {/* <div className="absolute top-2 right-2 flex space-x-4">
                                                      <div className="flex items-center">
                                                        {building.phoneList
                                                          .length !== 1 && (
                                                          <button
                                                            className="bg-red-500 text-white py-2 px-4 rounded"
                                                            onClick={() =>
                                                              handleremovePhone(
                                                                subBusinessIndex,
                                                                buildingIndex,
                                                                phoneIndex
                                                              )
                                                            }
                                                          >
                                                            -
                                                          </button>
                                                        )}
                                                      </div>
                                                      <div className="flex items-center">
                                                        {building.phoneList
                                                          .length -
                                                          1 ===
                                                          phoneIndex && (
                                                          <button
                                                            className="bg-green-500 text-white py-2 px-4 rounded"
                                                            onClick={() =>
                                                              handleaddclickPhone(
                                                                subBusinessIndex,
                                                                buildingIndex
                                                              )
                                                            }
                                                          >
                                                            +
                                                          </button>
                                                        )}
                                                      </div>
                                                    </div> */}
                                                  </div>
                                                )
                                              )}
                                            </div>
                                            {/* Building Email List */}
                                            <div className="relative mb-3">
                                              {building.emailList.map(
                                                (email, emailIndex) => (
                                                  <div key={emailIndex}>
                                                    <label
                                                      htmlFor="buildingEmail"
                                                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                    >
                                                      Email
                                                    </label>

                                                    <input
                                                      type="email"
                                                      name="buildingEmail"
                                                      id="buildingEmail"
                                                      placeholder="@gmail.com"
                                                      // onChange={changeHandleBuilding}
                                                      onChange={(e) =>
                                                        changeHandleEmail(
                                                          e,
                                                          subBusinessIndex,
                                                          buildingIndex,
                                                          emailIndex
                                                        )
                                                      }
                                                      value={
                                                        email.buildingEmail
                                                      }
                                                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                    />

                                                    <p className="text-red-500 text-xs mt-1">
                                                      {formErrors.buildingEmail}
                                                    </p>
                                                    {/* <div>
                                                      <div className="absolute top-2 right-2 flex space-x-4">
                                                        <div className="flex items-center">
                                                          {building.emailList
                                                            .length !== 1 && (
                                                            <button
                                                              className="bg-red-500 text-white py-2 px-4 rounded"
                                                              onClick={() =>
                                                                handleremoveEmail(
                                                                  subBusinessIndex,
                                                                  buildingIndex,
                                                                  emailIndex
                                                                )
                                                              }
                                                            >
                                                              -
                                                            </button>
                                                          )}
                                                        </div>
                                                        <div className="flex items-center">
                                                          {building.emailList
                                                            .length -
                                                            1 ===
                                                            emailIndex && (
                                                            <button
                                                              className="bg-green-500 text-white py-2 px-4 rounded"
                                                              onClick={() =>
                                                                handleaddclickEmail(
                                                                  subBusinessIndex,
                                                                  buildingIndex
                                                                )
                                                              }
                                                            >
                                                              +
                                                            </button>
                                                          )}
                                                        </div>
                                                      </div>
                                                    </div> */}
                                                  </div>
                                                )
                                              )}
                                            </div>
                                            {/* Building Postal Code */}
                                            <div className="relative mb-3">
                                              <label
                                                htmlFor="buildingPostalCode"
                                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                              >
                                                Postal Code
                                              </label>
                                              <input
                                                type="number"
                                                name="buildingPostalCode"
                                                id="buildingPostalCode"
                                                placeholder="Enter postalCode"
                                                onChange={(e) =>
                                                  changeHandleBuilding(
                                                    e,
                                                    subBusinessIndex,
                                                    buildingIndex
                                                  )
                                                }
                                                value={
                                                  building.buildingPostalCode
                                                }
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                              />

                                              <p className="text-red-500 text-xs mt-1">
                                                {formErrors.buildingPostalCode}
                                              </p>
                                            </div>
                                            {/* Building City */}
                                            <div className="relative mb-3">
                                              <label
                                                htmlFor="buildingCity"
                                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                              >
                                                City
                                              </label>
                                              <input
                                                type="text"
                                                name="buildingCity"
                                                id="buildingCity"
                                                placeholder="Enter City name"
                                                onChange={(e) =>
                                                  changeHandleBuilding(
                                                    e,
                                                    subBusinessIndex,
                                                    buildingIndex
                                                  )
                                                }
                                                value={building.buildingCity}
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                              />

                                              <p className="text-red-500 text-xs mt-1">
                                                {formErrors.buildingCity}
                                              </p>
                                            </div>
                                            {/* Building State */}
                                            <div className="relative mb-3">
                                              <label
                                                htmlFor="buildingState"
                                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                              >
                                                State
                                              </label>
                                              <input
                                                type="text"
                                                name="buildingState"
                                                id="buildingState"
                                                placeholder="Enter State name"
                                                onChange={(e) =>
                                                  changeHandleBuilding(
                                                    e,
                                                    subBusinessIndex,
                                                    buildingIndex
                                                  )
                                                }
                                                value={building.buildingState}
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                              />

                                              <p className="text-red-500 text-xs mt-1">
                                                {formErrors.buildingState}
                                              </p>
                                            </div>
                                            {/* Building Country */}
                                            <div className="relative mb-3">
                                              <label
                                                htmlFor="buildingCountry"
                                                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                              >
                                                Country
                                              </label>
                                              <input
                                                type="text"
                                                name="buildingCountry"
                                                id="buildingCountry"
                                                placeholder="Enter Country name"
                                                onChange={(e) =>
                                                  changeHandleBuilding(
                                                    e,
                                                    subBusinessIndex,
                                                    buildingIndex
                                                  )
                                                }
                                                value={building.buildingCountry}
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                              />

                                              <p className="text-red-500 text-xs mt-1">
                                                {formErrors.buildingCountry}
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                      <div className="text-center mt-6 mb-3">
                        <button
                          className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-1/2 md:w-1/3 lg:w-1/4 ease-linear transition-all duration-150"
                          type="button"
                          onClick={createHandler}
                        >
                          Register
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AddBusiness;
