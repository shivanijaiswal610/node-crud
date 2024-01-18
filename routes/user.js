const express = require("express");
const router = express.Router();
const validateReq = require("../validateSchema");
const authenticate = require("../middleware/authenticate");
const {
  createUser,
  uploadImage,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser
} = require("../controllers/userController");
const upload = require("../utils/uploadProfile");

router.post("/create", validateReq, createUser);
router.post(
  "/upload",
  authenticate,
  upload.single("profileImage"),
  uploadImage
);
router.get("/all", getAllUsers);
router.get("/", authenticate, getUser);
router.put("/update", authenticate, validateReq, updateUser);
router.delete("/delete", authenticate, deleteUser);


module.exports = router;
