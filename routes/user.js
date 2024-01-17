const express = require("express");
const router = express.Router();
const validateReq = require("../validateSchema");
const authenticate = require("../middleware/authenticate");
const { createUser } = require('../controllers/userController')

router.post("/create", validateReq, createUser);

module.exports = router;
