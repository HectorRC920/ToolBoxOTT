import { AxiosWrapper } from "../wrapper/axios.wrapper.js";
import csvParser from "csv-parser";
import { Readable } from "stream";

export default class ProcessFileService {

  constructor(axiosWrapper) {
    this.axios = axiosWrapper;
  }
  // Static method to get an instance
  static getInstance() {
    if (!ProcessFileService._instance) {
      ProcessFileService._instance = new ProcessFileService(AxiosWrapper.getInstance());
    }
    return ProcessFileService._instance;
  }
   // Method to process CSV file
  async processCSVFile(file) {
    const validLines = [];
    const axiosRequestObj = {
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
    } catch (error) {
      if (error.isAxiosError) {
        console.error(`Error processing file ${file}:`, error.message);
      } else {
        console.error(`Unexpected error processing file ${file}:`, error);
      }
    }

    return {};
  }
  async processCSVFileRegex(file) {
    const axiosRequestObj = {
      url: `https://echo-serv.tbxnet.com/v1/secret/file/${file}`,
      method: 'GET',
      responseType: 'text'
    };

    try {
      const response = await this.axios.invokeApi(axiosRequestObj);
      const regex = /(?<fileName>\w+\.csv),(?<text>\w*),(?<number>\d+),(?<hex>[\da-fA-F]+)/g;
      const validLines = [];
      let match;

      while ((match = regex.exec(response)) !== null) {
        // Destructure the named capturing groups
        const { fileName, text, number, hex } = match.groups;
        
        // Push the structured data into the validLines array
        validLines.push({
          text,
          number,
          hex,
        });
      }

      return {
        file: file, 
        lines: validLines,
      };
    } catch (error) {
      if (error.isAxiosError) {
        console.error(`Error processing file ${file}:`, error.message);
      } else {
        console.error(`Unexpected error processing file ${file}:`, error);
      }
    }

    return {};
  }
}