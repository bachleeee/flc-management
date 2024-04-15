import createApiClient from "./api.service";
class ClassService {
    constructor(baseUrl = "/api/class") {
        this.api = createApiClient(baseUrl);
    }
    async getClassByCourse(id) {
        return (await this.api.get(`/course/${id}`)).data;
    }
    async getAllClass() {
        return (await this.api.get(`/`)).data;
    }
    async getAllOffClass(data) {
        return (await this.api.get(`/findAllOfClass`, data)).data;
    }
    async getMyClass(id) {
        return (await this.api.get(`/findMyClass/?teacherId=${id}`)).data;
    }
    async getClass(name) {
        return (await this.api.get(`/${name}`)).data;
    }
    async getClassByIdtoArray(id) {
        return (await this.api.get(`/${id}`)).data;
    }
    async create(data) {
        return (await this.api.post("/", data)).data;
    }
    async addToClass(data) {
        return (await this.api.post("/addtoclass", data)).data;
    }
    async createClassSchedule(id,data) {
        return (await this.api.post(`/schedule/${id}`,data)).data;
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
    async deleteClassSchedule(id) {
        return (await this.api.delete(`/schedule/${id}`)).data;
    }
}
export default new ClassService();