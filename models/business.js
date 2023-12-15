const mongoose = require("mongoose");

const businessSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subbusinesses: {
    type: [
      {
        name: { type: String, required: true },
        buildings: {
          type: [
            {
              name: { type: String, required: true },
              phone: { type: [String] },
              email: { type: [String] },
              addressLine1: { type: String },
              addressLine2: { type: String },
              postal_code: { type: String },
              city: { type: String },
              state: { type: String },
              country: { type: String },
            },
          ],
        },
      },
    ],
  },
});

const BusinessModel = mongoose.model("Businesses", businessSchema);

module.exports = BusinessModel;

// const businessSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   subbusinesses: {
//     type: [
//       {
//         name: { type: String, required: true },
//         buildings: [
//           {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'Building', // Referencing the Building model
//           },
//         ],
//       },
//     ],
//   },
// });
