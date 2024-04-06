const { authenticateToken } = require('../middlewares/verifyToke');
const express = require("express");
const {
  findAll,
  createMessage,
  findOne,
  update,
  deleteMessage,
  deleteAllMessages,
  findOneBySlug,
  createGroup,
  getMyGroups
} = require("../controllers/message.controller");

const router = express.Router();

router.route("/:groupid([0-9a-fA-F]{24})").get(findAll).delete(deleteAllMessages)
router.route("/").post(authenticateToken,createMessage)
router.route("/:id([0-9a-fA-F]{24})").get(findOne).put(authenticateToken,update).delete(deleteMessage);

router.route("/group").post(createGroup).get(authenticateToken,getMyGroups)

router.route('/:slug').get(findOneBySlug)

module.exports = router;