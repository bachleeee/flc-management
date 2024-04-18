const ApiError = require("../api-error");
const examService = require("../services/exam.service");

const multer = require('multer');
function getCurrentDateTimeString() {
  const now = new Date();
  const day = now.getDate().toString().padStart(2, '0');
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const year = now.getFullYear().toString();
  const hour = now.getHours().toString().padStart(2, '0');
  const minute = now.getMinutes().toString().padStart(2, '0');

  return `${day}-${month}-${year}-${hour}-${minute}`;
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const dateTimeString = getCurrentDateTimeString();
    const originalname = file.originalname;
    cb(null, dateTimeString + '-' + originalname);
  }
});

const upload = multer({ storage: storage });

exports.createExam = async (req, res, next) => {
  try {
    const result = await examService.createExam(req.body);
    res.send(result);
  } catch (error) {
    next(new ApiError("Lỗi tạo bài tập", 500));
  }
}

exports.createExamWithImg = [
  upload.single('image'),

  async (req, res, next) => {
    try {
      const dateTimeString = getCurrentDateTimeString();
      const _data = {
        fileName: dateTimeString + '-' + req.body.fileName,
        ...req.body
      };
      const result = await examService.createExam(_data);
      res.send(result);
    } catch (error) {
      next(new ApiError("Lỗi tạo bài tập", 500));
    }
  }];

exports.createExamWithAudio = [
  upload.single('audio'),
  async (req, res, next) => {
    try {
      const dateTimeString = getCurrentDateTimeString();
      const _data = {
        fileName: dateTimeString + '-' + req.body.fileName,
        ...req.body
      };
      const result = await examService.createExam(_data);
      res.send(result);
    } catch (error) {
      next(new ApiError("Lỗi tạo bài tập", 500));
    }
  }
];


exports.findAll = async (req, res, next) => {
  let documents = [];
  try {
    const { lessonId } = req.query;

    if (lessonId) {
      documents = await examService.findByLessonId(lessonId);
    } else {
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
  const _data = {
    optionA: req.body.optionA,
    optionB: req.body.optionB,
    optionC: req.body.optionC,
    optionD: req.body.optionD,
    title: req.body.title,
    question: req.body.question,
    correctOption: req.body.correctOption,
    type: req.body.type,
  };
  try {
    const document = await examService.update(id, _data);
    if (!document) {
      return next(new ApiError(`User with id ${id} not found`, 404));
    }
    return res.send(document);
  } catch (error) {
    next(new ApiError(`An error accurred while updating user ${id}`, 500));
  }
};

exports.addExamToLesson = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new ApiError("Update data cannot be empty", 400));
  }
  const { id } = req.params;
  try {
    const document = await examService.updateLessonId(id, req.body.lessonId);
    if (!document) {
      return next(new ApiError(`User with id ${id} not found`, 404));
    }
    return res.send(document);
  } catch (error) {
    next(new ApiError(`An error accurred while updating user ${id}`, 500));
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