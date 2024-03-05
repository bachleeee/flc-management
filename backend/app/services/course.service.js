const { ObjectId } = require("mongodb");

class ProductService {
  constructor(databaseSetvices) {
    this.databaseSetvices = databaseSetvices;
  }
  extractProductData(product) {
    const _product = { ...product };

    // Remove undifined fileds
    Object.keys(_product).forEach(
      (key) => _product[key] === undefined && delete _product[key]
    );
    return _product;
  }
  
  async create(data) {
    const product = this.extractProductData(data);
    const result = await this.databaseSetvices.course.findOneAndUpdate(
      product,
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

  async findAllPaged() {
    try {
      const products = await this.databaseSetvices.course.find().toArray();
      return products;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  async findByNamePaged(name) {
    try {
      const products = await this.databaseSetvices.course
        .find({
          name: {
            $regex: new RegExp(name),
            $options: "i",
          },
        })
        .toArray();
      return products;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  // async findByCategoryPaged(category, page, limit) {
  //   try {
  //     const skip = (page - 1) * limit;
  //     const products = await this.databaseSetvices.course
  //       .find({
  //         category: category,
  //       })
  //       .skip(skip)
  //       .limit(limit)
  //       .toArray();
  //     return products;
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // }
  
  // async findByNameAndCategoryPaged(name, category, page, limit) {
  //   try {
  //     const skip = (page - 1) * limit;
  //     const products = await this.databaseSetvices.course
  //       .find({
  //         name: {
  //           $regex: new RegExp(name),
  //           $options: "i",
  //         },
  //         category: category,
  //       })
  //       .skip(skip)
  //       .limit(limit)
  //       .toArray();
  //     return products;
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // }

  async findBySlug(slug) {
    try {
      const product = await this.databaseSetvices.course.findOne({
        slug: slug,
      });
      return product;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  async findById(id) {
    try {
      const product = await this.databaseSetvices.course.findOne({
        _id: new ObjectId(id),
      });
      if (!product) {
        return null;
      }
      return product; 
    } catch (error) {
      throw new Error(error);
    }
  }
  
  async findClassById(id) {
    try {
      const product = await this.databaseSetvices.class.findOne({
        _id: new ObjectId(id),
      });
      if (!product) {
        return null;
      }
      return product; 
    } catch (error) {
      throw new Error(error);
    }
  }f

  async update(id, updateProduct) {
    const filter ={
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    }
    const update = this.extractProductData(updateProduct);
    const options = {
      returnDocument: "after",
    };

    try {
      const product = await this.databaseSetvices.course.findOneAndUpdate(
        filter,
        {
          $set: update,
        },
        options
      );
      return product;
    } catch (error) {
      throw new Error(error);
    }
  }
  async deleteOne(id) {
    try {
      const product = await this.databaseSetvices.course.findOneAndDelete({
        _id: new ObjectId(id),
      });
      return product;
    } catch (error) {
      throw new Error(error);
    }
  }
  async deleteAll() {
    try {
      const products = await this.databaseSetvices.course.deleteMany();
      return products;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getCat() {
    try {
      const products = await this.databaseSetvices.category.find().toArray();
      return products;
    } catch (error) {
      throw new Error(error)
    }
  }

  async createCat(data) {
    const product = this.extractProductData(data);
    const result = await this.databaseSetvices.category.findOneAndUpdate(
      product,
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

  async addToCourse(userId, courseId) {
    const filter = {
      _id: new ObjectId(courseId),
    };
  
    const update = {
      $addToSet: {
        students: userId,
      },
    };
  
    const options = {
      returnDocument: 'after',
    };
  
    try {
      const updatedcourse = await this.databaseSetvices.course.findOneAndUpdate(
        filter,
        update,
        options
      );
      return updatedcourse;
    } catch (error) {
      throw new Error(error);
    }
  }
}
const databaseSetvices = require("../utils/mongodb.util");
const productService = new ProductService(databaseSetvices);
module.exports = productService;