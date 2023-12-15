require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 8000;
const userRoutes = require("./routes/userRoutes");
const businessRoutes = require("./routes/businessRoutes");
const buildingRoutes = require("./routes/buildingRoutes");
const checklistTypesRoutes = require("./routes/checklistRoutes");
const userChecklistRoutes = require("./routes/userChecklistRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const mongoose = require("./db/db");
const cors = require("cors");

app.use(cors());

app.use(bodyParser.json());

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use("/api", userRoutes);
app.use("/api2", businessRoutes);
app.use("/api3", buildingRoutes);
app.use("/api4", checklistTypesRoutes);
app.use("/api5", userChecklistRoutes);
app.use("/api6", dashboardRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${port}`);
});
