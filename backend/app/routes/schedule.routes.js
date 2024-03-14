const { authenticateToken } = require('../middlewares/verifyToke');
const express = require("express");
const {
  findAll,
  createSchedule,
  findOne,
  update,
  deleteSchedule,
  deleteAllSchedules,
  findOneBySlug,
  findAllByDate,
  findAllByShiftAndDate
} = require("../controllers/schedule.controller");

const router = express.Router();

router.route("/").get(findAll).delete(deleteAllSchedules)
router.route('/getSchedule/findByShiftAndDate/').get(findAllByShiftAndDate)
router.route("/").post(createSchedule)
router.route("/:id([0-9a-fA-F]{24})").get(findOne).put(update).delete(deleteSchedule);
router.route('/getSchedulebyDate/:date').get(findAllByDate)
router.route('/:slug').get(findOneBySlug)

module.exports = router;