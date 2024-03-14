const { authenticateToken } = require('../middlewares/verifyToke');
const express = require("express");
const {
  findAll,
  createRoom,
  findOne,
  update,
  deleteRoom,
  deleteAllRooms,
  findOneBySlug,
} = require("../controllers/room.controller");

const router = express.Router();

router.route("/").get(findAll).delete(deleteAllRooms)
router.route("/").post(createRoom)
router.route("/:id([0-9a-fA-F]{24})").get(findOne).put(update).delete(deleteRoom);

router.route('/:slug').get(findOneBySlug)

module.exports = router;