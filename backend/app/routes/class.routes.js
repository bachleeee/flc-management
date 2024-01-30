const express = require("express");
const {
  findAll,
  createClass,
  findOne,
  update,
  deleteClass,
  createClassSchedule,
  updateSchedule,
  getClassByCourse,
  findOneByName,
  addToClass,
  findArrayClassById
} = require("../controllers/class.controller");

const router = express.Router();

router.route("/").get(findAll)
router.route("/:id([0-9a-fA-F]{24})").post(createClass)
router.route("/:id([0-9a-fA-F]{24})").get(findOne).put(update).delete(deleteClass);

router.route("/findArrayClassById").get(findArrayClassById)

router.route("/:name").get(findOneByName);

router.route("/course/:id([0-9a-fA-F]{24})").get(getClassByCourse)

router.route("/schedule/:id([0-9a-fA-F]{24})").post(createClassSchedule)

router.route("/schedule/:id([0-9a-fA-F]{24})").put(updateSchedule)

router.route("/addtoclass").post(addToClass)
module.exports = router;