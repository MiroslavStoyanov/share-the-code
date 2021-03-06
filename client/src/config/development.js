export default {
  API_BASE_URL: "http://localhost:3000",
  CONTENT_TYPE: "application/json",
  USERS: {
    BASE_URL: "/users/",
    AUTHENTICATE: "/users/authenticate",
    REGISTER: "/users/register"
  },
  SNIPPETS: {
    BASE_URL: "/snippets/",
    USER_SNIPPETS: "/snippets/user/",
    GET_SNIPPETS_BY_NAME: "/snippets/name/"
  },
  TAGS: {
    BASE_URL: "/tags/"
  }
};
