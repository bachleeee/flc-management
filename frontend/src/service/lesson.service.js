import createApiClient from "./api.service";
class LessonService {
    constructor(baseUrl = "/api/lesson") {
        this.api = createApiClient(baseUrl);
    }
    async getAllLesson() {
        return (await this.api.get(`/`)).data;
    }
    async getLessonByCourse(id) {
        return (await this.api.get(`/course/${id}`)).data;
    }
    async getBySlug(slug) {
        return (await this.api.get(`/${slug}`)).data;
    }
}
export default new LessonService();