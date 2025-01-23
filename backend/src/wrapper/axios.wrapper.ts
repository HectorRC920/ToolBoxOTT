import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export class AxiosWrapper {
  private static _instance: AxiosWrapper;
  private axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    if (AxiosWrapper._instance) {
      throw new Error("Error - use AxiosWrapper.getInstance()");
    }

    this.axios = axios;
  }

  static getInstance(): AxiosWrapper {
    if (!AxiosWrapper._instance) {
      AxiosWrapper._instance = new AxiosWrapper(axios.create());
    }

    return AxiosWrapper._instance;
  }

  async invokeApi(requestConfig: AxiosRequestConfig): Promise<any> {
    try {
      requestConfig.headers = {Authorization: 'Bearer aSuperSecretKey' }; 
      const res = await this.axios(requestConfig);
      return res.data;
    } catch (error: any) {
      console.error(AxiosWrapper.name, error.message);
      throw error;
    }
  }
}
