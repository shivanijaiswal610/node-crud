const db = require("../database");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${ext}`);
  },
});

const upload = multer({ storage: storage });

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

const uploadImage = async (filename, userId) => {
  return new Promise((resolve, reject) => {
    const imagePath = `/uploads/${filename}`;
    const query = "INSERT INTO user_profile_images SET ?";
    db.query(
      query,
      {
        image_path: imagePath,
        user_id: userId,
      },
      (err, result) => {
        if (err) {
          reject({
            success: false,
            message: err?.sqlMessage || "Internal Server Error",
          });
        } else {
          if (result && result?.insertId) {
            resolve({
              success: true,
              message: "Image uploaded successfully",
              imageUrl: `/uploads/${filename}`,
            });
          }
        }
      }
    );
  });
};

module.exports = { createUser, uploadImage };
