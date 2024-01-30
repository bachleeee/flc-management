const { ObjectId } = require("mongodb");

class VoucherService {
  constructor(databaseServices) {
    this.databaseServices = databaseServices;
  }

  extractVoucherData(voucher) {
    const _Voucher = { ...voucher };

    Object.keys(_Voucher).forEach(
      (key) => _Voucher[key] === undefined && delete _Voucher[key]
    );
    return _Voucher;
  }

  async createVoucher(data) {
    const voucher = this.extractVoucherData(data);
    const result = await this.databaseServices.voucher.findOneAndUpdate(
      voucher,
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

  async findByName(name) {
    return await this.databaseServices.voucher.findOne({
      ten: { $regex: new RegExp(name), $options: "i" },
    });
  }

  async findById(id) {
    try {
      const voucher = await this.databaseServices.voucher.findOne({
        _id: new ObjectId(id),
      });
      if (!voucher) {
        return null;
      }
      return voucher;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll() {
    try {
      const voucher = await this.databaseServices.voucher.find().toArray();
      return voucher;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteOneVoucher(Voucher_id) {
    try {
      const voucher = await this.databaseServices.voucher.findOneAndDelete({
        _id: new ObjectId(Voucher_id),
      });
      return voucher;
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id, updateVoucher) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    }
    const update = this.extractVoucherData(updateVoucher);
    const options = {
      returnDocument: "after",
    };
    try {
      const voucher = await this.databaseServices.voucher.findOneAndUpdate(
        filter,
        {
          $set: update,
        },
        options
      );
      return voucher;
    } catch (error) {
      throw new Error(error);
    }
  }

}
const databaseSetvices = require("../utils/mongodb.util");
const voucherService = new VoucherService(databaseSetvices);
module.exports = voucherService;;