import createApiClient from "./api.service";
class UserService {
    constructor(baseUrl = "/api/users") {
        this.api = createApiClient(baseUrl);
    }
    async create(data) {
        return (await this.api.post("/register",data)).data;
    }
    async getAllUser() {
        return (await this.api.get("/")).data;
    }
    async getAllTeachers() {
        return (await this.api.get(`/?role=${teacher}`)).data;
    }
    async getAllOrder() {
        return (await this.api.get("/order/getall")).data;
    }
    async login(data) {
        return (await this.api.post("/login", data)).data;
    }
    async loginAdmin(data) {
        return (await this.api.post("/login-admin", data)).data;
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
    async updateOrderStatus(data) {
        return (await this.api.put("/order", data)).data;
    }
    async delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
    async reducePQ(data) {
        return (await this.api.put("/reduce", data)).data; 
    }
    async addClass(data) {
        return (await this.api.post("/class", data)).data;
    }
}
export default new UserService();