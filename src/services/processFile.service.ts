import { AxiosError, AxiosRequestConfig } from "axios";
import { AxiosWrapper } from "../wrapper/axios.wrapper";
import csvParser from "csv-parser";
import { Readable } from "stream";

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

    const validLines: any[] = [];
    const axiosRequestObj: AxiosRequestConfig = {
      url: `https://echo-serv.tbxnet.com/v1/secret/file/${file}`,
      method: 'GET',
      responseType: 'text' 
    };


    try {
      const response = await this.axios.invokeApi(axiosRequestObj);
      const stream = Readable.from(response);

      const parser = stream.pipe(csvParser());

      for await (const row of parser) {
        const { text, number, hex } = row;

        if (text && number && hex) {
          validLines.push({ text, number, hex });
        }
      }

      return {
        file,
        lines: validLines,
      };

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