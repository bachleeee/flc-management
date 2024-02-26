const ApiError = require("../api-error");
const groupService = require("../services/lesson.service");
const { convertToSlug } = require('../utils/createSlug');

exports.createLesson = async (req, res, next) => {
    try {
        const slug = convertToSlug(req.body.name);
        const productData = {
            ...req.body,
            slug,
        };
        const result = await groupService.create(productData);
        res.send(result);
    } catch (error) {
        next(new ApiError("Lỗi tạo bài học", 500));
    }
};

exports.createDocument = async (req, res, next) => {
    try {
        const result = await groupService.createDoc(req.body);
        res.send(result);
    } catch (error) {
        next(new ApiError("Lỗi tạo tài liệu", 500));
    }
};

exports.createVideo = async (req, res, next) => {
    try {
        const result = await groupService.createVid(req.body);
        res.send(result);
    } catch (error) {
        next(new ApiError("Lỗi tạo video", 500));
    }
};

exports.createExcercise = async (req, res, next) => {
    try {
        const result = await groupService.createEx(req.body);
        res.send(result);
    } catch (error) {
        next(new ApiError("Lỗi tạo bài tập", 500));
    }
};

exports.submitExcercise = async (req, res, next) => {
    const { id } = req.params;
    try {
        const excercise = await groupService.findExById(id);
        if (!excercise) {
            return next(new ApiError(`Group with id ${id} not found`, 404));
        }
        const submittedAnswers = req.body.answers.split(',');

        const correctOptions = [];

        excercise.questions.forEach(question => {
            const correctOption = question.options[question.correctOptionIndex];
            correctOptions.push(correctOption);
        });

        let score = 0;

        for (let i = 0; i < submittedAnswers.length && i < correctOptions.length; i++) {
            if (submittedAnswers[i] === correctOptions[i]) {
                score++;
            }
        }

        return res.send({ score });

    } catch (error) {
        next(new ApiError("Lỗi nộp bài", 500));
    }
};

exports.findOneEx = async (req, res, next) => {
    const { id } = req.params;
    try {
        const document = await groupService.findExById(id);
        if (!document) {
            return next(new ApiError(`Group with id ${id} not found`, 404));
        }
        return res.send(document);
    } catch (error) {
        next(new ApiError(`An error accurred while retrieving group ${id}`, 500));
    }
};

exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const { name, category, page, limit } = req.query;

        const pageNumber = parseInt(page) || 1;
        const limitNumber = parseInt(limit) || 10;

        if (name && category) {
            documents = await groupService.findByNameAndCategoryPaged(
                name,
                category,
                pageNumber,
                limitNumber
            );
        } else if (name) {
            documents = await groupService.findByNamePaged(name, pageNumber, limitNumber);
        } else if (category) {
            documents = await groupService.findByCategoryPaged(category, pageNumber, limitNumber);
        } else {
            documents = await groupService.findAllPaged(pageNumber, limitNumber);
        }
    } catch (error) {
        next(new ApiError("An error occurred while retrieving groups", 500));
    }
    return res.send(documents);
};

exports.getLessonByClassId = async (req, res, next) => {
    const { id } = req.params;
    try {
        let documents = [];
        documents = await groupService.findByClassId(id);
        return res.send(documents);
    } catch (error) {
        next(new ApiError(`An error accurred while retrieving class ${id}`, 500));
    }
};

exports.findOneBySlug = async (req, res, next) => {
    const { slug } = req.params;
    try {
        const document = await groupService.findBySlug(slug);
        if (!document) {
            return next(new ApiError(`Group with slug ${slug} not found`, 404));
        }
        return res.send(document);
    } catch (error) {
        next(new ApiError(`An error accurred while retrieving group ${slug}`, 500));
    }
};

exports.findOne = async (req, res, next) => {
    const { id } = req.params;
    try {
        const document = await groupService.findById(id);
        if (!document) {
            return next(new ApiError(`Group with id ${id} not found`, 404));
        }
        return res.send(document);
    } catch (error) {
        next(new ApiError(`An error accurred while retrieving group ${id}`, 500));
    }
};
exports.findAllDoc = async (req, res, next) => {
    const { lessonid } = req.params;
    try {
        const document = await groupService.findDocByLessonId(lessonid);
        if (!document) {
            return next(new ApiError(`Doc with lessonid ${lessonid} not found`, 404));
        }
        return res.send(document);
    } catch (error) {
        next(new ApiError(`An error accurred while retrieving group ${lessonid}`, 500));
    }
};
exports.findAllVid = async (req, res, next) => {
    const { lessonid } = req.params;
    try {
        const document = await groupService.findVidByLessonId(lessonid);
        if (!document) {
            return next(new ApiError(`Vid with lessonid ${lessonid} not found`, 404));
        }
        return res.send(document);
    } catch (error) {
        next(new ApiError(`An error accurred while retrieving group ${lessonid}`, 500));
    }
};

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError("Update data cannot be empty", 400));
    }
    const { id } = req.params;
    const _data = req.body;
    try {
        const document = await groupService.update(id, _data);
        if (!document) {
            return next(new ApiError(`Group with id ${id} not found`, 404));
        }
        return res.send(document);
    } catch (error) {
        next(new ApiError(`An error accurred while updating group ${id}`, 500));
    }
};
exports.updateDoc = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError("Update data cannot be empty", 400));
    }
    const { id } = req.params;
    const _data = req.body;
    try {
        const document = await groupService.updateDoc(id, _data);
        if (!document) {
            return next(new ApiError(`Group with id ${id} not found`, 404));
        }
        return res.send(document);
    } catch (error) {
        next(new ApiError(`An error accurred while updating group ${id}`, 500));
    }
};
exports.updateVid = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError("Update data cannot be empty", 400));
    }
    const { id } = req.params;
    const _data = req.body;
    try {
        const document = await groupService.updateVid(id, _data);
        if (!document) {
            return next(new ApiError(`Group with id ${id} not found`, 404));
        }
        return res.send(document);
    } catch (error) {
        next(new ApiError(`An error accurred while updating group ${id}`, 500));
    }
};

exports.deleteLesson = async (req, res, next) => {
    const { id } = req.params;
    try {
        const document = await groupService.deleteOne(id);
        if (!document) {
            return next(new ApiError(`Group with id ${id} not found`, 404));
        }
        return res.send({
            message: `Group with id ${id} was deleted successfully`,
        });
    } catch (error) {
        next(new ApiError(`An error accurred while deleting group ${id}`, 500));
    }
};

exports.deleteVid = async (req, res, next) => {
    const { id } = req.params;
    try {
        const document = await groupService.deleteOneVid(id);
        if (!document) {
            return next(new ApiError(`Group with id ${id} not found`, 404));
        }
        return res.send({
            message: `Group with id ${id} was deleted successfully`,
        });
    } catch (error) {
        next(new ApiError(`An error accurred while deleting group ${id}`, 500));
    }
};

exports.deleteDoc = async (req, res, next) => {
    const { id } = req.params;
    try {
        const document = await groupService.deleteOneDoc(id);
        if (!document) {
            return next(new ApiError(`Group with id ${id} not found`, 404));
        }
        return res.send({
            message: `Group with id ${id} was deleted successfully`,
        });
    } catch (error) {
        next(new ApiError(`An error accurred while deleting group ${id}`, 500));
    }
};

exports.deleteAllLessons = async (req, res, next) => {
    try {
        const result = await groupService.deleteAll();
        return res.send({
            message: `${result.deletedCount} groups were deleted successfully`,
        });
    } catch (error) {
        next(new ApiError("An error accurred while deleting groups", 500));
    }
};