const { ObjectId } = require("mongodb");

class ProgressService {
  constructor(databaseServices) {
    this.databaseServices = databaseServices;
  }

  extractProgressData(progress) {
    const _progress = { ...progress };

    Object.keys(_progress).forEach(
      (key) => _progress[key] === undefined && delete _progress[key]
    );
    return _progress;
  }

  async createProgress(data) {
    const progress = this.extractProgressData(data);
    const result = await this.databaseServices.progress.findOneAndUpdate(
      progress,
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
      const progress = await this.databaseServices.progress.findOne({
        _id: new ObjectId(id),
      });
      if (!progress) {
        return null;
      }
      return progress; 
    } catch (error) {
      throw new Error(error);
    }
  }

  async findByUserIdAndClassId(userid, classid) {
    try {
      const progress = await this.databaseServices.progress.find({
        userid: userid,
        classid: classid,
      }).toArray();
      return progress; 
    } catch (error) {
      throw new Error(error);
    }
  }
  async findByUserIdAndLessonId(userid, lessonid) {
    try {
      const progress = await this.databaseServices.progress.findOne({
        userid: userid,
        lessonid: lessonid,
      });
      return progress; 
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll() {
    try {
      const progress = await this.databaseServices.progress.find().toArray();
      return progress;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteOneProgress(progress_id) {
    try {
      const progress = await this.databaseServices.progress.findOneAndDelete({
        _id: new ObjectId(progress_id),
      });
      return progress;
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id, updateProgress) {
    const filter ={
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    }
    const update = this.extractProgressData(updateProgress);
    const options = {
      returnDocument: "after",
    };
    try {
      const progress = await this.databaseServices.progress.findOneAndUpdate(
        filter,
        {
          $set: update,
        },
        options
      );
      return progress;
    } catch (error) {
      throw new Error(error);
    }
}

}
const databaseSetvices = require("../utils/mongodb.util");
const progressService = new ProgressService(databaseSetvices);
module.exports = progressService;;