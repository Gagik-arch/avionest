import env from "../env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

class Api {
  constructor(baseUrl = "", cleanReq = false) {
    this.URL = baseUrl;
    this.cleanReq = cleanReq;
  }

  get({ url = "", headers }) {
    return this.#configureRequest({ url, headers });
  }

  post({ url = "", body, headers }) {
    return this.#configureRequest({ url, body, method: "post", headers });
  }

  delete({ url = "",  headers }) {
    return this.#configureRequest({ url,  method: "delete", headers });
  }

  #configureRequest = async ({ url, method = "get", body, headers = {} }) => {
    const token = await AsyncStorage.getItem("token");

    url = this.cleanReq
      ? this.URL + '/api/v1' + url
      : env.APP_URL+ this.URL + '/api/v1' + url;

    const config = {
      method,
      headers: {
        "content-type": "application/json",
        ...headers,
      },
    };

    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }

    if (body) {
      if (body.hasOwnProperty("email")) {
        body.email = body.email.toLowerCase();
      }
      if (body instanceof FormData) {
        config.headers["content-type"] = "multipart/form-data";
      }
      config.data = body;
    }

    return axios(url, config).then(response => response);
  };
}

export default Api;
