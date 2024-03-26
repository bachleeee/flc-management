import createApiClient from "./api.service";
class CourseService {
    constructor(baseUrl = "/api/course") {
        this.api = createApiClient(baseUrl);
    }
    async create(data) {
        return (await this.api.post("/", data)).data;
    }
    async getAllCourse(data) {
        return (await this.api.get("/", data)).data;
    }
    async getByCourseName(name) {
        return (await this.api.get(`/?name=${name}`)).data;
    }
    async getAllCat(cat, page, limit) {
        return (await this.api.get(`/?category=${cat}`, { params: { page, limit } })).data;
    }
    async getAllCategory() {
        return (await this.api.get("/category")).data;
    }
    async deleteAll() {
        return (await this.api.delete("/")).data;
    }
    async getBySlug(slug) {
        return (await this.api.get(`/${slug}`)).data;
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
export default new CourseService();