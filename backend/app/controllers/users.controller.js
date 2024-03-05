const ApiError = require("../api-error");
const userService = require("../services/user.service");
const productService = require("../services/course.service");
const cartService = require("../services/cart.service");
const orderService = require("../services/order.service");
const classService = require("../services/class.service");
const teacherService = require("../services/teacher.service");
const VoucherService = require("../services/voucher.service");

const { generateToken } = require('../config/jwtToken');
const { generateRefreshToken } = require('../config/refreshtoken');
exports.createUser = async (req, res, next) => {
  const existingUser = await userService.findUser(req.body.email);

  if (existingUser) {
    return next(new ApiError("User already exists", 400));
  }

  try {
    const data = {
      avatar: "avatar-default",
      ...req.body,
      birthday: new Date(req.body.birthday) 
    };

    const result = await userService.create(data);
    res.send(result);
  } catch (error) {
    next(new ApiError("An error occurred while creating the user", 500));
  }
};

exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await userService.findUser(email);
  const refreshToken = await generateRefreshToken(user?._id);

  res.cookie("token", refreshToken, {
    maxAge: 72 * 60 * 60 * 1000,
  });
  if (!user) {
    return next(new ApiError("User not found", 401));
  }

  if (user.password !== password) {
    return next(new ApiError("Invalid password", 401));
  }

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    token: generateToken(user?._id),  
  });
};

exports.loginAdmin = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await userService.findUser(email);

  if (!user) {
    return next(new ApiError("User not found", 401));
  }

  if (user.password !== password || user.role !== 'admin') {
    return next(new ApiError("Login fail", 401));
  }

  res.json(user);
};

exports.findAll = async (req, res, next) => {
  let documents = [];
  try {
    const { name } = req.query;
    if (name) {
      documents = await userService.findByName(name);
    } else {
      documents = await userService.findAll();
    }
  } catch (error) {
    next(new ApiError("An error accurred while retrieving users", 500));
  }
  return res.send(documents);
};

exports.findOne = async (req, res, next) => {
  const { id } = req.params;
  try {
    const document = await userService.findById(id);
    if (!document) {
      return next(new ApiError(`User with id ${id} not found`, 404));
    }
    return res.send(document);
  } catch (error) {
    next(new ApiError(`An error accurred while retrieving user ${id}`, 500));
  }
};

exports.update = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new ApiError("Update data cannot be empty", 400));
  }
  const { id } = req.params;
  const _data = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    classid: req.body.classid,
  };
  try {
    const document = await userService.update(id, _data);
    if (!document) {
      return next(new ApiError(`User with id ${id} not found`, 404));
    }
    return res.send(document);
  } catch (error) {
    next(new ApiError(`An error accurred while updating user ${id}`, 500));
  }
};

exports.deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const document = await userService.deleteOne(id);
    if (!document) {
      return next(new ApiError(`User with id ${id} not found`, 404));
    }
    return res.send({
      message: `User with id ${id} was deleted successfully`,
    });
  } catch (error) {
    next(new ApiError(`An error accurred while deleting user ${id}`, 500));
  }
};

exports.deleteAllUsers = async (req, res, next) => {
  try {
    const result = await userService.deleteAll();
    return res.send({
      message: `${result.deletedCount} users were deleted successfully`,
    });
  } catch (error) {
    next(new ApiError("An error accurred while deleting users", 500));
  }
};

exports.logoutUser = async (req, res, next) => {
  
  res.json({ message: "Logout successful" });
};

exports.addtoCart = async (req, res, next) => {
  const { courseid } = req.body;
  const { id } = req.user;
  try {
    const user = await userService.findById(id);
    let getCourse = await productService.findById(courseid);
      
    let newCart = ({
      getCourse,
      orderby: user?._id,
    })

    const savedCart = await cartService.createCart(newCart);

    res.send(newCart);

  } catch (error) {
    next(new ApiError("An error occurred while add to cart", 500));
  }
};

exports.deleteuserCart = async (req, res, next) => {
  const { cart_id } = req.body;
  try {
    const documentDelete = await cartService.deleteOneCart(cart_id);
    if (!documentDelete) {
      return next(new ApiError(`cart not found`, 404));
    }
    return res.send({
      message: `cart was deleted successfully`,
    });
  } catch (error) {
    next(new ApiError(`An error accurred while deleting cart`, 500));
  }
};

exports.getUserCart = async (req, res, next) => {
  try {
    if (req.user && req.user.id) {
      // res.send(req.user.id)
      const documents = await cartService.findById(req.user.id);
      return res.send(documents);
    } else {
      return res.status(400).send({ error: 'Invalid user information.' });
    }
  } catch (error) {
    next(new ApiError("An error occurred while retrieving user's cart", 500));
  }
};

exports.createOrder = async (req, res,next) => {
  const {id} = req.user;
  const {classid,total,voucher} = req.body;
  try {
    const user = await userService.findById(id);

    let getClass = await classService.findById(classid);
    let getCourse = await productService.findById(getClass.courseid);
    
    let newRegister = ({
      courseid : getCourse._id,
      orderby: user._id,
      orderStatus: "waiting",
      classid,
      voucher,
      total,
    })

    const savedRegister = await orderService.createOrder(newRegister);

    return res.send(savedRegister)
  } catch (error) {
    next(new ApiError("Lỗi tạo phiếu đăng ký"))
  }
};
exports.ApplyVoucher = async (req, res, next) => {
  const { voucher, courseid } = req.body;
  try {
    if (voucher === "") {
      return res.status(400).send("Nhập voucher");
    } else {
      let getCourse = await productService.findById(courseid);
      let getVoucher = await VoucherService.findByName(voucher);

      if (!getVoucher) {
        return res.status(404).send("Không tìm thấy voucher");
      }

      const total = getCourse.price - getCourse.price * getVoucher.giagiam;

      return res.send({ total });
    }
  } catch (error) {
    next(new ApiError("Lỗi áp dụng voucher", 500));
  }
};

exports.getUserOrder = async (req, res, next) => {
  try {
    if (req.user && req.user.id) {
      // res.send(req.user.id)
      const documents = await orderService.findById(req.user.id);
      return res.send(documents);
    } else {
      return res.status(400).send({ error: 'Invalid user information.' });
    }
  } catch (error) {
    next(new ApiError("An error occurred while retrieving user's Order", 500));
  }
};

exports.getAllOrder = async (req, res, next) => {
  let documents = [];
  try {
    documents = await orderService.findAll();

  } catch (error) {
    next(new ApiError("An error accurred while retrieving order", 500));
  }
  return res.send(documents);
};

exports.deleteUserOrder = async (req, res, next) => {
  const { order_id } = req.body;
  try {

    const documentDelete = await orderService.deleteOneOrder(order_id);
    if (!documentDelete) {
      return next(new ApiError(`order not found`, 404));
    }
    return res.send({
      message: `order was deleted successfully`,
    });
  } catch (error) {
    next(new ApiError(`An error accurred while deleting order`, 500));
  }
};

exports.updateOrderStatus = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new ApiError("Update data cannot be empty", 400));
  }

  const { orderid } = req.body;

  try {
    let getOrder = await orderService.findById(orderid);
    if (!getOrder) {
      return next(new ApiError(`Order with id ${orderid} not found`, 404));
    }

    // const getClass = await classService.findById(getOrder.classid);
    // if (!getClass) {
    //   return next(new ApiError(`Class with id ${classid} not found`, 404));
    // }

    // const getCourse = await productService.findById(getOrder.courseid);
    // if (!getCourse) {
    //   return next(new ApiError(`Course with id ${getClass.courseid} not found`, 404));
    // }

    // const getUser = await userService.findById(getOrder.orderby);
    // if (!getUser) {
    //   return next(new ApiError(`User with id ${id} not found`, 404));
    // }

    const _data = {
      orderStatus: req.body.orderStatus,
    };
    const updatedOrder = await orderService.update(orderid, _data);

    // await productService.update(getCourse._id, getCourse.quantity + 1);
    // await classService.update(getClass._id, getClass.soluong + 1);

    // //them sv
    // const _data_studentEnroll = {
    //   idClassEnroll: getClass._id,
    // };
    // await userService.update(getUser._id,_data_studentEnroll)

    return res.send(updatedOrder);
  } catch (error) {
    next(new ApiError(`An error occurred while updating order ${id}`, 500));
  }
};

exports.reduceProductQuantity = async (req, res, next) => {
  const { product_id, count } = req.body;
  const getProduct = await productService.findById(product_id);
  const newQuantity = getProduct.quantity - count;
  const _data = {
    quantity: newQuantity
  }
  
  try {
    const document = await productService.update(product_id, _data);
    if (!document) {
      return next(new ApiError(`Product with id ${id} not found`, 404));
    }
    return res.send(document);
  } catch (error) {
    next(new ApiError(`An error accurred while updating product ${id}`, 500));
  }
}

exports.addTeacher = async (req, res, next) => {
  const existingUser = await teacherService.findUser(req.body.email);

  if (existingUser) {
    return next(new ApiError("User already exists", 400));
  }

  try {
    const result = await teacherService.create(req.body);
    res.send(result);
  } catch (error) {
    next(new ApiError("An error occurred while creating the user", 500));
  }
};

exports.createDegree = async (req, res, next) => {
  const {userid} = user.req;
  try {
    const _data = {
      ...req.body,
      userid,
    };

    const document = await teacherService.createTeacherDegree(_data)

    return res.send(document);

  } catch(error) {
    next(new ApiError("An error occurred while creating", 500));
  }
}

exports.createExp = async (req, res, next) => {
  const {userid} = user.req;
  try {
    const _data = {
      ...req.body,
      userid,
    };

    const document = await teacherService.createTeacherExp(_data)

    return res.send(document);

  } catch(error) {
    next(new ApiError("An error occurred while creating", 500));
  }
}

