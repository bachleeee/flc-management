import createApiClient from "./api.service";
class scheduleService {
    constructor(baseUrl = "/api/schedule") {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
        return (await this.api.get("/")).data;
    }
    async getClassesOfDay(date) {
        return (await this.api.get(`/${date}`)).data;
    }
    async getClassesOfDayAndShift(buoi, date) {
        return (await this.api.get(`/getSchedule/findByShiftAndDate?buoi=${buoi}&date=${date}`)).data;
    }
    async getById(id) {
        return (await this.api.get(`/${id}`)).data;
    }
    async update(id, data) {
        return (await this.api.put(`/${id}`, data)).data;
    }
    async delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
    async getAllDaysOff() {
        return (await this.api.get("/daysoff")).data;
    }
}
export default new scheduleService();