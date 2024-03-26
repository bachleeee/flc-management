const ApiError = require("../api-error");
const examService = require("../services/exam.service");

exports.createExam = async (req, res, next) => {
  try {
      const result = await examService.createExam(req.body);
      res.send(result);
  } catch (error) {
      next(new ApiError("Lỗi tạo bài tập", 500));
  }
};

exports.findAll = async (req, res, next) => {
  let documents = [];
  try {
      const { lessonId} = req.query;

    if (lessonId) {
          documents = await examService.findByLessonId(lessonId);
    }  else {
          documents = await examService.findAll();
      }
  } catch (error) {
      next(new ApiError("An error occurred while retrieving lesson", 500));
  }
  return res.send(documents);
};

exports.findOne = async (req, res, next) => {
  const { id } = req.params;
  try {
    const document = await examService.findById(id);
    if (!document) {
      return next(new ApiError(`Exam with id ${id} not found`, 404));
    }
    return res.send(document);
  } catch (error) {
    next(new ApiError(`An error accurred while retrieving exam ${id}`, 500));
  }
};

exports.update = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new ApiError("Update data cannot be empty", 400));
  }
  const { id } = req.params;
  try {
    const document = await examService.update(id, req.body);
    if (!document) {
      return next(new ApiError(`Exam with id ${id} not found`, 404));
    }
    return res.send(document);
  } catch (error) {
    next(new ApiError(`An error accurred while updating exam ${id}`, 500));
  }
};

exports.deleteExam = async (req, res, next) => {
  const { id } = req.params;
  try {
    const document = await examService.deleteOne(id);
    if (!document) {
      return next(new ApiError(`Exam with id ${id} not found`, 404));
    }
    return res.send({
      message: `Exam with id ${id} was deleted successfully`,
    });
  } catch (error) {
    next(new ApiError(`An error accurred while deleting exam ${id}`, 500));
  }
};

exports.deleteAllExams = async (req, res, next) => {
  try {
    const result = await examService.deleteAll();
    return res.send({
      message: `${result.deletedCount} exams were deleted successfully`,
    });
  } catch (error) {
    next(new ApiError("An error accurred while deleting exams", 500));
  }
};