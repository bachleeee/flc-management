import createApiClient from "./api.service";
class LessonService {
    constructor(baseUrl = "/api/lesson") {
        this.api = createApiClient(baseUrl);
    }
    async getAllLesson() {
        return (await this.api.get(`/`)).data;
    }
    async getLessonByClassName(name) {
        return (await this.api.get(`/class/${name}`)).data;
    }
    async getBySlug(slug) {
        return (await this.api.get(`/${slug}`)).data;
    }
    async getDoc(lessonid) {
        return (await this.api.get(`/documents/${lessonid}`)).data;
    }
    async getVid(lessonid) {
        return (await this.api.get(`/videos/${lessonid}`)).data;
    }
    async getEx(lessonid) {
        return (await this.api.get(`/exam/${lessonid}`)).data;
    }
}
export default new LessonService();