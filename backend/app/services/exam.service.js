const { ObjectId } = require("mongodb");

class ExamService {
  constructor(databaseServices) {
    this.databaseServices = databaseServices;
  }

  extractExamData(exam) {
    const _exam = { ...exam };

    Object.keys(_exam).forEach(
      (key) => _exam[key] === undefined && delete _exam[key]
    );
    return _exam;
  }

  async createExam(data) {
    const exam = this.extractExamData(data);
    const result = await this.databaseServices.exam.findOneAndUpdate(
      exam,
      {
        $setOnInsert: {},
      },
      {
        upsert: true,
        returnDocument: "after",
      }
    );
    return result;
  }

  async findById(id) {
    try {
      const exam = await this.databaseServices.exam.findOne({
        _id: new ObjectId(id),
      });
      if (!exam) {
        return null;
      }
      return exam; 
    } catch (error) {
      throw new Error(error);
    }
  }

  async findByLessonId(lessonId) {
    try {
        const exam = await this.databaseServices.exam.find({
            lessonId: lessonId,
        }).toArray(); // Thêm dấu ngoặc để gọi hàm toArray
        return exam; 
    } catch (error) {
        throw new Error(error);
    }
}


  async findAll() {
    try {
      const exam = await this.databaseServices.exam.find().toArray();
      return exam;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteOneExam(exam_id) {
    try {
      const exam = await this.databaseServices.exam.findOneAndDelete({
        _id: new ObjectId(exam_id),
      });
      return exam;
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id, updateExam) {
    const filter ={
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    }
    const update = this.extractExamData(updateExam);
    const options = {
      returnDocument: "after",
    };
    try {
      const exam = await this.databaseServices.exam.findOneAndUpdate(
        filter,
        {
          $set: update,
        },
        options
      );
      return exam;
    } catch (error) {
      throw new Error(error);
    }
}

}
const databaseSetvices = require("../utils/mongodb.util");
const examService = new ExamService(databaseSetvices);
module.exports = examService;;