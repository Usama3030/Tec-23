const mongoose = require("mongoose");

const checklistTypesSchema = new mongoose.Schema({
  type: { type: String, required: true },
  rangeConfigrations: [
    {
      min: { type: Number, required: true },
      max: { type: Number, required: true },
      color: { type: String, required: true },
    },
  ],
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
              type: { type: String, required: true },
              seqNo: { type: Number, required: true },
              parentOption: { type: String, default: null },
              score: { type: Number, default: 0 },
            },
          ],
        },
      ],
    },
  ],
});

const ChecklistTypesModel = mongoose.model(
  "checklistTypes",
  checklistTypesSchema
);

module.exports = ChecklistTypesModel;
