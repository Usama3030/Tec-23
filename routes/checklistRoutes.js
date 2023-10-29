const express = require('express');
const router = express.Router();
const checklistController = require('../controllers/checklistController');

router.post('/check', checklistController.createChecklistTypes);
router.get('/check/:checklistTypeId', checklistController.getChecklistTypesById);
router.get('/checkall', checklistController.getAllChecklistTypes);







module.exports = router;