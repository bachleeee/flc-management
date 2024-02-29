const ApiError = require("../api-error");
const progressService = require("../services/progress.service");

exports.createProgress = async (req, res, next) => {
  const {id} = req.user;

  try {
    const userid = id;
    const _data = {
      ...req.body,
      userid,
      createdAt: new Date(),
    };

    const result = await progressService.createProgress(_data);
    return res.send(result);
  } catch (error) {
    next(new ApiError("Lỗi tạo tiến trình"))
  }
};

exports.findAll = async (req, res, next) => {
  let documents = [];
  try {
    const { name, category, page, limit } = req.query;

    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 10;

    if (name && category) {
      documents = await progressService.findByNameAndCategoryPaged(
        name,
        category,
        pageNumber,
        limitNumber
      );
    } else if (name) {
      documents = await progressService.findByNamePaged(name, pageNumber, limitNumber);
    } else if (category) {
      documents = await progressService.findByCategoryPaged(category, pageNumber, limitNumber);
    } else {
      documents = await progressService.findAllPaged(pageNumber, limitNumber);
    }
  } catch (error) {
    next(new ApiError("An error occurred while retrieving progresss", 500));
  }
  return res.send(documents);
};

exports.findOneBySlug = async (req, res, next) => {
  const { slug } = req.params;
  try {
    const document = await progressService.findBySlug(slug);
    if (!document) {
      return next(new ApiError(`Progress with slug ${slug} not found`, 404));
    }
    return res.send(document);
  } catch (error) {
    next(new ApiError(`An error accurred while retrieving progress ${slug}`, 500));
  }
};

exports.findOne = async (req, res, next) => {
  const { id } = req.params;
  try {
    const document = await progressService.findById(id);
    if (!document) {
      return next(new ApiError(`Progress with id ${id} not found`, 404));
    }
    return res.send(document);
  } catch (error) {
    next(new ApiError(`An error accurred while retrieving progress ${id}`, 500));
  }
};

exports.getMyProgress = async (req, res, next) => {
  const { id } = req.user;
  const { classid } = req.params;
  try {
    const document = await progressService.findByUserIdAndClassId(id,classid);
    if (!document) {
      return next(new ApiError(`Progress with userid ${id} not found`, 404));
    }
    return res.send(document);
  } catch (error) {
    next(new ApiError(`An error accurred while retrieving progress ${id}`, 500));
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
    const document = await progressService.update(id, _data);
    if (!document) {
      return next(new ApiError(`Progress with id ${id} not found`, 404));
    }
    return res.send(document);
  } catch (error) {
    next(new ApiError(`An error accurred while updating progress ${id}`, 500));
  }
};

exports.deleteProgress = async (req, res, next) => {
  const { id } = req.params;
  try {
    const document = await progressService.deleteOne(id);
    if (!document) {
      return next(new ApiError(`Progress with id ${id} not found`, 404));
    }
    return res.send({
      message: `Progress with id ${id} was deleted successfully`,
    });
  } catch (error) {
    next(new ApiError(`An error accurred while deleting progress ${id}`, 500));
  }
};

exports.deleteAllProgresss = async (req, res, next) => {
  try {
    const result = await progressService.deleteAll();
    return res.send({
      message: `${result.deletedCount} progresss were deleted successfully`,
    });
  } catch (error) {
    next(new ApiError("An error accurred while deleting progresss", 500));
  }
};