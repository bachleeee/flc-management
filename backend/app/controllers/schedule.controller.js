const ApiError = require("../api-error");
const scheduleService = require("../services/schedule.service");

exports.createSchedule = async (req, res, next) => {
  try {
    const result = await scheduleService.createSchedule(req.body);
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
      documents = await scheduleService.findByName(name);
    } else {
      documents = await scheduleService.findAll();
    }
  } catch (error) {
    next(new ApiError("An error occurred while retrieving schedules", 500));
  }
  return res.send(documents);
};


exports.findAllByDate = async (req, res, next) => {
  let documents = [];
  try {
    const { date } = req.params

    documents = await scheduleService.findAllByDate(date);

  } catch (error) {
    next(new ApiError("An error occurred while retrieving schedules", 500));
  }
  return res.send(documents);
};

exports.findAllByShiftAndDate = async (req, res, next) => {
  let documents = [];
  try {
    const { buoi, date } = req.query

    documents = await scheduleService.findAllByShiftAndDate(buoi, date);

  } catch (error) {
    next(new ApiError("An error occurred while retrieving schedules", 500));
  }
  return res.send(documents);
};

exports.findOneBySlug = async (req, res, next) => {
  const { slug } = req.params;
  try {
    const document = await scheduleService.findBySlug(slug);
    if (!document) {
      return next(new ApiError(`Schedule with slug ${slug} not found`, 404));
    }
    return res.send(document);
  } catch (error) {
    next(new ApiError(`An error accurred while retrieving schedule ${slug}`, 500));
  }
};

exports.findOne = async (req, res, next) => {
  const { id } = req.params;
  try {
    const document = await scheduleService.findById(id);
    if (!document) {
      return next(new ApiError(`Schedule with id ${id} not found`, 404));
    }
    return res.send(document);
  } catch (error) {
    next(new ApiError(`An error accurred while retrieving schedule ${id}`, 500));
  }
};

exports.update = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new ApiError("Update data cannot be empty", 400));
  }
  const { id } = req.params;

  const updatedData = {
    phong: req.body.phong,
    buoi: req.body.buoi,
  };

  try {

    if (req.body.gioBatDau) {
      const gioBatDau = new Date(req.body.gioBatDau);
      const gioKetThuc = new Date(gioBatDau);

      gioKetThuc.setHours(gioKetThuc.getHours() + 2);

      updatedData.gioKetThuc = gioKetThuc;
      updatedData.gioBatDau = gioBatDau;
    }

    const updatedDocument = await scheduleService.update(id, updatedData);

    return res.send(updatedDocument);
  } catch (error) {
    next(new ApiError(`An error occurred while updating class ${id}`, 500));
  }
};

exports.deleteSchedule = async (req, res, next) => {
  const { id } = req.params;
  try {
    const document = await scheduleService.deleteOne(id);
    if (!document) {
      return next(new ApiError(`Schedule with id ${id} not found`, 404));
    }
    return res.send({
      message: `Schedule with id ${id} was deleted successfully`,
    });
  } catch (error) {
    next(new ApiError(`An error accurred while deleting schedule ${id}`, 500));
  }
};

exports.deleteAllSchedules = async (req, res, next) => {
  try {
    const result = await scheduleService.deleteAll();
    return res.send({
      message: `${result.deletedCount} schedules were deleted successfully`,
    });
  } catch (error) {
    next(new ApiError("An error accurred while deleting schedules", 500));
  }
};

exports.createDaysOff = async (req, res, next) => {
  try {
    const ngayBatDau = new Date(req.body.ngayBatDau)
    const ngayKetThuc = new Date(req.body.ngayKetThuc)

    const data = {
      ngayBatDau,
      ngayKetThuc,
      noiDung: req.body.noiDung
    }

    const result = await scheduleService.createDaysOff(data);
    return res.send(result);
  } catch (error) {
    next(new ApiError("Lỗi tạo phòng học", 500));
  }
};

exports.findAllDaysOff = async (req, res, next) => {
  let documents = [];
  try {
  
    documents = await scheduleService.findAllDaysOff();
    
  } catch (error) {
    next(new ApiError("An error occurred while retrieving schedules", 500));
  }
  return res.send(documents);
};
exports.createDaysOff = async (req, res, next) => {
  try {
    const ngayBatDau = new Date(req.body.ngayBatDau)
    const ngayKetThuc = new Date(req.body.ngayKetThuc)

    const data = {
      ngayBatDau,
      ngayKetThuc,
      noiDung: req.body.noiDung
    }

    const result = await scheduleService.createDaysOff(data);
    return res.send(result);
  } catch (error) {
    next(new ApiError("Lỗi tạo ngày nghỉ", 500));
  }
};

exports.updateDaysOff = async (req, res, next) => {

  if (Object.keys(req.body).length === 0) {
    return next(new ApiError("Update data cannot be empty", 400));
  }
  const { id } = req.params;

  const updatedData = {
    ngayBatDau: req.body.ngayBatDau,
    ngayKetThuc: req.body.ngayKetThuc,
    noiDung: req.body.noiDung
  };
  try {
    const result = await scheduleService.updateDaysOff(id,updatedData);
    return res.send(result);
  } catch (error) {
    next(new ApiError("Lỗi tạo ngày nghỉ", 500));
  }
};

exports.deleteDaysOff = async (req, res, next) => {
  try {
    const ngayBatDau = new Date(req.body.ngayBatDau)
    const ngayKetThuc = new Date(req.body.ngayKetThuc)

    const data = {
      ngayBatDau,
      ngayKetThuc,
      noiDung: req.body.noiDung
    }

    const result = await scheduleService.createDaysOff(data);
    return res.send(result);
  } catch (error) {
    next(new ApiError("Lỗi tạo ngày nghỉ", 500));
  }
};