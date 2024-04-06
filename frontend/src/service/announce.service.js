import createApiClient from "./api.service";
class announceService {
    constructor(baseUrl = "/api/announce") {
        this.api = createApiClient(baseUrl);
    }
    async create(token, data) {
        return (await this.api.post('/', data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })).data;
    }
    async getAllAnnounce() {
        return (await this.api.get("/")).data;
    }
    async getMyAnnounce(userId) {
        return (await this.api.get(`/?userId=${userId}`)).data;
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
export default new announceService();