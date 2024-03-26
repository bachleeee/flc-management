const { authenticateToken } = require('../middlewares/verifyToke');
const express = require("express");
const {
  findAll,
  createProgress,
  findOne,
  update,
  deleteProgress,
  deleteAllProgresss,
  findOneBySlug,
  getMyProgress
} = require("../controllers/progress.controller");

const router = express.Router();

router.route("/").get(findAll).delete(deleteAllProgresss)
router.route("/").post(authenticateToken,createProgress)
router.route("/:id([0-9a-fA-F]{24})").get(findOne).put(update).delete(deleteProgress);

router.route("/myProgress").get(authenticateToken,getMyProgress)

router.route('/:slug').get(findOneBySlug)

module.exports = router;