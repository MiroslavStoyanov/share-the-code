import httpClient from "../helpers/httpClient";

class UserDataService {
  async register(userDetails) {
    return await httpClient
      .post("/users/register", userDetails)
      .then(handleResponse);
  }

  async login(userDetails) {
    return await httpClient
      .post("/users/authenticate", userDetails)
      .then(handleResponse)
      .then(user => {
        if (user) {
          localStorage.setItem("loggedUser", JSON.stringify(user));
        }
      });
  }

  async getCurrentUser() {
    const loggedUser = localStorage.getItem("loggedUser");
    return await httpClient
      .get("/users/current", {
        headers: { Authorization: `Bearer ${loggedUser.token}` }
      })
      .then(handleResponse);
  }
}

function logOut() {
  localStorage.removeItem("loggedUser");
}

function handleResponse(response) {
  const data = response.data;
  if (!response.status === 200) {
    if (response.status === 401) {
      logOut();
      location.forceReload(true);
    }

    const error = (data && data.message) || response.statusText;
    return Promise.reject(error);
  }

  return data;
}

export default new UserDataService();
