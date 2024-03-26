import createApiClient from "./api.service";
class VideoService {
    constructor(baseUrl = "/api/lesson") {
        this.api = createApiClient(baseUrl);
    }
    async create(data) {
        return (await this.api.post(`/video/`, data)).data;
    }
    async getAllLessonVideo(lessonid) {
        return (await this.api.get(`/videos/${lessonid}`)).data;
    }
    async getById(id) {
        return (await this.api.get(`/video/${id}`)).data;
    }
    async update(id, data) {
        return (await this.api.put(`/video/${id}`, data)).data;
    }
    async delete(id) {
        return (await this.api.delete(`/video/${id}`)).data;
    }
}
export default new VideoService();