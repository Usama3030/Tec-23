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
      <div className={businessStyle.business}>
        <form>
          <h1>Add Details</h1>
          <div className={businessStyle.business_body}>
            <div className={businessStyle.headings}>
              <h2>Create Business</h2>
            </div>
            <div className={businessStyle.option1}>
              <label htmlFor="name">Business Name</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter Business Name"
                onChange={changeHandler}
                value={business.name}
              />
              <p className={businessStyle.error}>{formErrors.name}</p>
            </div>
          </div>
          {subBusinessList.map((subBusiness, subBusinessIndex) => (
            <div key={subBusinessIndex}>
              <div className={businessStyle.subBusiness}>
                <div className={businessStyle.headings}>
                  <h2>Create SubBusiness</h2>
                </div>
                <div className={businessStyle.ar_button}>
                  <div className={businessStyle.remove_button}>
                    {subBusinessList.length !== 1 && (
                      <button
                        onClick={() =>
                          handleremoveSubBusiness(subBusinessIndex)
                        }
                      >
                        -
                      </button>
                    )}
                  </div>
                  <div className={businessStyle.add_button}>
                    {subBusinessList.length - 1 === subBusinessIndex && (
                      <button onClick={handleaddclickSubBusiness}>+</button>
                    )}
                  </div>
                </div>
                <div className={businessStyle.option}>
                  <label htmlFor="subbusinessName">SubBusiness Name</label>
                  {/* htmlFor={`subBusinessList[${subBusinessIndex}].subbusinessName`} */}
                  {/* name={`subBusinessList[${subBusinessIndex}].subbusinessName`} */}
                  <input
                    type="text"
                    name="subbusinessName"
                    id="subbusinessName"
                    placeholder="Enter SubBusiness Name"
                    // onChange={changeHandleSubBusiness}
                    onChange={(e) =>
                      changeHandleSubBusiness(e, subBusinessIndex)
                    }
                    value={subBusiness.subbusinessName}
                  />
                  <p className={businessStyle.error}>
                    {formErrors.subbusinessName}
                  </p>
                </div>
                <div className={businessStyle.building}>
                  {subBusiness.buildingList.map((building, buildingIndex) => (
                    <div key={buildingIndex}>
                      <div className={businessStyle.ar_button}>
                        <div className={businessStyle.remove_button}>
                          {subBusiness.buildingList.length !== 1 && (
                            <button
                              onClick={() =>
                                handleremoveBuilding(buildingIndex)
                              }
                            >
                              -
                            </button>
                          )}
                        </div>
                        <div className={businessStyle.add_button}>
                          {subBusiness.buildingList.length - 1 ===
                            buildingIndex && (
                            <button
                              type="button"
                              onClick={() =>
                                handleaddclickBuilding(subBusinessIndex)
                              }
                            >
                              +
                            </button>
                          )}
                        </div>
                      </div>
                      <div className={businessStyle.option}>
                        <label htmlFor="buildingName">Place</label>
                        {/* htmlFor={`subBusinessList[${subBusinessIndex}].buildingList[${buildingIndex}].buildingName`} */}
                        {/* name={`subBusinessList[${subBusinessIndex}].buildingList[${buildingIndex}].buildingName`} */}
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
                        />
                        <p className={businessStyle.error}>
                          {formErrors.buildingName}
                        </p>
                      </div>
                      <div className={businessStyle.option}>
                        <label htmlFor="buildingAddress1">Address line 1</label>
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
                          value={building.buildingAddress1}
                        />
                        <p className={businessStyle.error}>
                          {formErrors.buildingAddress1}
                        </p>
                      </div>
                      <div className={businessStyle.option}>
                        <label htmlFor="buildingAddress2">Address line 2</label>
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
                          value={building.buildingAddress2}
                        />
                        <p className={businessStyle.error}>
                          {formErrors.buildingAddress2}
                        </p>
                      </div>
                      <div className={businessStyle.phoneList}>
                        {building.phoneList.map((phone, phoneIndex) => (
                          <div key={phoneIndex}>
                            <div className={businessStyle.option}>
                              <label htmlFor="buildingPhone">Phone no.</label>
                              <input
                                type="number"
                                name="buildingPhone"
                                id="buildingPhone"
                                placeholder="Enter Building Phone"
                                onChange={(e) =>
                                  changeHandlePhone(
                                    e,
                                    subBusinessIndex,
                                    buildingIndex,
                                    phoneIndex
                                  )
                                }
                                value={phone.buildingPhone}
                              />
                              <p className={businessStyle.error}>
                                {formErrors.buildingPhone}
                              </p>
                            </div>
                            <div>
                              <div className={businessStyle.ar_button}>
                                <div className={businessStyle.remove_button}>
                                  {building.phoneList.length !== 1 && (
                                    <button
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
                                <div className={businessStyle.add_button}>
                                  {building.phoneList.length - 1 ===
                                    phoneIndex && (
                                    <button
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
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className={businessStyle.emailList}>
                        {building.emailList.map((email, emailIndex) => (
                          <div key={emailIndex}>
                            <div className={businessStyle.option}>
                              <label htmlFor="buildingEmail">Email</label>
                              <input
                                type="email"
                                name="buildingEmail"
                                id="buildingEmail"
                                placeholder="@gmail.com"
                                onChange={(e) =>
                                  changeHandleEmail(
                                    e,
                                    subBusinessIndex,
                                    buildingIndex,
                                    emailIndex
                                  )
                                }
                                value={email.buildingEmail}
                              />
                              <p className={businessStyle.error}>
                                {formErrors.buildingEmail}
                              </p>
                            </div>
                            <div>
                              <div className={businessStyle.ar_button}>
                                <div className={businessStyle.remove_button}>
                                  {building.emailList.length !== 1 && (
                                    <button
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
                                <div className={businessStyle.add_button}>
                                  {building.emailList.length - 1 ===
                                    emailIndex && (
                                    <button
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
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className={businessStyle.option}>
                        <label htmlFor="buildingPostalCode">Postal code</label>
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
                          value={building.buildingPostalCode}
                        />
                        <p className={businessStyle.error}>
                          {formErrors.buildingPostalCode}
                        </p>
                      </div>
                      <div className={businessStyle.option}>
                        <label htmlFor="buildingCity">City</label>
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
                        />
                        <p className={businessStyle.error}>
                          {formErrors.buildingCity}
                        </p>
                      </div>
                      <div className={businessStyle.option}>
                        <label htmlFor="buildingState">State</label>
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
                        />
                        <p className={businessStyle.error}>
                          {formErrors.buildingState}
                        </p>
                      </div>
                      <div className={businessStyle.option}>
                        <label htmlFor="buildingCountry">Country</label>
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
                        />
                        <p className={businessStyle.error}>
                          {formErrors.buildingCountry}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
          <div className={businessStyle.business_body}>
            <button
              className={businessStyle.button_common}
              onClick={createHandler}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default AddBusiness;
