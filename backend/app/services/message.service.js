const { ObjectId } = require("mongodb");

class MessageService {
  constructor(databaseServices) {
    this.databaseServices = databaseServices;
  }

  extractMessageData(message) {
    const _message = { ...message };

    Object.keys(_message).forEach(
      (key) => _message[key] === undefined && delete _message[key]
    );
    return _message;
  }

  async createMessage(data) {
    const message = this.extractMessageData(data);
    const result = await this.databaseServices.message.findOneAndUpdate(
      message,
      {
        $setOnInsert: { isSeen: []},
      },
      {
        upsert: true,
        returnDocument: "after",
      }
    );
    return result;
  }
  async createGroup(data) {
    const message = this.extractMessageData(data);
    const result = await this.databaseServices.group.findOneAndUpdate(
      message,
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

  async getMyGroups(userId) {
    try {
        const messages = await this.databaseServices.group.find({
            members: {
                $elemMatch: {
                    id: userId
                }
            }
        }).toArray();

        if (messages.length === 0) {
            return null;
        }

        return messages;
    } catch (error) {
        throw new Error(error);
    }
}

  
  async findById(id) {
    try {
      const message = await this.databaseServices.message.findOne({
        _id: new ObjectId(id),
      });
      if (!message) {
        return null;
      }
      return message; 
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(groupid) {
    try {
      const message = await this.databaseServices.message.find({
        groupid:groupid
      }).toArray();
      return message;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteOneMessage(message_id) {
    try {
      const message = await this.databaseServices.message.findOneAndDelete({
        _id: new ObjectId(message_id),
      });
      return message;
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id, updateMessage) {
    const filter ={
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    }
    const update = this.extractMessageData(updateMessage);
    const options = {
      returnDocument: "after",
    };
    try {
      const message = await this.databaseServices.message.findOneAndUpdate(
        filter,
        {
          $set: update,
        },
        options
      );
      return message;
    } catch (error) {
      throw new Error(error);
    }
}

}
const databaseSetvices = require("../utils/mongodb.util");
const messageService = new MessageService(databaseSetvices);
module.exports = messageService;;