const ApiError = require("../api-error");
const messageService = require("../services/message.service");
const userService = require("../services/user.service");

exports.createMessage = async (req, res, next) => {
  const {id} = req.user;
  try {
    const user = await userService.findById(id);

    const userid = id;
    const _data = {
      ...req.body,
      loai: req.body.loai,
      userid,
      name: user.name,
      groupid: req.body.groupid,
      createdAt: new Date(),
    };

    const result = await messageService.createMessage(_data);
    return res.send(result);
  } catch (error) {
    next(new ApiError("Lỗi tạo tin nhắn", 500));
  }
};
exports.createGroup = async (req, res, next) => {
  try {
    const _data = {
      ...req.body,
      createdAt: new Date(),
    };

    const result = await messageService.createGroup(_data);
    return res.send(result);
  } catch (error) {
    next(new ApiError("Lỗi tạo nhóm", 500));
  }
};
exports.getMyGroups = async (req, res, next) => {
  const { id } = req.user;
  try {
    const result = await messageService.getMyGroups(id);
    return res.send(result);
  } catch (error) {
    next(new ApiError("Lỗi tạo bình luận", 500));
  }
};

exports.findAll = async (req, res, next) => {
  let documents = [];
  const {groupid} = req.params
  try {
    documents = await messageService.findAll(groupid);
  } catch (error) {
    next(new ApiError("An error occurred while retrieving messages", 500));
  }
  return res.send(documents);
};

exports.findOneBySlug = async (req, res, next) => {
  const { slug } = req.params;
  try {
    const document = await messageService.findBySlug(slug);
    if (!document) {
      return next(new ApiError(`Message with slug ${slug} not found`, 404));
    }
    return res.send(document);
  } catch (error) {
    next(new ApiError(`An error accurred while retrieving message ${slug}`, 500));
  }
};

exports.findOne = async (req, res, next) => {
  const { id } = req.params;
  try {
    const document = await messageService.findById(id);
    if (!document) {
      return next(new ApiError(`Message with id ${id} not found`, 404));
    }
    return res.send(document);
  } catch (error) {
    next(new ApiError(`An error accurred while retrieving message ${id}`, 500));
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
    const document = await messageService.update(id, _data);
    if (!document) {
      return next(new ApiError(`Message with id ${id} not found`, 404));
    }
    return res.send(document);
  } catch (error) {
    next(new ApiError(`An error accurred while updating message ${id}`, 500));
  }
};

exports.deleteMessage = async (req, res, next) => {
  const { id } = req.params;
  try {
    const document = await messageService.deleteOne(id);
    if (!document) {
      return next(new ApiError(`Message with id ${id} not found`, 404));
    }
    return res.send({
      message: `Message with id ${id} was deleted successfully`,
    });
  } catch (error) {
    next(new ApiError(`An error accurred while deleting message ${id}`, 500));
  }
};

exports.deleteAllMessages = async (req, res, next) => {
  try {
    const result = await messageService.deleteAll();
    return res.send({
      message: `${result.deletedCount} messages were deleted successfully`,
    });
  } catch (error) {
    next(new ApiError("An error accurred while deleting messages", 500));
  }
};