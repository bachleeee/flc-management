const ApiError = require("../api-error");
const roomService = require("../services/room.service");

exports.createRoom = async (req, res, next) => {
  try {
    const result = await roomService.createRoom(req.body);
    return res.send(result);
  } catch (error) {
    next(new ApiError("Lỗi tạo phòng học", 500));
  }
};

exports.findAll = async (req, res, next) => {
  let documents = [];
  try {
    const { name } = req.query;

    if (name) {
      documents = await roomService.findByName(name);
    } else {
      documents = await roomService.findAll();
    }
  } catch (error) {
    next(new ApiError("An error occurred while retrieving rooms", 500));
  }
  return res.send(documents);
};

exports.findOneBySlug = async (req, res, next) => {
  const { slug } = req.params;
  try {
    const document = await roomService.findBySlug(slug);
    if (!document) {
      return next(new ApiError(`Room with slug ${slug} not found`, 404));
    }
    return res.send(document);
  } catch (error) {
    next(new ApiError(`An error accurred while retrieving room ${slug}`, 500));
  }
};

exports.findOne = async (req, res, next) => {
  const { id } = req.params;
  try {
    const document = await roomService.findById(id);
    if (!document) {
      return next(new ApiError(`Room with id ${id} not found`, 404));
    }
    return res.send(document);
  } catch (error) {
    next(new ApiError(`An error accurred while retrieving room ${id}`, 500));
  }
};

exports.update = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new ApiError("Update data cannot be empty", 400));
  }
  const { id } = req.params;
  const _data = {

  };
  try {
    const document = await roomService.update(id, _data);
    if (!document) {
      return next(new ApiError(`Room with id ${id} not found`, 404));
    }
    return res.send(document);
  } catch (error) {
    next(new ApiError(`An error accurred while updating room ${id}`, 500));
  }
};

exports.deleteRoom = async (req, res, next) => {
  const { id } = req.params;
  try {
    const document = await roomService.deleteOne(id);
    if (!document) {
      return next(new ApiError(`Room with id ${id} not found`, 404));
    }
    return res.send({
      message: `Room with id ${id} was deleted successfully`,
    });
  } catch (error) {
    next(new ApiError(`An error accurred while deleting room ${id}`, 500));
  }
};

exports.deleteAllRooms = async (req, res, next) => {
  try {
    const result = await roomService.deleteAll();
    return res.send({
      message: `${result.deletedCount} rooms were deleted successfully`,
    });
  } catch (error) {
    next(new ApiError("An error accurred while deleting rooms", 500));
  }
};