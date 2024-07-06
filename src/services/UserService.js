import api from "../lib/axios";

export default {
  getUsers() {
    return api.get("?results=31");
  },
};
