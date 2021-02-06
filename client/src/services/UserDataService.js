import httpClient from "../helpers/httpClient";

class UserDataService {
  async register(userDetails) {
    return await httpClient.post("/users/register", userDetails);
  }

  async login(userDetails) {
    return await httpClient.post("/users/authenticate", userDetails);
  }
}

export default new UserDataService();
