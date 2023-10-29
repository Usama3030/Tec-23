const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// User Routes


router.post('/signup', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/verify/:token', userController.verifyUser);


module.exports = router;
