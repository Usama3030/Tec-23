const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");

// User Routes

router.get("/assign", dashboardController.getAssign);
router.post("/savetask", dashboardController.getAssignValue);
router.put("/edittask/:checklistId", dashboardController.updateUserChecklist);

module.exports = router;
