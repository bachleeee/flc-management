const config = require("../config/index");
const { MongoClient } = require("mongodb");
class DatabaseServices {
  constructor() {
    this.client = new MongoClient(config.db.uri);
    this.db = this.client.db(config.db.name);
  }
  async connect() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await this.client.connect();
      // Send a ping to confirm a successful connection
      await this.db.command({ ping: 1 });
      console.log(
        "You successfully connected to MongoDB!"
      );
    } finally {
      // Ensures that the client will close when you finish/error
      // await this.client.close()
    }
  }
  get users() {
    return this.db.collection("users");
  }
  get course() {
    return this.db.collection("course");
  }
  get category() {
    return this.db.collection("category");
  }
  get cart() {
    return this.db.collection("cart");
  }
  get order() {
    return this.db.collection("order");
  }
  get class() {
    return this.db.collection("class");
  }
  get schedule() {
    return this.db.collection("schedule");
  }
  get lesson() {
    return this.db.collection("lesson");
  }
  get exam() {
    return this.db.collection("exam");
  }
  get progress() {
    return this.db.collection("progress");
  }
  get document() {
    return this.db.collection("document");
  }
  get video() {
    return this.db.collection("video");
  }
  get teacher() {
    return this.db.collection("teacher");
  }
  get degree() {
    return this.db.collection("degree");
  }
  get exp() {
    return this.db.collection("exp");
  }
  get comment() {
    return this.db.collection("comment");
  }
  get reply() {
    return this.db.collection("reply");
  }
  get voucher() {
    return this.db.collection("voucher");
  }
  get question() {
    return this.db.collection("question");
  }
  get history() {
    return this.db.collection("history");
  }
}
const databaseSetvices = new DatabaseServices();
module.exports = databaseSetvices;