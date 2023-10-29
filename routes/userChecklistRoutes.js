const express = require("express");
const router = express.Router();
const userChecklistController = require("../controllers/userChecklistController");

router.get("/compare", userChecklistController.compareUserChecklists);
router.get("/userchecklists", userChecklistController.getUserChecklists);
router.post("/newdoc", userChecklistController.getParticularChecklist);
router.post("/upload", userChecklistController.uploadParticularChecklist);
router.get(
  "/getChecklistData/:id",
  userChecklistController.getUserChecklistsData
);

module.exports = router;
