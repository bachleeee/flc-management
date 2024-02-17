const ApiError = require("../api-error");
const classService = require("../services/class.service");
const productService = require("../services/course.service");
const userService = require("../services/user.service");
const { convertDayOfWeekToNumber } = require('../utils/createSlug');

exports.createClass = async (req, res, next) => {
  const { id } = req.params;

  try {
    const courseid = id;

    if (!req.body.ngaybd) {
      throw new Error("Thiếu thông tin ngày bắt đầu.");
    }

    const ngaybatdau = new Date(req.body.ngaybd);

    const sotuanhoc = req.body.sobuoihoc / req.body.sobuoitrongtuan;

    const ngayketthuc = new Date(ngaybatdau);

    ngayketthuc.setDate(ngayketthuc.getDate() + (sotuanhoc + 8) * 7);

    const result = await classService.create({
      ...req.body,
      courseid,
      ngaybatdau,
      ngayketthuc
    });

    res.send(result);
  } catch (error) {
    next(new ApiError("Lỗi tạo lớp học: " + error.message, 500));
  }
};

exports.createClassSchedule = async (req, res, next) => {
  const { id } = req.params;
  const classid = id;

  try {
    const myClass = await classService.findById(classid);

    const startDate = myClass.ngaybatdau;
    const totalSessions = myClass.sobuoihoc;
    const daysOfClass = myClass.thu;

    const schedules = [];

    let currentDate = new Date(startDate);
    let sessionsCount = 0;

    while (sessionsCount < totalSessions) {
      const thu = currentDate.getDay();
      if (daysOfClass.includes(thu)) {
        const gioBatDau = new Date(currentDate);
        const gioKetThuc = new Date(currentDate);

        gioKetThuc.setHours(gioKetThuc.getHours() + 2);

        const classSchedule = {
          classid,
          ...req.body,
          giobatdau: gioBatDau,
          gioketthuc: gioKetThuc,
          stt: sessionsCount + 1,
        };

        schedules.push(classSchedule);
        await classService.createSchedule(classSchedule);
        sessionsCount++;
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return res.send(schedules);
  } catch (error) {
    next(new ApiError("Lỗi tạo lịch học", 500));
  }
};

exports.findAll = async (req, res, next) => {
  let documents = [];
  try {
    const { name, category, page, limit } = req.query;

    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 10;

    if (name && category) {
      documents = await classService.findByNameAndCategoryPaged(
        name,
        category,
        pageNumber,
        limitNumber
      );
    } else if (name) {
      documents = await classService.findByNamePaged(name, pageNumber, limitNumber);
    } else if (category) {
      documents = await classService.findByCategoryPaged(category, pageNumber, limitNumber);
    } else {
      documents = await classService.findAllPaged(pageNumber, limitNumber);
    }
  } catch (error) {
    next(new ApiError("An error occurred while retrieving classs", 500));
  }
  return res.send(documents);
};

exports.findArrayClassById = async (req, res, next) => {
  let documents = [];
  try {
    documents = await classService.findByIdtoArray(req.body);

  } catch (error) {
    next(new ApiError("An error occurred while retrieving classs", 500));
  }
  return res.send(documents);
};

exports.getClassByCourse = async (req, res, next) => {
  const { id } = req.params;
  try {
    let documents = [];
    documents = await classService.findByCourseId(id);
    return res.send(documents);
  } catch (error) {
    next(new ApiError(`An error accurred while retrieving class ${id}`, 500));
  }
};

exports.findOneBySlug = async (req, res, next) => {
  const { slug } = req.params;
  try {
    const document = await classService.findBySlug(slug);
    if (!document) {
      return next(new ApiError(`Class with slug ${slug} not found`, 404));
    }
    return res.send(document);
  } catch (error) {
    next(new ApiError(`An error accurred while retrieving class ${slug}`, 500));
  }
};

exports.findOne = async (req, res, next) => {
  const { id } = req.params;
  try {
    const document = await classService.findById(id);
    if (!document) {
      return next(new ApiError(`Class with id ${id} not found`, 404));
    }
    return res.send(document);
  } catch (error) {
    next(new ApiError(`An error accurred while retrieving class ${id}`, 500));
  }
};
exports.findOneByName = async (req, res, next) => {
  const { name } = req.params;
  try {
    const document = await classService.findByname(name);
    if (!document) {
      return next(new ApiError(`Class with name ${name} not found`, 404));
    }
    return res.send(document);
  } catch (error) {
    next(new ApiError(`An error accurred while retrieving class ${id}`, 500));
  }
};

exports.update = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new ApiError("Update data cannot be empty", 400));
  }
  const { id } = req.params;
  const _data = {
    tenlop: req.body.tenlop,
    soluong: req.body.soluong,
  };
  try {
    const document = await classService.update(id, _data);
    if (!document) {
      return next(new ApiError(`Class with id ${id} not found`, 404));
    }
    return res.send(document);
  } catch (error) {
    next(new ApiError(`An error accurred while updating class ${id}`, 500));
  }
};

exports.updateSchedule = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new ApiError("Update data cannot be empty", 400));
  }
  const { id } = req.params;

  const updatedData = {
    phong: req.body.phong,
    giobatdau: req.body.giobatdau,
    thu: req.body.thu,
  };

  try {

    if (updatedData.giobatdau) {
      const gioBatDau = new Date(updatedData.giobatdau);
      const gioKetThuc = new Date(gioBatDau);

      gioKetThuc.setHours(gioKetThuc.getHours() + 2);

      updatedData.gioketthuc = gioKetThuc;
    }

    const updatedDocument = await classService.updateSchedule(id, updatedData);

    return res.send(updatedDocument);
  } catch (error) {
    next(new ApiError(`An error occurred while updating class ${id}`, 500));
  }
};


exports.deleteClass = async (req, res, next) => {
  const { id } = req.params;
  try {
    const document = await classService.deleteOne(id);
    if (!document) {
      return next(new ApiError(`Class with id ${id} not found`, 404));
    }
    return res.send({
      message: `Class with id ${id} was deleted successfully`,
    });
  } catch (error) {
    next(new ApiError(`An error accurred while deleting class ${id}`, 500));
  }
};

exports.deleteAllClass = async (req, res, next) => {
  try {
    const result = await classService.deleteAll();
    return res.send({
      message: `${result.deletedCount} classs were deleted successfully`,
    });
  } catch (error) {
    next(new ApiError("An error accurred while deleting classs", 500));
  }
};

exports.addToClass = async (req, res, next) => {
  const {userid, classid} = req.body
  try {
    result = await classService.addToClass(userid, classid)
    return res.send(result);
  } catch (error) {
    next(new ApiError("Lỗi khi thêm lớp học", 500));
  }
};
