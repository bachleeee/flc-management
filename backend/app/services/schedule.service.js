const { ObjectId } = require("mongodb");

class ScheduleService {
  constructor(databaseServices) {
    this.databaseServices = databaseServices;
  }

  extractScheduleData(schedule) {
    const _schedule = { ...schedule };

    Object.keys(_schedule).forEach(
      (key) => _schedule[key] === undefined && delete _schedule[key]
    );
    return _schedule;
  }

  async createSchedule(data) {
    const schedule = this.extractScheduleData(data);
    const result = await this.databaseServices.schedule.findOneAndUpdate(
      schedule,
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
      const schedule = await this.databaseServices.schedule.findOne({
        _id: new ObjectId(id),
      });
      if (!schedule) {
        return null;
      }
      return schedule;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll() {
    try {
      const schedule = await this.databaseServices.schedule.find().toArray();
      return schedule;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findByName(name) {
    try {
      const schedule = await this.databaseServices.schedule
        .find({
          name: {
            $regex: new RegExp(name),
            $options: "i",
          },
        })
        .toArray();
      return schedule;
    } catch (error) {
      throw new Error(error);
    }
  }
  async findAllByDate(date) {
    try {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);

      const schedule = await this.databaseServices.schedule
        .find({
          gioBatDau: {
            $gte: startOfDay,
            $lte: endOfDay,
          },
        })
        .toArray();

      return schedule;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAllByShiftAndDate(buoi, date) {
    try {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);

      const schedule = await this.databaseServices.schedule
        .find({
          buoi: buoi,
          gioBatDau: {
            $gte: startOfDay,
            $lte: endOfDay,
          },
        })
        .toArray();

      return schedule;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteOneSchedule(schedule_id) {
    try {
      const schedule = await this.databaseServices.schedule.findOneAndDelete({
        _id: new ObjectId(schedule_id),
      });
      return schedule;
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id, updateSchedule) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    }
    const update = this.extractScheduleData(updateSchedule);
    const options = {
      returnDocument: "after",
    };
    try {
      const schedule = await this.databaseServices.schedule.findOneAndUpdate(
        filter,
        {
          $set: update,
        },
        options
      );
      return schedule;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAllDaysOff() {
    try {
      const dayoff = await this.databaseServices.dayoff.find().toArray();
      return dayoff;
    } catch (error) {
      throw new Error(error);
    }
  }

  async createDaysOff(data) {
    const dayoff = this.extractScheduleData(data);
    const result = await this.databaseServices.dayoff.findOneAndUpdate(
      dayoff,
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

  async updateDaysOff(id, updateSchedule) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    }
    const update = this.extractScheduleData(updateSchedule);
    const options = {
      returnDocument: "after",
    };
    try {
      const dayoff = await this.databaseServices.dayoff.findOneAndUpdate(
        filter,
        {
          $set: update,
        },
        options
      );
      return dayoff;
    } catch (error) {
      throw new Error(error);
    }
  }
}
const databaseSetvices = require("../utils/mongodb.util");
const scheduleService = new ScheduleService(databaseSetvices);
module.exports = scheduleService;;