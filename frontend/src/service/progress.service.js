import createApiClient from "./api.service";
class ProgressService {
  constructor(baseUrl = "/api/progress") {
    this.api = createApiClient(baseUrl);
  }
  async getMyProgress(token, classid) {
    return (await this.api.get(`/class/${classid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })).data;
  }
  async createProgress(token, data) {
    return (await this.api.post(`/`, data,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })).data;
  }

}
export default new ProgressService();