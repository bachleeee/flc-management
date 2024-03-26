const express = require("express");
const {
  findAll,
  createExam,
  findOne,
  update,
  deleteExam,
  deleteAllExams,
} = require("../controllers/exam.controller");

const router = express.Router();

router.route("/").get(findAll).delete(deleteAllExams)
router.route("/").post(createExam)
router.route("/:id([0-9a-fA-F]{24})").get(findOne).put(update).delete(deleteExam);


module.exports = router;