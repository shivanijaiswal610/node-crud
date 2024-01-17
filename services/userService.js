const db = require("../database");
const jwt = require('jsonwebtoken');

const createUser = (userData) => {
  return new Promise((resolve, reject) => {
    const query = "INSERT INTO users SET ?";
    db.query(query, userData, (err, result) => {
      if (err) {
        reject({
          success: false,
          message: err?.sqlMessage || "Internal Server Error",
        });
      } else {
        const user = { id: result.insertId, ...userData };
        const token = jwt.sign(
          { userId: user.id, username: user.username },
          process.env.JWT_SECRET_TOKEN,
          {
            expiresIn: "1h",
          }
        );
        resolve({
          success: true,
          message: "User Created Successfully!",
          user,
          token,
        });
      }
    });
  });
};

module.exports = { createUser };
