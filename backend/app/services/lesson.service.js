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
    const lesson = this.extractGroupData(data);
    const result = await this.databaseSetvices.lesson.findOneAndUpdate(
      lesson,
      {
        $set: { },
      },
      {
        upsert: true,
        returnDocument: "after",
      }
    );
    return result;
  }

  async createDoc(data) {
    const group = this.extractGroupData(data);
    const result = await this.databaseSetvices.document.findOneAndUpdate(
      group,
      {
        $set: { },
      },
      {
        upsert: true,
        returnDocument: "after",
      }
    );
    return result;
  }

  async createVid(data) {
    const group = this.extractGroupData(data);
    const result = await this.databaseSetvices.video.findOneAndUpdate(
      group,
      {
        $set: { },
      },
      {
        upsert: true,
        returnDocument: "after",
      }
    );
    return result;
  }

  async createEx(data) {
    const group = this.extractGroupData(data);
    const result = await this.databaseSetvices.exam.findOneAndUpdate(
      group,
      {
        $set: { },
      },
      {
        upsert: true,
        returnDocument: "after",
      }
    );
    return result;
  }

  async findExById(id) {
    try {
      const group = await this.databaseSetvices.exam.findOne({
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

  async findAll() {
    try {
      const lesson = await this.databaseSetvices.lesson.find().toArray();
      return lesson;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  async findByName(name) {
    try {
      const lesson = await this.databaseSetvices.lesson
        .find({
          name: {
            $regex: new RegExp(name),
            $options: "i",
          },
        })
        .toArray();
      return lesson;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  async findBySlug(slug) {
    try {
      const group = await this.databaseSetvices.lesson.findOne({
        slug: slug,
      });
      return group;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  async findById(id) {
    try {
      const group = await this.databaseSetvices.lesson.findOne({
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
  async findExamById(id) {
    try {
      const group = await this.databaseSetvices.exam.findOne({
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
  async findVidById(id) {
    try {
      const group = await this.databaseSetvices.video.findOne({
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
  async findDocById(id) {
    try {
      const group = await this.databaseSetvices.document.findOne({
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
  async findDocByLessonId(lessonid) {
    try {
      const group = await this.databaseSetvices.document.find({
        lessonid: lessonid
      }).toArray();
      if (!group) {
        return null;
      }
      return group; 
    } catch (error) {
      throw new Error(error);
    }
  }
  async findVidByLessonId(lessonid) {
    try {
      const group = await this.databaseSetvices.video.find({
        lessonid: lessonid
      }).toArray();
      if (!group) {
        return null;
      }
      return group; 
    } catch (error) {
      throw new Error(error);
    }
  }
  async findExByLessonId(lessonid) {
    try {
      const group = await this.databaseSetvices.exam.find({
        lessonid: lessonid
      }).toArray();
      if (!group) {
        return null;
      }
      return group; 
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id, updateGroup) {
    const filter ={
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    }
    const update = this.extractGroupData(updateGroup);
    const options = {
      returnDocument: "after",
    };

    try {
      const group = await this.databaseSetvices.lesson.findOneAndUpdate(
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
  async updateVid(id, updateGroup) {
    const filter ={
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    }
    const update = this.extractGroupData(updateGroup);
    const options = {
      returnDocument: "after",
    };

    try {
      const group = await this.databaseSetvices.video.findOneAndUpdate(
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
  async updateDoc(id, updateGroup) {
    const filter ={
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    }
    const update = this.extractGroupData(updateGroup);
    const options = {
      returnDocument: "after",
    };

    try {
      const group = await this.databaseSetvices.document.findOneAndUpdate(
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
  async updateExam(id, updateGroup) {
    const filter ={
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    }
    const update = this.extractGroupData(updateGroup);
    const options = {
      returnDocument: "after",
    };

    try {
      const group = await this.databaseSetvices.exam.findOneAndUpdate(
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
      const group = await this.databaseSetvices.lesson.findOneAndDelete({
        _id: new ObjectId(id),
      });
      return group;
    } catch (error) {
      throw new Error(error);
    }
  }
  async deleteOneVid(id) {
    try {
      const group = await this.databaseSetvices.video.findOneAndDelete({
        _id: new ObjectId(id),
      });
      return group;
    } catch (error) {
      throw new Error(error);
    }
  }
  async deleteOneDoc(id) {
    try {
      const group = await this.databaseSetvices.document.findOneAndDelete({
        _id: new ObjectId(id),
      });
      return group;
    } catch (error) {
      throw new Error(error);
    }
  }
  async deleteAll() {
    try {
      const lesson = await this.databaseSetvices.lesson.deleteMany();
      return lesson;
    } catch (error) {
      throw new Error(error);
    }
  }
  async findByClassName(className) {
    try {
      const group = await this.databaseSetvices.lesson.find({
        className: className,
      }).toArray();
      return group;
    } catch (error) {
      throw new Error(error);
    }
  }
}
const databaseSetvices = require("../utils/mongodb.util");
const groupService = new GroupService(databaseSetvices);
module.exports = groupService;