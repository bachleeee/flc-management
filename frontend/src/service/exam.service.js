import createApiClient from "./api.service";
class LessonService {
    constructor(baseUrl = "/api/exam") {
        this.api = createApiClient(baseUrl);
    }
    async getAllExamOfLesson(lessonId) {
        return (await this.api.get(`/?lessonId=${lessonId}`)).data;
    }
}
export default new LessonService();