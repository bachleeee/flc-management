const { ObjectId } = require("mongodb");

class AnnounceService {
  constructor(databaseServices) {
    this.databaseServices = databaseServices;
  }

  extractAnnounceData(announce) {
    const _announce = { ...announce };

    Object.keys(_announce).forEach(
      (key) => _announce[key] === undefined && delete _announce[key]
    );
    return _announce;
  }

  async createAnnounce(data) {
    const announce = this.extractAnnounceData(data);
    const result = await this.databaseServices.announce.findOneAndUpdate(
      announce,
      {
        $setOnInsert: { isSeen: false},
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
      const announce = await this.databaseServices.announce.findOne({
        _id: new ObjectId(id),
      });
      if (!announce) {
        return null;
      }
      return announce; 
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll() {
    try {
      const announce = await this.databaseServices.announce.find().toArray();
      return announce;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findByUserId(id) {
    try {
      const announce = await this.databaseServices.announce
        .find({
          toUser: { $elemMatch: { id: { $regex: new RegExp(id), $options: "i" } } }
        })
        .toArray();
      return announce;
    } catch (error) {
      throw new Error(error);
    }
  }
  

  async deleteOneAnnounce(announce_id) {
    try {
      const announce = await this.databaseServices.announce.findOneAndDelete({
        _id: new ObjectId(announce_id),
      });
      return announce;
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id, updateAnnounce) {
    const filter ={
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    }
    const update = this.extractAnnounceData(updateAnnounce);
    const options = {
      returnDocument: "after",
    };
    try {
      const announce = await this.databaseServices.announce.findOneAndUpdate(
        filter,
        {
          $set: update,
        },
        options
      );
      return announce;
    } catch (error) {
      throw new Error(error);
    }
}

}
const databaseSetvices = require("../utils/mongodb.util");
const announceService = new AnnounceService(databaseSetvices);
module.exports = announceService;;