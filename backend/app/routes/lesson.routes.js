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
  updateExam,
  deleteDoc,
  deleteVid,
  deleteExam,
  createExam,
  submitExam,
  findAllDoc,
  findAllVid,
  findAllExam,
  findOneDoc,
  findOneVid,
  findOneExam,
  getLessonByClassName,
  
} = require("../controllers/lesson.controller");

const router = express.Router();

router.route("/").get(findAll).delete(deleteAllLessons)
router.route("/").post(createLesson)
router.route("/:id([0-9a-fA-F]{24})").get(findOne).put(update).delete(deleteLesson);

router.route("/document").post(createDocument)
router.route("/documents/:lessonid([0-9a-fA-F]{24})").get(findAllDoc)
router.route("/document/:id([0-9a-fA-F]{24})").get(findOneDoc).put(updateDoc).delete(deleteDoc);

router.route("/video").post(createVideo)
router.route("/videos/:lessonid([0-9a-fA-F]{24})").get(findAllVid)
router.route("/video/:id([0-9a-fA-F]{24})").get(findOneVid).put(updateVid).delete(deleteVid);

router.route("/exam").post(createExam)
router.route("/exams/:lessonid([0-9a-fA-F]{24})").get(findAllExam)
router.route("/exam/:id([0-9a-fA-F]{24})").get(findOneExam).put(updateExam).delete(deleteExam);

router.route("/exam/:id([0-9a-fA-F]{24})").post(authenticateToken,submitExam)

router.route('/:slug').get(findOneBySlug)

router.route("/class/:className").get(getLessonByClassName)

module.exports = router;