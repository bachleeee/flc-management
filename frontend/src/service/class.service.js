import createApiClient from "./api.service";
class ClassService {
    constructor(baseUrl = "/api/class") {
        this.api = createApiClient(baseUrl);
    }
    async getClassByCourse(id) {
        return (await this.api.get(`/course/${id}`)).data;
    }
    async getAllByCourseName(courseName) {
        return (await this.api.get(`/?courseName=${courseName}`)).data;
    }
    async getAllClass() {
        return (await this.api.get(`/`)).data;
    }
    async getClass(name) {
        return (await this.api.get(`/${name}`)).data;
    }
    async getClassByIdtoArray(id) {
        return (await this.api.get(`/${id}`)).data;
    }
}
export default new ClassService();