import { Request, Response } from 'express';
import {AxiosWrapper } from '../wrapper/axios.wrapper';
import { AxiosError, AxiosRequestConfig } from 'axios';
import ProcessFileService from '../services/processFile.service';


const axios = AxiosWrapper.getInstance();
const processFileService = ProcessFileService.getInstance();
export default class FilesController {
  static async getFiles(req: Request, res: Response): Promise<void> {
    try {
      const axiosRequestObj : AxiosRequestConfig = {
        url : 'https://echo-serv.tbxnet.com/v1/secret/files',
        method : 'GET'
      }
      const response = await axios.invokeApi(axiosRequestObj);
      console.log(response);
      const files: string[] = response.files;
      let result = [];
      for (const file of files) {
        console.log(file);
        // result.push(processFileService.processCVSFile(file)); 
      }
     

      res.status(200).json({ files }); 
    } catch (err) {
      console.error(err);
      res.status(500).send('Something went wrong!');
    }
  }
}
