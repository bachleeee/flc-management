const { authenticateToken } = require('../middlewares/verifyToke');
const express = require("express");
const {
  findAll,
  createUser,
  findOne,
  update,
  deleteUser,
  deleteAllUsers,
  loginUser,
  logoutUser,
  addtoCart,
  getUserCart,
  deleteuserCart,
  createOrder,
  getUserOrder,
  deleteUserOrder,
  updateOrderStatus,
  getAllOrder,
  reduceProductQuantity,
  loginAdmin,
  addTeacher,
  createDegree,
  createExp,
  ApplyVoucher,
  addToClass,
  addMyClass
} = require("../controllers/users.controller");

const router = express.Router();

router.route("/").get(findAll).delete(deleteAllUsers);

router.route('/cart/').post(authenticateToken,addtoCart);
router.route('/cart').get(authenticateToken,getUserCart);
router.route('/cart').delete(authenticateToken,deleteuserCart);

router.route('/order').post(authenticateToken,createOrder);
router.route('/order').get(authenticateToken,getUserOrder);
router.route('/order').get(getAllOrder);
router.route('/order').delete(authenticateToken,deleteUserOrder);
router.route('/order').put(updateOrderStatus);

router.route('/reduce').put(reduceProductQuantity);

router.route('/register').post(createUser)
router.route('/login').post(loginUser)

router.route('/login-admin').post(loginAdmin)

router.route('/:id([0-9a-fA-F]{24})').get(findOne).put(update).delete(deleteUser);
router.route('/logout').post(authenticateToken, logoutUser);

router.route('/voucher').post(ApplyVoucher)

router.route('/teacher').post(addTeacher)
router.route('/teacher/degree').post(authenticateToken,createDegree)
router.route('/teacher/exp').post(authenticateToken,createExp)

router.route('/class').post(addMyClass)
module.exports = router;