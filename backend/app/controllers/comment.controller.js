const ApiError = require("../api-error");
const commentService = require("../services/comment.service");

exports.createComment = async (req, res, next) => {
  const { userid } = req.user;
  try {
    const _data = {
      ...req.body,
      userid,
      createdAt: new Date(),
    };

    const result = await commentService.createComment(_data);
    res.send(result);
  } catch (error) {
    next(new ApiError("Lỗi tạo bình luận", 500));
  }
};

exports.findAll = async (req, res, next) => {
  let documents = [];
  try {
    const { name, category, page, limit } = req.query;

    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 10;

    if (name && category) {
      documents = await commentService.findByNameAndCategoryPaged(
        name,
        category,
        pageNumber,
        limitNumber
      );
    } else if (name) {
      documents = await commentService.findByNamePaged(name, pageNumber, limitNumber);
    } else if (category) {
      documents = await commentService.findByCategoryPaged(category, pageNumber, limitNumber);
    } else {
      documents = await commentService.findAllPaged(pageNumber, limitNumber);
    }
  } catch (error) {
    next(new ApiError("An error occurred while retrieving comments", 500));
  }
  return res.send(documents);
};

exports.findOneBySlug = async (req, res, next) => {
  const { slug } = req.params;
  try {
    const document = await commentService.findBySlug(slug);
    if (!document) {
      return next(new ApiError(`Comment with slug ${slug} not found`, 404));
    }
    return res.send(document);
  } catch (error) {
    next(new ApiError(`An error accurred while retrieving comment ${slug}`, 500));
  }
};

exports.findOne = async (req, res, next) => {
  const { id } = req.params;
  try {
    const document = await commentService.findById(id);
    if (!document) {
      return next(new ApiError(`Comment with id ${id} not found`, 404));
    }
    return res.send(document);
  } catch (error) {
    next(new ApiError(`An error accurred while retrieving comment ${id}`, 500));
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
    const document = await commentService.update(id, _data);
    if (!document) {
      return next(new ApiError(`Comment with id ${id} not found`, 404));
    }
    return res.send(document);
  } catch (error) {
    next(new ApiError(`An error accurred while updating comment ${id}`, 500));
  }
};

exports.deleteComment = async (req, res, next) => {
  const { id } = req.params;
  try {
    const document = await commentService.deleteOne(id);
    if (!document) {
      return next(new ApiError(`Comment with id ${id} not found`, 404));
    }
    return res.send({
      message: `Comment with id ${id} was deleted successfully`,
    });
  } catch (error) {
    next(new ApiError(`An error accurred while deleting comment ${id}`, 500));
  }
};

exports.deleteAllComments = async (req, res, next) => {
  try {
    const result = await commentService.deleteAll();
    return res.send({
      message: `${result.deletedCount} comments were deleted successfully`,
    });
  } catch (error) {
    next(new ApiError("An error accurred while deleting comments", 500));
  }
};