import createApiClient from "./api.service";
class ProductService {
    constructor(baseUrl = "/api/products") {
        this.api = createApiClient(baseUrl);
    }
    async create(data) {
        return (await this.api.post("/", data)).data;
    }
    async getAll(page, limit) {
        return (await this.api.get('/', { params: { page, limit } })).data;
      }
    async deleteAll() {
        return (await this.api.delete("/")).data;
    }
    async get(id) {
        return (await this.api.get(`/${id}`)).data;
    }
    async update(id, data) {
        return (await this.api.put(`/${id}`, data)).data;
    }
    async delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
}
export default new ProductService();