const { authenticateToken } = require('../middlewares/verifyToke');
const express = require("express");
const {
  findAll,
  createAnnounce,
  findOne,
  update,
  deleteAnnounce,
  deleteAllAnnounces,
  findOneBySlug
} = require("../controllers/announce.controller");

const router = express.Router();

router.route("/").get(findAll).delete(deleteAllAnnounces)
router.route("/").post(authenticateToken,createAnnounce)
router.route("/:id([0-9a-fA-F]{24})").get(findOne).put(update).delete(deleteAnnounce);

router.route('/:slug').get(findOneBySlug)

module.exports = router;