const { authenticateToken } = require('../middlewares/verifyToke');
const express = require("express");
const {
  findAll,
  createLesson,
  findOne,
  update,
  deleteLesson,
  deleteAllLessons,
  findOneBySlug,
  createDocument,
  createVideo,
  updateDoc,
  updateVid,
  deleteDoc,
  deleteVid,
  createExcercise,
  submitExcercise,
  findOneEx,
  getLessonByClassId,
  findAllDoc,
  findAllVid
} = require("../controllers/lesson.controller");

const router = express.Router();

router.route("/").get(findAll).delete(deleteAllLessons)
router.route("/").post(createLesson)
router.route("/:id([0-9a-fA-F]{24})").get(findOne).put(update).delete(deleteLesson);

router.route("/document").post(createDocument)
router.route("/document/:lessonid([0-9a-fA-F]{24})").get(findAllDoc).put(updateDoc).delete(deleteDoc);

router.route("/video").post(createVideo)
router.route("/video/:lessonid([0-9a-fA-F]{24})").get(findAllVid).put(updateVid).delete(deleteVid);

router.route("/excercise").post(createExcercise)
router.route("/excercise/:id([0-9a-fA-F]{24})").get(findOneEx).put(updateVid).delete(deleteVid);

router.route("/excercise/:id([0-9a-fA-F]{24})").post(authenticateToken,submitExcercise)

router.route('/:slug').get(findOneBySlug)

router.route("/class/:id([0-9a-fA-F]{24})").get(getLessonByClassId)

module.exports = router;