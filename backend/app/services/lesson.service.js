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
    const result = await this.databaseSetvices.excercise.findOneAndUpdate(
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
      const group = await this.databaseSetvices.excercise.findOne({
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

  async findAllPaged(page, limit) {
    try {
      const skip = (page - 1) * limit;
      const lesson = await this.databaseSetvices.lesson.find().skip(skip).limit(limit).toArray();
      return lesson;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  async findByNamePaged(name, page, limit) {
    try {
      const skip = (page - 1) * limit;
      const lesson = await this.databaseSetvices.lesson
        .find({
          name: {
            $regex: new RegExp(name),
            $options: "i",
          },
        })
        .skip(skip)
        .limit(limit)
        .toArray();
      return lesson;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  async findByCategoryPaged(category, page, limit) {
    try {
      const skip = (page - 1) * limit;
      const lesson = await this.databaseSetvices.lesson
        .find({
          category: category,
        })
        .skip(skip)
        .limit(limit)
        .toArray();
      return lesson;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  async findByNameAndCategoryPaged(name, category, page, limit) {
    try {
      const skip = (page - 1) * limit;
      const lesson = await this.databaseSetvices.lesson
        .find({
          name: {
            $regex: new RegExp(name),
            $options: "i",
          },
          category: category,
        })
        .skip(skip)
        .limit(limit)
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
}
const databaseSetvices = require("../utils/mongodb.util");
const groupService = new GroupService(databaseSetvices);
module.exports = groupService;