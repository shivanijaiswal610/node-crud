const userService = require("../services/userService");

const createUser = async function (req, res) {
  try {
    const userData = req.body;
    const resp = await userService.createUser(userData);
    if (resp && resp?.success) {
      res.status(200).json(resp);
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error?.message || "Internal Server Error",
    });
  }
};

const uploadImage = async function (req, res) {
  try {
    const userId = req?.user?.userId;
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No image uploaded" });
    }
    const uploadImageResp = await userService.uploadImage(
      req.file.filename,
      userId
    );
    if (uploadImageResp && uploadImageResp?.success) {
      res.status(200).json(uploadImageResp);
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error?.message || "Internal Server Error",
    });
  }
};

const getAllUsers = async function (req, res) {
  try {
    const resp = await userService.getAllUsers();
    if (resp && resp?.success) {
      res.status(200).json(resp);
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error?.message || "Internal Server Error",
    });
  }
};

const getUser = async function (req, res) {
  try {
    const userId = req?.user?.userId;
    const resp = await userService.getUser(userId);
    if (resp && resp?.success) {
      res.status(200).json(resp);
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error?.message || "Internal Server Error",
    });
  }
};

const updateUser = async function (req, res) {
  try {
    const userId = req?.user?.userId;
    const dataToUpdate = req.body;
    const resp = await userService.updateUser(dataToUpdate, userId);
    if (resp && resp?.success) {
      res.status(200).json(resp);
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error?.message || "Internal Server Error",
    });
  }
};

module.exports = { createUser, uploadImage, getAllUsers, getUser, updateUser };
