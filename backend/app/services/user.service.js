const { ObjectId } = require("mongodb");

class UserService {
  constructor(databaseSetvices) {
    this.databaseSetvices = databaseSetvices;
  }
  extractUserData(user) {
    const _user = { ...user };

    // Remove undifined fileds
    Object.keys(_user).forEach(
      (key) => _user[key] === undefined && delete _user[key]
    );
    return _user;
  }

  async create(data) {
    const user = this.extractUserData(data);
    const result = await this.databaseSetvices.users.findOneAndUpdate(
      user,
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
      const users = await this.databaseSetvices.users.find().toArray();
      return users;
    } catch (error) {
      throw new Error(error);
    }
  }
  async findAllOfClass(className) {
    try {
      const users = await this.databaseSetvices.users.find().toArray();
      const usersWithClass = users.filter(user => user.myClass && user.myClass.some(classItem => classItem.className === className));
      return usersWithClass;
    } catch (error) {
      throw new Error(error);
    }
  }
  

  async findByName(name) {
    try {
      const users = await this.databaseSetvices.users
        .find({
          name: {
            $regex: new RegExp(name),
            $options: "i",
          },
        })
        .toArray();
      return users;
    } catch (error) {
      throw new Error(error);
    }
  }
  async findByRole(role) {
    try {
      const users = await this.databaseSetvices.users
        .find({
          role: {
            $regex: new RegExp(role),
            $options: "i",
          },
        })
        .toArray();
      return users;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  async findOneByName(name) {
    try {
      const user = await this.databaseSetvices.users.findOne({
       name:name,
      });
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }
  async findById(id) {
    try {
      const user = await this.databaseSetvices.users.findOne({
        _id: new ObjectId(id),
      });
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  async update(id, updateUser) {
    const filter ={
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    }
    const update = this.extractUserData(updateUser);
    const options = {
      returnDocument: "after",
    };
    try {
      const user = await this.databaseSetvices.users.findOneAndUpdate(
        filter,
        {
          $set: update,
        },
        options
      );
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  async addToClass(id, data) {
    const filter = {
      _id: new ObjectId(id),
    };
  
    const update = {
      $push: {
        myClass: data,
      },
    };
    const options = {
      returnDocument: 'after',
    };
    try {
      let updatedUser = await this.databaseSetvices.users.findOne(filter);
  
      if (!updatedUser) {
        // Nếu không tìm thấy người dùng, bạn có thể xử lý theo ý của mình, ví dụ như ném ra một lỗi
        throw new Error('User not found');
      }
  
      if (!updatedUser.myClass) {
        // Nếu mảng myClass không tồn tại, tạo một mảng mới chứa dữ liệu của lớp học mới
        updatedUser.myClass = [data];
      } else {
        // Nếu mảng myClass đã tồn tại, thêm dữ liệu của lớp học mới vào mảng đó
        updatedUser.myClass.push(data);
      }
  
      updatedUser = await this.databaseSetvices.users.findOneAndUpdate(
        filter,
        {
          $set: updatedUser,
        },
        options
      );
  
      return updatedUser;
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
      const updatedUser  = await this.databaseSetvices.users.findOneAndUpdate(
        filter,
        update,
        options
      );
      return updatedUser ;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  async deleteOne(id) {
    try {
      const user = await this.databaseSetvices.users.findOneAndDelete({
        _id: new ObjectId(id),
      });
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteOneCart(userId, productId) {
    try {
      const user = await this.databaseSetvices.users.findOneAndUpdate(
        { _id: new ObjectId(userId) },
        { $pull: { cart: { product: productId } } },
        { returnDocument: 'after' }
      );
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  async deleteAll() {
    try {
      const users = await this.databaseSetvices.users.deleteMany();
      return users;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findUser(email) {
    try {
      const user = await this.databaseSetvices.users.findOne({ email });
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  async addToClass(userId, myClass) {
    const filter = {
      _id: new ObjectId(userId),
    };
  
    const update = {
      $addToSet: {
        myClass: myClass,
      },
    };
  
    const options = {
      returnDocument: 'after',
    };
  
    try {
      const updatedClass = await this.databaseSetvices.users.findOneAndUpdate(
        filter,
        update,
        options
      );
      return updatedClass;
    } catch (error) {
      throw new Error(error);
    }
  }
}
const databaseSetvices = require("../utils/mongodb.util");
const userService = new UserService(databaseSetvices);
module.exports = userService;