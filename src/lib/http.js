import Storage from "./storage";
import AsyncStorage from "@react-native-community/async-storage";

class Http {
  constructor() {
    this.APIUrl = "http://186.28.225.72:8000";

    if (typeof Http.instance === "object") {
      return Http.instance;
    }

    Http.instance = this;
    return this;
  }

  async manageFetch(url, method, body = {}, headers = {}) {
    try {
      let request_body = {
        method,
        headers: {
          ...headers,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };
      if (method !== "GET") {
        request_body.body = JSON.stringify(body);
      }
      let request = await fetch(url, request_body);
      let json = await request.json();
      return {
        data: json,
        status: request.status,
      };
    } catch (error) {
      console.error(
        `Http ${method} method on ${url} failed with error ${error}`
      );
      throw Error(error);
    }
  }

  async manageFetchFormData(url, method, form, headers = {}) {
    try {
      const requestData = {
        method,
        headers,
        body: form,
      };
      let request = await fetch(url, requestData);
      let json = await request.json();
      return {
        status: request.status,
        data: json,
      };
    } catch (error) {
      console.error(
        `Http ${method} method on ${url} failed with error ${error}`
      );
      throw Error(error);
    }
  }

  async authHeader() {
    let token = null;
    try {
      token = await AsyncStorage.getItem("access_token");
    } catch (error) {
      console.error(`Storage get error: ${error}`);
      throw Error(error);
    }
    return { Authorization: `Token ${token}` };
  }

  async get(endpoint, headers = {}) {
    return await this.manageFetch(this.APIUrl + endpoint, "GET", {}, headers);
  }
  async post(endpoint, body, headers = {}) {
    return await this.manageFetch(
      this.APIUrl + endpoint,
      "POST",
      body,
      headers
    );
  }
  async put(endpoint, body, headers = {}) {
    return await this.manageFetch(this.APIUrl + endpoint, "PUT", body, headers);
  }
  async patch(endpoint, body, headers = {}) {
    return await this.manageFetch(
      this.APIUrl + endpoint,
      "PATCH",
      body,
      headers
    );
  }
  async delete(endpoint, headers = {}) {
    return await this.manageFetch(
      this.APIUrl + endpoint,
      "DELETE",
      {},
      headers
    );
  }
  async postFormData(endpoint, form, headers = {}) {
    return await this.manageFetchFormData(
      this.APIUrl + endpoint,
      "POST",
      form,
      headers
    );
  }

  async authGet(endpoint) {
    const headers = await this.authHeader();
    return await this.get(endpoint, headers);
  }
  async authPost(endpoint, body) {
    const headers = await this.authHeader();
    return await this.post(endpoint, body, headers);
  }
  async authPut(endpoint) {
    const headers = await this.authHeader();
    return await this.put(endpoint, headers);
  }
  async authPatch(endpoint) {
    const headers = await this.authHeader();
    return await this.patch(endpoint, headers);
  }
  async authDelete(endpoint) {
    const headers = await this.authHeader();
    return await this.delete(endpoint, headers);
  }
  async authPostFormData(endpoint, form) {
    return await this.postFormData(endpoint, form, this.authHeader());
  }
}

export default Http;
