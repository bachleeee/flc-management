import createApiClient from "./api.service";
class VideoService {
    constructor(baseUrl = "/api/exam") {
        this.api = createApiClient(baseUrl);
    }
    async create(data) {
        return (await this.api.post(`/`, data)).data;
    }
    async getAllLessonExam() {
        return (await this.api.get(`/`)).data;
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
}
export default new VideoService();