const ApiError = require("../api-error");
const orderService = require("../services/order.service");

exports.createOrder = async (req, res, next) => {
  const {id} = req.user;
  try {
    const userid = id;
    const _data = {
      ...req.body,
      userid,
      createdAt: new Date(),
    };

    const result = await orderService.createOrder(_data);
    return res.send(result);
  } catch (error) {
    next(new ApiError("Lỗi tạo bình luận", 500));
  }
};

exports.findAll = async (req, res, next) => {
  let documents = [];
  try {
      documents = await orderService.findAll();
  
  } catch (error) {
    next(new ApiError("An error occurred while retrieving orders", 500));
  }
  return res.send(documents);
};

exports.findOneBySlug = async (req, res, next) => {
  const { slug } = req.params;
  try {
    const document = await orderService.findBySlug(slug);
    if (!document) {
      return next(new ApiError(`Order with slug ${slug} not found`, 404));
    }
    return res.send(document);
  } catch (error) {
    next(new ApiError(`An error accurred while retrieving order ${slug}`, 500));
  }
};

exports.findOne = async (req, res, next) => {
  const { id } = req.params;
  try {
    const document = await orderService.findById(id);
    if (!document) {
      return next(new ApiError(`Order with id ${id} not found`, 404));
    }
    return res.send(document);
  } catch (error) {
    next(new ApiError(`An error accurred while retrieving order ${id}`, 500));
  }
};

exports.update = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new ApiError("Update data cannot be empty", 400));
  }
  const { id } = req.params;
  const _data = {
    orderStatus: req.body.orderStatus
  };
  try {
    const document = await orderService.update(id, _data);
    if (!document) {
      return next(new ApiError(`Order with id ${id} not found`, 404));
    }
    return res.send(document);
  } catch (error) {
    next(new ApiError(`An error accurred while updating order ${id}`, 500));
  }
};

exports.deleteOrder = async (req, res, next) => {
  const { id } = req.params;
  try {
    const document = await orderService.deleteOneOrder(id);
    if (!document) {
      return next(new ApiError(`Order with id ${id} not found`, 404));
    }
    return res.send({
      message: `Order with id ${id} was deleted successfully`,
    });
  } catch (error) {
    next(new ApiError(`An error accurred while deleting order ${id}`, 500));
  }
};

exports.deleteAllOrders = async (req, res, next) => {
  try {
    const result = await orderService.deleteAll();
    return res.send({
      message: `${result.deletedCount} orders were deleted successfully`,
    });
  } catch (error) {
    next(new ApiError("An error accurred while deleting orders", 500));
  }
};