const express = require("express");
const router = express.Router();
const validateReq = require("../validateSchema");

router.post("/create", validateReq, (req, res) => {
});

module.exports = router;
