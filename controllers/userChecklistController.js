const UserChecklistModel = require("../models/userChecklist");
const BusinessModel = require("../models/business");
const UserModel = require("../models/users"); // Import the User model
const BuildingModel = require("../models/building");
const ChecklistTypesModel = require("../models/checklist");
const ChecklistTypeModel = require("../models/checklist");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const mongoose = require("../db/db");
const { use } = require("../routes/userChecklistRoutes");

// List page sending Data
const getUserChecklists = async (req, res) => {
  try {
    const userChecklists = await UserChecklistModel.find()
      .populate("businessID", "name")
      // .populate("buildingID", "name")

      .populate({
        path: "buildingID",
        select: "name",
        populate: {
          path: "subbusinesses.buildings",
          model: "Businesses",
          select: "name",
        },
      })
      .populate("userID", "name")
      .populate("AssignedUserId", "name")
      .populate("checklistTypeID", "type _id rangeConfigrations")
      .select("businessID buildingID userID AssignedUserId createdAt updatedAt score Status dueDate checklistTypeID ");

    res.json(userChecklists);
    // console.log(userChecklists);
  } catch (error) {
    console.error("Error fetching user checklists:", error);
    res.status(500).json({ error: "Error fetching user checklists" });
  }
};

// update the Status value in list page 
const updateUserChecklistStatus = async (req, res) => {
  try {
      const { Status } = req.body;
      const { checklistId } = req.params;
      console.log("Updating User Checklist Status with ID:", checklistId);
      console.log("Updated Status:", Status);

      // Check if the checklistId is valid
      const existingChecklist = await UserChecklistModel.findById(checklistId);

      if (!existingChecklist) {
          return res.status(404).json({ message: "User Checklist not found" });
      }

      // Update only the Status field
      existingChecklist.Status = Status;

      // Save the updated checklist
      await existingChecklist.save();

      console.log("Status updated successfully");

      return res.status(200).json({ message: "Status updated successfully", checklistId });
  } catch (error) {
      console.error("Error in updating Status", error);
      res.status(500).json({ message: "Internal server Error" });
  }
};



// create checklist page according to business, building, checklistType, and User
const compareUserChecklists = async (req, res) => {
  //const { name } = req.body;
  const { name } = req.query;
  //  const { name } = req.params;

  try {
    const user = await UserModel.findOne({ name })
      .populate({
        path: "businesses.business",
        select: "name _id",
      })
      .exec();

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const businessNames = user.businesses.map((business) => ({
      name: business.business.name,
      id: business.business._id,
    }));

    const buildingData = [];
    for (const business of businessNames) {
      const buildingAssociateBusiness = await BusinessModel.findById(
        business.id
      )
        .populate({
          path: "subbusinesses.buildings",
          select: "name _id", // Include only the name and _id fields for buildings
        })
        .exec();
      if (buildingAssociateBusiness) {
        const buildings = buildingAssociateBusiness.subbusinesses.map(
          (subbusiness) => subbusiness.buildings // Corrected variable name here
        );

        // Flatten the array of buildings (if it's nested)
        const flattenedBuildings = [].concat(...buildings);

        // Push the building data into the result array
        buildingData.push({
          businessName: business.name,
          buildings: flattenedBuildings,
        });
      }
    }
    const checklistData = await ChecklistTypesModel.find({}, "type _id").exec();

    res.json({ userExists: true, businessNames, buildingData, checklistData });
  } catch (error) {
    console.error("Error fetching user businesses:", error);
    res.status(500).json({ error: "Error fetching user businesses" });
  }
};

// update the Status value in list page 
const updateUserAlreadyChecklistsData = async (req, res) => {
  try {
      const { Status } = req.body;
      const { checklistId } = req.params;
      console.log("Updating User Checklist Status with ID:", checklistId);
      console.log("Updated Status:", Status);

      // Check if the checklistId is valid
      const existingChecklist = await UserChecklistModel.findById(checklistId);

      if (!existingChecklist) {
          return res.status(404).json({ message: "User Checklist not found" });
      }

      // Update only the Status field
      existingChecklist.Status = Status;

      // Save the updated checklist
      await existingChecklist.save();

      console.log("Status updated successfully");

      return res.status(200).json({ message: "Status updated successfully", checklistId });
  } catch (error) {
      console.error("Error in updating Status", error);
      res.status(500).json({ message: "Internal server Error" });
  }
};

// send already inserted data from userChecklist
// const getUserAlreadyChecklistsData = async (req, res) => {

//   try {
//     const checklist = await UserChecklistModel.findById(req.params.id);

//     if (!checklist) {
//       return res.status(404).json({ error: "Checklist not found" });
//     }


//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };
const getUserAlreadyChecklistsData = async (req, res) => {
  try {
    const checklistId = req.params.id;
    const checklist = await UserChecklistModel.findById(checklistId);

    if (!checklist) {
      return res.status(404).json({ error: "Checklist not found" });
    }

    const {
      userID,
      businessID,
      buildingID,
      checklistTypeID,
      sections,
      updatedAt,
      createdAt,
      score,
      dueDate,
      AssignedUserId,
      Status,
    } = checklist;

    const responseData = {
      userID,
      businessID,
      buildingID,
      checklistTypeID,
      sections,
      updatedAt,
      createdAt,
      score,
      dueDate,
      AssignedUserId,
      Status,
    };

    res.json(responseData);
    console.log(responseData)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// get checklist user selected with all ids and checklist structure
const getParticularChecklist = async (req, res) => {
  try {
    console.log("getParticularchecklist");
    const { userID, businessID, buildingID, checklistTypeID } = req.body;
    console.log("userId come");
    const chechklisttype = await ChecklistTypesModel.findById(checklistTypeID);
    if (!checklistTypeID) {
      res.send("no type");
      console.log("not match");
    }
    const newchecklisttype = new UserChecklistModel({
      userID: userID,
      businessID: businessID,
      buildingID: buildingID,
      checklistTypeID: checklistTypeID,
      // sections: chechklisttype.sections,
      sections: chechklisttype.sections.map((section) => ({
        title: section.title,
        seqNo: section.seqNo,
        _id: section._id,

        questions: section.questions.map((question) => ({
          title: question.title,
          _id: question._id,

          answerOptions: [],
        })),
      })),
      updatedAt: Date.now(),
      createdAt: Date.now(),
      score: 0,
      Status: "Progress",
    });
    console.log("saving.......");
    await newchecklisttype.save();
    const checklistId = newchecklisttype._id;
    console.log("New Document added Successfully", checklistId);
    return res
      .status(200)
      .json({ message: "New Document added Successfully", checklistId });
  } catch (error) {
    console.log("Error in inserting new Document");
    res.status(500).json({ message: "Internal server Error" });
  }
};

// send data for checklist to save in userChecklist schema
const getUserChecklistsData = async (req, res) => {
  try {
    const checklist = await ChecklistTypesModel.findById(req.params.id);

    if (!checklist) {
      return res.status(404).json({ error: "Checklist not found" });
    }
    // const totalScore = checklist.sections.reduce((acc1, section) => {
    //   return (
    //     acc1 +
    //    (section.questions
    //     ? section.questions.reduce((acc2, option) => {
    //       return acc2 + (option.score || 0);
    //      }, 0)
    //     : 0)
    //   );
    // }, 0);
    const totalScore = checklist.sections.reduce((acc1, section) => {
      return (
        acc1 +
        (section.questions
          ? section.questions.reduce((acc2, question) => {
            return acc2 + (question.score || 0);
           }, 0)
          : 0)
      );
    }, 0);
    const formattedChecklist = {
      _id: checklist._id,
      type: checklist.type,
      sections: checklist.sections.map((section) => ({
        title: section.title,
        seqNo: section.seqNo,
        questions: section.questions.map((question) => ({
          title: question.title,
          _id: question._id,
          answerOptions: question.answerOptions?.sort(
            (a, b) => a.seqNo - b.seqNo
          ),
        })),
      })),
      totalScore, // Include the total score
    };

    res.json(formattedChecklist);
    // console.log(formattedChecklist)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//get all values user inserted and selected for checklist
const uploadParticularChecklist = async (req, res) => {
  const {
    checklistId,
    selectedRadioValues,
    inputValues,
    dateInputValues,
    multipleInputValues,
    multiValues,
    checklistTotalScore,
    Status
  } = req.body;

  try {
    console.log("Received checklistId:", checklistId);
    console.log("Received selected radio values:", selectedRadioValues);
    console.log("Received input values:", inputValues);
    console.log("Received Date values:", dateInputValues);
    console.log("Received annunciators values:", multipleInputValues);
    console.log("Received multiple values:", multiValues);
    console.log("Received Score values:", checklistTotalScore);
    console.log("Received Score values:", Status);

    const existingDocument = await UserChecklistModel.findOne({
      _id: checklistId,
    });

    if (!existingDocument) {
      return res.status(404).json({ error: "Checklist not found" });
    }

    // console.log("inside update");

    existingDocument.sections.forEach((section) => {
      section.questions.forEach((question) => {
        const questionId = question._id.toHexString();
        let answerOptionId;

        if (selectedRadioValues.hasOwnProperty(questionId)) {
          // Add a new answer option with title and seqNo
          question.answerOptions =
            selectedRadioValues[questionId]?.answerOptions;
            console.log(" 369 radio answerOptions", question.answerOptions);
            // Update total score based on the scores of the new answer options
  question.answerOptions.forEach((option) => {
    if (option && option.score !== undefined) {
      existingDocument.score += option.score;
    }
  });

        } else if (inputValues.hasOwnProperty(questionId)) {
          // answerOptionId = inputValues[questionId]._id;
          question.answerOptions = inputValues[questionId]?.answerOptions;
          console.log("380 Input answerOptions", question.answerOptions);
            // Update total score based on the scores of the new answer options
  question.answerOptions.forEach((option) => {
    if (option && option.score !== undefined) {
      existingDocument.score += option.score;
    }
  });
        } else if (dateInputValues.hasOwnProperty(questionId)) {
          question.answerOptions = dateInputValues[questionId].answerOptions;
          console.log("389 Date answerOptions", question.answerOptions);
            // Update total score based on the scores of the new answer options
  question.answerOptions.forEach((option) => {
    if (option && option.score !== undefined) {
      existingDocument.score += option.score;
    }
  });
        } 
        else if (multipleInputValues.hasOwnProperty(questionId)) {
          // console.log("Question ID:", questionId);
          // console.log("Received Multiple Input Values:", multipleInputValues[questionId]);
        
          const receivedData = multipleInputValues[questionId];
          // console.log("receivedData", receivedData);
        
          if (receivedData) {
            // console.log("inside if statement.");
            
              question.answerOptions = [];
            
        
            // Iterate over each received item 
            receivedData.forEach((dataItem) => {
              
              const detailObject = {
                detail: dataItem,
              };
        
              question.answerOptions.push(detailObject);
            });
        
            console.log(" inside detail of answerOptions", question.answerOptions);
          } else {
            console.log("Received data Invalid properties.");
          }
        }
       
         else if (multiValues.hasOwnProperty(questionId)) {
          // console.log("Question ID:", questionId);
          // console.log("Received Multiple Values:", multiValues[questionId]);
        
          const receivedData = multiValues[questionId];
          // console.log("receivedData", receivedData);
        
          if (receivedData) {
            // console.log("inside if statement.");
        
            // Initialize the answerOptions is empty.
           
              question.answerOptions = [];
            
        
            // Create an object detail:
            const detailObject = {
              detail: receivedData[questionId],
            };
        
            question.answerOptions.push(detailObject);
        
            console.log("Inside MultiValue saving", question.answerOptions);
          } else {
            console.log("Received data Invalid properties.");
          }
        }      
         else {
          question.answerOptions = [];
          // console.log("else statement");
        }
      });
    });

    const calculateTotalScore = (existingDocument) => {
      let totalScore = 0;
    
      existingDocument.sections.forEach((section) => {
        section.questions.forEach((question) => {
          question.answerOptions.forEach((option) => {
            if (option && option.score !== undefined) {
              totalScore += option.score;
            }
          });
        });
      });
    
      return totalScore;
    };
    
   
    const totalScore = calculateTotalScore(existingDocument);
    
    console.log("Total Score:", totalScore);
    
    // const checklistTotalScoreFromFrontend = req.body.checklistTotalScore;
    // Calculate the %
const percentage = (totalScore / checklistTotalScore) * 100;

console.log("Checklist Total Score from Frontend:", checklistTotalScore);
console.log("Percentage:", percentage);


existingDocument.score = percentage;
existingDocument.Status = Status;

    // Save the updated document
    const savedDocument = await existingDocument.save();

    // console.log("User data saved successfully", JSON.stringify(savedDocument));

    res.status(200).json({ message: "User data saved successfully" });
  } catch (error) {
    console.error("Error saving user data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getUserChecklists,
  compareUserChecklists,
  getParticularChecklist,
  uploadParticularChecklist,
  getUserChecklistsData,
  updateUserChecklistStatus,
  getUserAlreadyChecklistsData,
  updateUserAlreadyChecklistsData,
};



