import { Request, Response } from 'express';
import {AxiosWrapper } from '../wrapper/axios.wrapper';
import { AxiosRequestConfig } from 'axios';
import ProcessFileService from '../services/processFile.service';

const axios = AxiosWrapper.getInstance();
const processFileService = ProcessFileService.getInstance();

interface ApiResponse {
  files: string[];
}
export default class FilesController {
  static async getFiles(req: Request, res: Response): Promise<any> {
    try {
      const { fileName } = req.query;

      if (fileName && typeof fileName === 'string') {
        const result = await processFileService.processCVSFile(fileName);
        return res.status(200).json({ result });
      }
      const axiosRequestObj : AxiosRequestConfig = {
        url : 'https://echo-serv.tbxnet.com/v1/secret/files',
        method : 'GET'
      }
      const response : ApiResponse = await axios.invokeApi(axiosRequestObj);

      const files: string[] = response.files;
      let result = [];
      for (const file of files) {
        result.push(await processFileService.processCVSFile(file)); 
      }
      
      const filteredResult = result.filter(item => Object.keys(item).length > 0);
      
      return res.status(200).json({result : filteredResult }); 
    } catch (err) {
      console.error(err);
      return res.status(500).send('Something went wrong!');
    }
  }
  static async listFiles(req: Request, res: Response): Promise<any> {
    try {
      const axiosRequestObj : AxiosRequestConfig = {
        url : 'https://echo-serv.tbxnet.com/v1/secret/files',
        method : 'GET'
      }
      const response : ApiResponse = await axios.invokeApi(axiosRequestObj);
      return res.status(200).json(response);
    } catch (err) {
      console.error(err);
      res.status(500).send('Something went wrong!');
    }
  }
}
