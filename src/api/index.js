import env from "../env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

class Api {
    constructor(baseUrl = "", cleanReq = false) {
        this.URL = baseUrl;
        this.cleanReq = cleanReq;
    }

    get({url = "", body, headers, refreshToken}) {
        return this.#configureRequest({url, headers, body, refreshToken});
    }

    post({url = "", body, headers, refreshToken}) {
        return this.#configureRequest({url, body, method: "post", headers, refreshToken});
    }

    delete({url = "", headers, refreshToken}) {
        return this.#configureRequest({url, method: "delete", headers, refreshToken});
    }

    put({url = "", body, headers, refreshToken}) {
        return this.#configureRequest({url, body, method: "put", headers, refreshToken});
    }

    #configureRequest = async ({
                                   url,
                                   method = "get",
                                   body,
                                   headers = {},
                                   refreshToken = false,
                               }) => {
        let tokens = await AsyncStorage.getItem("token");
        tokens = JSON.parse(tokens)

        url = `${this.cleanReq ? '' : env.APP_URL}/api/v1${this.URL}${url}`;

        const config = {
            method,
            headers: {
                "content-type": "application/json",
                ...headers,
            },
        };

        if (tokens) {
            config.headers.Authorization = "Bearer " + tokens[refreshToken ? 'refreshToken' : 'accessToken'];
        }

        if (body) {
            if (body.hasOwnProperty("email")) {
                body.email = body.email?.toLowerCase();
            }
            if (body instanceof FormData) {
                config.headers["content-type"] = "multipart/form-data";
            }
            config.data = body;
        }
        console.log(url, config)
        return axios(url, config).then(response => response);
    };
}

export default Api;
