import axios from "axios";

export class AxiosWrapper {
  constructor(axiosInstance) {
    if (AxiosWrapper._instance) {
      throw new Error("Error - use AxiosWrapper.getInstance()");
    }

    this.axios = axiosInstance;
  }

  // Static method to get an instance
  static getInstance() {
    if (!AxiosWrapper._instance) {
      AxiosWrapper._instance = new AxiosWrapper(axios.create());
    }
    return AxiosWrapper._instance;
  }

  // Method to invoke API
  async invokeApi(requestConfig) {
    try {
      requestConfig.headers = { Authorization: 'Bearer aSuperSecretKey' };
      const res = await this.axios(requestConfig);
      return res.data;
    } catch (error) {
      console.error(AxiosWrapper.name, error.message);
      throw error;
    }
  }
}