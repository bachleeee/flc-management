import createApiClient from "./api.service";
class VideoService {
    constructor(baseUrl = "/api/exam") {
        this.api = createApiClient(baseUrl);
    }
    async create(data) {
        return (await this.api.post(`/`, data)).data;
    }
    async addExam(id,data) {
        return (await this.api.post(`/addExamToLesson/${id}`, data)).data;
    }
    async getAllLessonExam(lessonId) {
        if (lessonId != null)
            return (await this.api.get(`/?lessonId=${lessonId}`)).data;
        else {
            return (await this.api.get(`/`)).data;
        }
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