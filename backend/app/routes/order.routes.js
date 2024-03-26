const { authenticateToken } = require('../middlewares/verifyToke');
const express = require("express");
const {
  findAll,
  createOrder,
  findOne,
  update,
  deleteOrder,
  deleteAllOrders,
  findOneBySlug,
} = require("../controllers/order.controller");

const router = express.Router();

router.route("/").get(findAll).delete(deleteAllOrders)
router.route("/").post(authenticateToken,createOrder)
router.route("/:id([0-9a-fA-F]{24})").get(findOne).put(update).delete(deleteOrder);

router.route('/:slug').get(findOneBySlug)

module.exports = router;