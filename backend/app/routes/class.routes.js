const express = require("express");
const {
  findAll,
  createClass,
  findOne,
  update,
  deleteClass,
  createClassSchedule,
  updateClassSchedule,
  deleteClassSchedule,
  getClassByCourse,
  findOneByName,
  addToClass,
  findArrayClassById,
  findOneClassSchedule,
  findAllOfClass
} = require("../controllers/class.controller");

const router = express.Router();
router.route("/schedule/:id").post(createClassSchedule).put(updateClassSchedule).delete(deleteClassSchedule).get(findOneClassSchedule)

router.route("/").get(findAll)
router.route("/").post(createClass)
router.route("/:id([0-9a-fA-F]{24})").get(findOne).put(update).delete(deleteClass);

router.route("/findArrayClassById").get(findArrayClassById)

router.route("/findAllOfClass").get(findAllOfClass)

router.route("/:name").get(findOneByName);

router.route("/course/:id([0-9a-fA-F]{24})").get(getClassByCourse)

router.route("/addtoclass").post(addToClass)
module.exports = router;