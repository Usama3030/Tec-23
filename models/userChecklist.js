const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userChecklistSchema = new Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  businessID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Businesses",
    required: true,
  },
  buildingID: {
    type: mongoose.Schema.Types.ObjectId,
    // ref: "Buildings",
    // ref: "Businesses",
    required: true,
  },
  checklistTypeID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "checklistTypes",
    required: true,
  },
  sections: [
    {
      title: { type: String, required: true },
      seqNo: { type: Number, required: true },
      questions: [
        {
          title: { type: String, required: true },
          score: { type: Number, default: 0 },
          answerOptions: [
            {
              detail: { type: Array },
              title: { type: String },
              type: { type: String },
              parentOption: { type: String, default: null },
              score: { type: Number, default: 0 },
              note: { type: String },
            },
          ],
        },
      ],
    },
  ],
  updatedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
  score: { type: Number },
});

const UserChecklistModel = mongoose.model("userChecklist", userChecklistSchema);

module.exports = UserChecklistModel;
