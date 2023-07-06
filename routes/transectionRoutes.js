const express = require("express");
const {
  addTransection,
  getAllTransection,
  editTransection,
  deleteTransection,
} = require("../controllers/transectionCtrl");
const authMiddleware = require("../middlewares/auth");
//router object
const router = express.Router();

//routes
//add transection POST MEthod
router.post("/add-transection", authMiddleware, addTransection);
//Edit transection POST MEthod
router.post("/edit-transection", authMiddleware, editTransection);
//Delete transection POST MEthod
router.post("/delete-transection", authMiddleware, deleteTransection);

//get transections
router.post("/get-transection", authMiddleware, getAllTransection);

module.exports = router;
