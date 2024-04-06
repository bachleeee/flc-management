import createApiClient from "./api.service";

class messageService {
    constructor(baseUrl = "/api/message") {
        this.api = createApiClient(baseUrl);
    }
    async create(token, data) {
        return (await this.api.post('/', data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })).data;
    }
    async getAllMessage(groupid) {
        return (await this.api.get(`/${groupid}`)).data;
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
    async getAllMyGroups(token) {
        const options = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        };
        return (await this.api.get("/group", options)).data;
    }
}

export default new messageService();
