const express = require("express");
const router = express.Router();

const UserController = require('../controllers/userController');


// GET ALL USERS
router.get("/", UserController.getAllUsers);

module.exports = router;
