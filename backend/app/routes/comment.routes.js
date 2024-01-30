const { authenticateToken } = require('../middlewares/verifyToke');
const express = require("express");
const {
  findAll,
  createComment,
  findOne,
  update,
  deleteComment,
  deleteAllComments,
  findOneBySlug,
} = require("../controllers/comment.controller");

const router = express.Router();

router.route("/").get(findAll).delete(deleteAllComments)
router.route("/").post(authenticateToken,createComment)
router.route("/:id([0-9a-fA-F]{24})").get(findOne).put(authenticateToken,update).delete(deleteComment);

router.route('/:slug').get(findOneBySlug)

module.exports = router;