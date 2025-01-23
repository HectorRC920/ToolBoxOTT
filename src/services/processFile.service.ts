import { AxiosError, AxiosRequestConfig } from "axios";
import { AxiosWrapper } from "../wrapper/axios.wrapper";

export default class ProcessFileService {
  private axios: AxiosWrapper;

  private static _instance: ProcessFileService;

  constructor(axiosWrapper: AxiosWrapper) {
    this.axios = axiosWrapper;
  }

  static getInstance(): ProcessFileService {
    if (!ProcessFileService._instance) {
      ProcessFileService._instance = new ProcessFileService(AxiosWrapper.getInstance());
    }

    return ProcessFileService._instance;
  }

  async processCVSFile(file: string): Promise<any> {
    console.log(`Processing file ${file}`);

    const axiosRequestObj: AxiosRequestConfig = {
      url: `https://echo-serv.tbxnet.com/v1/secret/file/${file}`,
      method: 'GET'
    };


    try {
      const response = await this.axios.invokeApi(axiosRequestObj);

      //TODO: Parse the CSV stream

    } catch (error : AxiosError | any) {
      if (error.isAxiosError) {
        console.error(`Error processing file ${file}:`, error.message);
      } else {
        console.error(`Unexpected error processing file ${file}:`, error);
      }
    }

    return {
      
    };
  }
}