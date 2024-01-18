const db = require("../database");
const jwt = require("jsonwebtoken");

const createUser = (userData) => {
  return new Promise((resolve, reject) => {
    const emailExistsQuery =
      "SELECT COUNT(*) as count FROM users WHERE email = ?";
    db.query(
      emailExistsQuery,
      [userData.email],
      (emailExistsErr, emailExistsResult) => {
        if (emailExistsErr) {
          reject({
            success: false,
            message: emailExistsErr?.sqlMessage || "Internal Server Error",
          });
        } else {
          const emailExists = emailExistsResult[0].count > 0;

          if (emailExists) {
            reject({
              success: false,
              message: "Email already exists. Please choose a different email.",
            });
          } else {
            const insertUserQuery = "INSERT INTO users SET ?";
            db.query(insertUserQuery, userData, (insertErr, result) => {
              if (insertErr) {
                reject({
                  success: false,
                  message: insertErr?.sqlMessage || "Internal Server Error",
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
          }
        }
      }
    );
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

const getAllUsers = async (filename, userId) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM users";
    db.query(
      query,
      (err, result) => {
        if (err) {
          reject({
            success: false,
            message: err?.sqlMessage || "Internal Server Error",
          });
        } else {
          if (result) {
            resolve({
              success: true,
              message: "All users data fetched successfully",
              users : result
            });
          }
        }
      }
    );
  });
};

const getUser = async (userId) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM users WHERE user_id = ?";
    db.query(
      query,
      [userId],
      (err, result) => {
        if (err) {
          reject({
            success: false,
            message: err?.sqlMessage || "Internal Server Error",
          });
        } else {
          if (result) {
            resolve({
              success: true,
              message: "User data fetched successfully",
              user : result
            });
          }
        }
      }
    );
  });
};

const updateUser = async (dataToUpdate, userId) => {
  return new Promise((resolve, reject) => {
    const updateQuery = "UPDATE users SET ? WHERE user_id = ?";
    db.query(updateQuery, [dataToUpdate, userId], (err, updateResult) => {
      if (err) {
        reject({
          success: false,
          message: err?.sqlMessage || "Internal Server Error",
        });
      } else {
        const getUserQuery = "SELECT * FROM users WHERE user_id = ?";
        db.query(getUserQuery, [userId], (fetchErr, fetchResult) => {
          if (fetchErr) {
            reject({
              success: false,
              message: fetchErr?.sqlMessage || "Internal Server Error",
            });
          } else {
            if (fetchResult && fetchResult.length > 0) {
              const updatedUser = fetchResult[0];
              resolve({
                success: true,
                message: "User updated successfully",
                user: updatedUser,
              });
            } else {
              reject({
                success: false,
                message: "User data not found after update",
              });
            }
          }
        });
      }
    });
  });
};

const deleteUser = async (userId) => {
  return new Promise((resolve, reject) => {
    const query = "DELETE FROM users WHERE user_id = ?";
    db.query(
      query,
      [userId],
      (err, result) => {
        if (err) {
          reject({
            success: false,
            message: err?.sqlMessage || "Internal Server Error",
          });
        } else {
          if (result) {
            resolve({
              success: true,
              message: "User data deleted successfully",
              user : result
            });
          }
        }
      }
    );
  });
};


module.exports = { createUser, uploadImage, getAllUsers, getUser, updateUser, deleteUser };
