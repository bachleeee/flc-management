const ApiError = require("../api-error");
const announceService = require("../services/announce.service");
const userService = require("../services/user.service");

exports.createAnnounce = async (req, res, next) => {
  const { id } = req.user;
  try {
      const user = await userService.findById(id);
      const toUsers = req.body.toUsers;

      for (const toUser of toUsers) {
          const data = {
              fromUser: user.name,
              createAt: new Date(),
              noiDung: req.body.noiDung,
              toUser: toUser.id  
          };
          await announceService.createAnnounce(data);
      }

      return res.status(200).json({ success: true, message: "Thông báo đã được tạo." });
  } catch (error) {
      next(new ApiError("Lỗi tạo thông báo", 500));
  }
};


exports.findAll = async (req, res, next) => {
  let documents = [];
  try {
    const { userId } = req.query;

    if (userId) {
      documents = await announceService.findByUserId(userId);
    } else {
      documents = await announceService.findAll();
    }
  } catch (error) {
    next(new ApiError("An error occurred while retrieving announces", 500));
  }
  return res.send(documents);
};

exports.findAll = async (req, res, next) => {
  let documents = [];
  try {
    const { name } = req.query;

    if (name) {
      documents = await announceService.findByName(name);
    } else {
      documents = await announceService.findAll();
    }
  } catch (error) {
    next(new ApiError("An error occurred while retrieving announces", 500));
  }
  return res.send(documents);
};

exports.findOneBySlug = async (req, res, next) => {
  const { slug } = req.params;
  try {
    const document = await announceService.findBySlug(slug);
    if (!document) {
      return next(new ApiError(`Announce with slug ${slug} not found`, 404));
    }
    return res.send(document);
  } catch (error) {
    next(new ApiError(`An error accurred while retrieving announce ${slug}`, 500));
  }
};

exports.findOne = async (req, res, next) => {
  const { id } = req.params;
  try {
    const document = await announceService.findById(id);
    if (!document) {
      return next(new ApiError(`Announce with id ${id} not found`, 404));
    }
    return res.send(document);
  } catch (error) {
    next(new ApiError(`An error accurred while retrieving announce ${id}`, 500));
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
    const document = await announceService.update(id, _data);
    if (!document) {
      return next(new ApiError(`Announce with id ${id} not found`, 404));
    }
    return res.send(document);
  } catch (error) {
    next(new ApiError(`An error accurred while updating announce ${id}`, 500));
  }
};

exports.deleteAnnounce = async (req, res, next) => {
  const { id } = req.params;
  try {
    const document = await announceService.deleteOne(id);
    if (!document) {
      return next(new ApiError(`Announce with id ${id} not found`, 404));
    }
    return res.send({
      message: `Announce with id ${id} was deleted successfully`,
    });
  } catch (error) {
    next(new ApiError(`An error accurred while deleting announce ${id}`, 500));
  }
};

exports.deleteAllAnnounces = async (req, res, next) => {
  try {
    const result = await announceService.deleteAll();
    return res.send({
      message: `${result.deletedCount} announces were deleted successfully`,
    });
  } catch (error) {
    next(new ApiError("An error accurred while deleting announces", 500));
  }
};