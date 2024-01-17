const express = require("express");
const router = express.Router();
const validateReq = require("../validateSchema");
const authenticate = require("../middleware/authenticate");
const { createUser, uploadImage } = require('../controllers/userController')
const upload = require('../utils/uploadProfile')

router.post("/create", validateReq, createUser);
router.post("/upload", authenticate, upload.single('profileImage'), uploadImage);

module.exports = router;
