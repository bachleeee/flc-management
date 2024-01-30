const express = require("express");
const {
  findAll,
  createProduct,
  findOne,
  update,
  deleteProduct,
  deleteAllProducts,
  findOneBySlug,
  getAllCat,
  createCat
} = require("../controllers/course.controller");

const router = express.Router();

router.route("/").get(findAll).delete(deleteAllProducts)
router.route("/").post(createProduct)
router.route("/:id([0-9a-fA-F]{24})").get(findOne).put(update).delete(deleteProduct);

router.route("/category").get(getAllCat)
router.route("/category").post(createCat)

router.route('/:slug').get(findOneBySlug)


// router.route('/cat').post(createCat)

module.exports = router;