const ChecklistTypesModel = require("../models/checklist");
const UserModel = require("../models/users");
const UserChecklistModel = require("../models/userChecklist");
const BusinessModel = require("../models/business");
// send to frontend to display in option
exports.getAssign = async (req, res) => {
  try {
    const usersData = await UserModel.find({}, "name _id");
    const checklistData = await ChecklistTypesModel.find({}, "type _id").exec();
    const businessData = await BusinessModel.find({}, "name _id").exec();

    const buildingData = [];

    // Assuming your business model is defined and available as BusinessModel
    const businesses = await BusinessModel.find(
      {},
      "name subbusinesses"
    ).exec();

    businesses.forEach((business) => {
      business.subbusinesses.forEach((subbusiness) => {
        subbusiness.buildings.forEach((building) => {
          const buildingInfo = {
            name: building.name,
            _id: building._id,
          };
          buildingData.push(buildingInfo);
        });
      });
    });

    const data = {
      usersData,
      checklistData,
      businessData,
      buildingData,
    };

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
};

//get value user seected from frontend

// exports.getAssignValue = async (req, res) => {
//     try {
//         const { userId, dueDate, checklistTypeID, AssignedUserId, businessID, buildingID, Status } = req.body;
//         console.log("Selected User Name:", userId);
//         console.log("Selected Checklist Type:", checklistTypeID);
//         console.log("Selected Due Date:", dueDate);
//         console.log("Selected user:", AssignedUserId);
//         console.log("Selected business:", businessID);
//         console.log("Selected business:", buildingID);
//         console.log("Selected ststua:", Status);

//       } catch (error) {
//         console.log("Error in inserting new Document");
//         res.status(500).json({ message: "Internal server Error" });
//       }
// }

// exports.getAssignValue = async (req, res) => {
//     try {
//         const { userId, dueDate, checklistTypeID } = req.body;
//         console.log("Selected User Name:", userId);
//         console.log("Selected Checklist Type:", checklistTypeID);
//         console.log("Selected Due Date:", dueDate);
//         const chechklisttype = await ChecklistTypesModel.findById(checklistTypeID);
//         if (!checklistTypeID) {
//             res.send("no type");
//             console.log("not match");
//           }
//           const newchecklisttype = new UserChecklistModel({
//             userID: null,
//             businessID: null,
//             buildingID: null,
//             checklistTypeID: checklistTypeID,
//             // sections: chechklisttype.sections,
//             sections: chechklisttype.sections.map((section) => ({
//               title: section.title,
//               seqNo: section.seqNo,
//               _id: section._id,

//               questions: section.questions.map((question) => ({
//                 title: question.title,
//                 _id: question._id,

//                 answerOptions: [],
//               })),
//             })),
//             updatedAt: Date.now(),
//             createdAt: Date.now(),
//             score: 0,
//             dueDate: dueDate,
//             AssignedUserId: userId,
//             Status: "Pending"
//           });
//           console.log("saving.......");
//           await newchecklisttype.save();
//           const checklistId = newchecklisttype._id;
//           console.log("New Document added Successfully", checklistId);
//           return res
//             .status(200)
//             .json({ message: "New Document added Successfully", checklistId });
//         } catch (error) {
//         console.log("Error in inserting new Document");
//         res.status(500).json({ message: "Internal server Error" });
//       }
// }

exports.getAssignValue = async (req, res) => {
  try {
    const {
      userId,
      dueDate,
      checklistTypeID,
      AssignedUserId,
      businessID,
      buildingID,
      Status,
    } = req.body;
    console.log("Selected User Name:", userId);
    console.log("Selected Checklist Type:", checklistTypeID);
    console.log("Selected Due Date:", dueDate);
    console.log("Selected user:", AssignedUserId);
    console.log("Selected business:", businessID);
    console.log("Selected business:", buildingID);
    console.log("Selected ststua:", Status);

    // Find the checklist type by ID
    const checklistType = await ChecklistTypesModel.findById(checklistTypeID);

    if (!checklistType) {
      res.status(400).json({ message: "Checklist type not found" });
    }

    // Create a new UserChecklist document
    const newUserChecklist = new UserChecklistModel({
      userID: userId, // You may need to replace this with the actual user ID
      businessID: businessID, // Replace with the appropriate ID
      buildingID: buildingID, // Replace with the appropriate ID
      checklistTypeID: checklistTypeID,
      sections: checklistType.sections.map((section) => ({
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
      dueDate: dueDate,
      AssignedUserId: AssignedUserId,
      Status: Status,
    });

    await newUserChecklist.save();

    const checklistId = newUserChecklist._id;
    console.log("New Document added Successfully", checklistId);

    return res
      .status(200)
      .json({ message: "New Document added Successfully", checklistId });
  } catch (error) {
    console.error("Error in inserting new Document", error);
    res.status(500).json({ message: "Internal server Error" });
  }
};

exports.updateUserChecklist = async (req, res) => {
  try {
    const { updatedValues } = req.body;
    const { checklistId } = req.params;
    console.log("Updating User Checklist with ID:", checklistId);
    console.log("Updated Values:", updatedValues);
    console.log("Request Body:", req.body);

    // Check if the checklistId is valid
    const existingChecklist = await UserChecklistModel.findById(checklistId);

    if (!existingChecklist) {
      return res.status(404).json({ message: "User Checklist not found" });
    }

    // Update the existing checklist with new values
    Object.assign(existingChecklist, req.body);

    // Save the updated checklist
    await existingChecklist.save();

    console.log("Document updated successfully");

    return res
      .status(200)
      .json({ message: "Document updated successfully", checklistId });
  } catch (error) {
    console.error("Error in updating Document", error);
    res.status(500).json({ message: "Internal server Error" });
  }
};
