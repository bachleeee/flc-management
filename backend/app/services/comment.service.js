const { ObjectId } = require("mongodb");

class CommentService {
  constructor(databaseServices) {
    this.databaseServices = databaseServices;
  }

  extractCommentData(comment) {
    const _comment = { ...comment };

    Object.keys(_comment).forEach(
      (key) => _comment[key] === undefined && delete _comment[key]
    );
    return _comment;
  }

  async createComment(data) {
    const comment = this.extractCommentData(data);
    const result = await this.databaseServices.comment.findOneAndUpdate(
      comment,
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
      const comment = await this.databaseServices.comment.findOne({
        _id: new ObjectId(id),
      });
      if (!comment) {
        return null;
      }
      return comment; 
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll() {
    try {
      const comment = await this.databaseServices.comment.find().toArray();
      return comment;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteOneComment(comment_id) {
    try {
      const comment = await this.databaseServices.comment.findOneAndDelete({
        _id: new ObjectId(comment_id),
      });
      return comment;
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id, updateComment) {
    const filter ={
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    }
    const update = this.extractCommentData(updateComment);
    const options = {
      returnDocument: "after",
    };
    try {
      const comment = await this.databaseServices.comment.findOneAndUpdate(
        filter,
        {
          $set: update,
        },
        options
      );
      return comment;
    } catch (error) {
      throw new Error(error);
    }
}

}
const databaseSetvices = require("../utils/mongodb.util");
const commentService = new CommentService(databaseSetvices);
module.exports = commentService;;