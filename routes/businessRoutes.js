const express = require('express');
const router = express.Router();
const businessController = require('../controllers/businessController');



router.post('/business', businessController.createBusiness);
router.get('/business/:businessId', businessController.getBusinessById);


module.exports = router;
