const { ObjectId } = require("mongodb");

class GroupService {
  constructor(databaseSetvices) {
    this.databaseSetvices = databaseSetvices;
  }
  extractGroupData(group) {
    const _group = { ...group };

    // Remove undifined fileds
    Object.keys(_group).forEach(
      (key) => _group[key] === undefined && delete _group[key]
    );
    return _group;
  }

  async create(data) {
    const group = this.extractGroupData(data);
    const result = await this.databaseSetvices.class.findOneAndUpdate(
      group,
      {
        $set: { siso: 0, students: [], teachers: [] },
      },
      {
        upsert: true,
        returnDocument: "after",
      }
    );
    return result;
  }

  async createSchedule(data) {
    const group = this.extractGroupData(data);
    const result = await this.databaseSetvices.schedule.findOneAndUpdate(
      group,
      {
        $set: {},
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
      const groups = await this.databaseSetvices.class.find().toArray();
      return groups;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findClassByStudentId(studentId) {
    try {
      const groups = await this.databaseSetvices.class.find({
        students: { $elemMatch: { id: studentId } }
      }).toArray();
      return groups;
    } catch (error) {
      throw new Error(error);
    }
  }
  async findClassByTeacherId(teacherId) {
    try {
      const groups = await this.databaseSetvices.class.find({
        teachers: { $elemMatch: { id: teacherId } }
      }).toArray();
      return groups;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findByCourseId(courseid) {
    try {
      const group = await this.databaseSetvices.class.find({
        courseid: courseid,
      }).toArray();
      return group;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findByIdtoArray(data) {
    try {
      const group = await this.databaseSetvices.class.find({
        courseid: courseid,
      }).toArray();
      return group;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findBycourseSlug(courseSlug) {
    try {
      const groups = await this.databaseSetvices.class
        .find({
          courseSlug: courseSlug,
        })
        .toArray();
      return groups;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findBySlug(slug) {
    try {
      const group = await this.databaseSetvices.class.findOne({
        slug: slug,
      });
      return group;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findById(id) {
    try {
      const group = await this.databaseSetvices.class.findOne({
        _id: new ObjectId(id),
      });
      if (!group) {
        return null;
      }
      return group;
    } catch (error) {
      throw new Error(error);
    }
  }
  async findScheduleById(id) {
    try {
      const group = await this.databaseSetvices.schedule.findOne({
        _id: new ObjectId(id),
      });
      if (!group) {
        return null;
      }
      return group;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findByname(tenlop) {
    try {
      const group = await this.databaseSetvices.class.findOne({
        tenlop: tenlop,
      });
      return group;
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id, updateGroup) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    }
    const update = this.extractGroupData(updateGroup);
    const options = {
      returnDocument: "after",
    };
    try {
      const group = await this.databaseSetvices.class.findOneAndUpdate(
        filter,
        {
          $set: update,
        },
        options
      );
      return group;
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateSchedule(id, updateGroup) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    }
    const update = this.extractGroupData(updateGroup);
    const options = {
      returnDocument: "after",
    };

    try {
      const group = await this.databaseSetvices.schedule.findOneAndUpdate(
        filter,
        {
          $set: update,
        },
        options
      );
      return group;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteOne(id) {
    try {
      const group = await this.databaseSetvices.class.findOneAndDelete({
        _id: new ObjectId(id),
      });
      return group;
    } catch (error) {
      throw new Error(error);
    }
  }
  async deleteSchedule(tenlop) {
    try {
      const schedule = await this.databaseSetvices.schedule.deleteMany({
        tenlop: tenlop
      });
      return schedule;
    } catch (error) {
      throw new Error(error);
    }
  }
  async deleteAll() {
    try {
      const groups = await this.databaseSetvices.class.deleteMany();
      return groups;
    } catch (error) {
      throw new Error(error);
    }
  }

  async addToClass(classId, studentName, studentId) {
    const filter = {
      _id: new ObjectId(classId),
    };

    const update = {
      $addToSet: {
        students: { name: studentName, id: studentId }
      },
    };

    const options = {
      returnDocument: 'after',
    };

    try {
      let updatedClass = await this.databaseSetvices.class.findOneAndUpdate(
        filter,
        update,
        options
      );

      if (!updatedClass) {
        throw new Error('Class not found');
      }

      return updatedClass;
    } catch (error) {
      throw new Error(error);
    }
  }


}
const databaseSetvices = require("../utils/mongodb.util");
const groupService = new GroupService(databaseSetvices);
module.exports = groupService;