import createApiClient from "./api.service";
class ProgressService {
  constructor(baseUrl = "/api/progress") {
    this.api = createApiClient(baseUrl);
  }
  async getMyProgress(token, classid, lessonid) {
    let url = '/myProgress';
    if (classid !== null && classid !== undefined) {
      url += `?classid=${classid}`;
    } 
    else if (lessonid !== null && lessonid !== undefined) {
      url += `?lessonid=${lessonid}`;
    }
  
    return (await this.api.get(url, {
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
  async update(id, data) {
    return (await this.api.put(`/${id}`, data)).data;
}
}
export default new ProgressService();