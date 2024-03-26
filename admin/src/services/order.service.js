import createApiClient from "./api.service";
class orderService {
    constructor(baseUrl = "/api/order") {
        this.api = createApiClient(baseUrl);
    }
    async getAllOrder() {
        return (await this.api.get("/")).data;
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
export default new orderService();