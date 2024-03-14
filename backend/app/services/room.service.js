const { ObjectId } = require("mongodb");

class RoomService {
  constructor(databaseServices) {
    this.databaseServices = databaseServices;
  }

  extractRoomData(room) {
    const _room = { ...room };

    Object.keys(_room).forEach(
      (key) => _room[key] === undefined && delete _room[key]
    );
    return _room;
  }

  async createRoom(data) {
    const room = this.extractRoomData(data);
    const result = await this.databaseServices.room.findOneAndUpdate(
      room,
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
      const room = await this.databaseServices.room.findOne({
        _id: new ObjectId(id),
      });
      if (!room) {
        return null;
      }
      return room; 
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll() {
    try {
      const room = await this.databaseServices.room.find().toArray();
      return room;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findByNamePaged(name) {
    try {
      const room = await this.databaseSetvices.room
        .find({
          name: {
            $regex: new RegExp(name),
            $options: "i",
          },
        })
        .toArray();
      return room;
    } catch (error) {
      throw new Error(error);
    }
  }
  async deleteOneRoom(room_id) {
    try {
      const room = await this.databaseServices.room.findOneAndDelete({
        _id: new ObjectId(room_id),
      });
      return room;
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id, updateRoom) {
    const filter ={
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    }
    const update = this.extractRoomData(updateRoom);
    const options = {
      returnDocument: "after",
    };
    try {
      const room = await this.databaseServices.room.findOneAndUpdate(
        filter,
        {
          $set: update,
        },
        options
      );
      return room;
    } catch (error) {
      throw new Error(error);
    }
}

}
const databaseSetvices = require("../utils/mongodb.util");
const roomService = new RoomService(databaseSetvices);
module.exports = roomService;;