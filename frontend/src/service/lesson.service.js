import createApiClient from "./api.service";
class LessonService {
    constructor(baseUrl = "/api/lesson") {
        this.api = createApiClient(baseUrl);
    }
    async getAllLesson() {
        return (await this.api.get(`/`)).data;
    }
    async getLessonByClassId(id) {
        return (await this.api.get(`/class/${id}`)).data;
    }
    async getBySlug(slug) {
        return (await this.api.get(`/${slug}`)).data;
    }
    async getDoc(lessonid) {
        return (await this.api.get(`/document/${lessonid}`)).data;
    }
    async getVid(lessonid) {
        return (await this.api.get(`/video/${lessonid}`)).data;
    }
}
export default new LessonService();