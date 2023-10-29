const mongoose = require("mongoose");

const buildingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: [String] },
  email: { type: [String] },
  location: { type: String, required: true },
  parentSubbusinesses: { type: [mongoose.Types.ObjectId] },
  Business: { type: mongoose.Types.ObjectId },
});

const BuildingModel = mongoose.model("Buildings", buildingSchema);

module.exports = BuildingModel;
