const express = require('express');
const router = express.Router();
const buildingController = require('../controllers/buildingController');


router.post('/building', buildingController.createBuilding);
router.get('/building/:buildingId', buildingController.getBuildingById);






module.exports = router;