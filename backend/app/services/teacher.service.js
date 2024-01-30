const { ObjectId } = require("mongodb");

class TeacherService {
  constructor(databaseSetvices) {
    this.databaseSetvices = databaseSetvices;
  }
  extractTeacherData(teacher) {
    const _teacher = { ...teacher };

    // Remove undifined fileds
    Object.keys(_teacher).forEach(
      (key) => _teacher[key] === undefined && delete _teacher[key]
    );
    return _teacher;
  }

  async create(data) {
    const teacher = this.extractTeacherData(data);
    const result = await this.databaseSetvices.teacher.findOneAndUpdate(
      teacher,
      {
        $setOnInsert: { role: "student" },
      },
      {
        upsert: true,
        returnDocument: "after",
      }
    );
    return result;
  }

  async createTeacherDegree(data) {
    const teacher = this.extractTeacherData(data);
    const result = await this.databaseSetvices.degree.findOneAndUpdate(
      teacher,
      {
        $setOnInsert: { },
      },
      {
        upsert: true,
        returnDocument: "after",
      }
    );
    return result;
  }
  
  async createTeacherDegree(data) {
    const teacher = this.extractTeacherData(data);
    const result = await this.databaseSetvices.exp.findOneAndUpdate(
      teacher,
      {
        $setOnInsert: { },
      },
      {
        upsert: true,
        returnDocument: "after",
      }
    );
    return result;
  }

  async findAll() {
    try {
      const teachers = await this.databaseSetvices.teacher.find().toArray();
      return teachers;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findByName(name) {
    try {
      const teachers = await this.databaseSetvices.teacher
        .find({
          name: {
            $regex: new RegExp(name),
            $options: "i",
          },
        })
        .toArray();
      return teachers;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  async findById(id) {
    try {
      const teacher = await this.databaseSetvices.teacher.findOne({
        _id: new ObjectId(id),
      });
      return teacher;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  async update(id, updateTeacher) {
    const filter ={
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    }
    const update = this.extractTeacherData(updateTeacher);
    const options = {
      returnDocument: "after",
    };
    try {
      const teacher = await this.databaseSetvices.teacher.findOneAndUpdate(
        filter,
        {
          $set: update,
        },
        options
      );
      return teacher;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  async addCart(id, products) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };
  
    const update = { $push: { cart: { $each: products } } };
  
    const options = {
      returnDocument: 'after',
    };
  
    try {
      const updatedTeacher  = await this.databaseSetvices.teacher.findOneAndUpdate(
        filter,
        update,
        options
      );
      return updatedTeacher ;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  async deleteOne(id) {
    try {
      const teacher = await this.databaseSetvices.teacher.findOneAndDelete({
        _id: new ObjectId(id),
      });
      return teacher;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteOneCart(teacherId, productId) {
    try {
      const teacher = await this.databaseSetvices.teacher.findOneAndUpdate(
        { _id: new ObjectId(teacherId) },
        { $pull: { cart: { product: productId } } },
        { returnDocument: 'after' }
      );
      return teacher;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  async deleteAll() {
    try {
      const teachers = await this.databaseSetvices.teacher.deleteMany();
      return teachers;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findTeacher(email) {
    try {
      const teacher = await this.databaseSetvices.teacher.findOne({ email });
      return teacher;
    } catch (error) {
      throw new Error(error);
    }
  }
}
const databaseSetvices = require("../utils/mongodb.util");
const teacherService = new TeacherService(databaseSetvices);
module.exports = teacherService;