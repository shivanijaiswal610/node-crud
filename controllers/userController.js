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

module.exports = { createUser };
