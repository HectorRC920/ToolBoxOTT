import {AxiosWrapper } from '../wrapper/axios.wrapper.js';
import ProcessFileService from '../services/processFile.service.js';

const axios = AxiosWrapper.getInstance();
const processFileService = ProcessFileService.getInstance();

export default class FilesController {
  static async getFiles(req, res) {
    try {
      const { fileName } = req.query;

      if (fileName && typeof fileName === 'string') {
        const result = await processFileService.processCSVFileRegex(fileName);
        return res.status(200).json({ result });
      }
      const axiosRequestObj  = {
        url : 'https://echo-serv.tbxnet.com/v1/secret/files',
        method : 'GET'
      }
      const response  = await axios.invokeApi(axiosRequestObj);

      const files = response.files;
      let result = [];
      for (const file of files) {
        result.push(await processFileService.processCSVFileRegex(file)); 
      }
      
      const filteredResult = result.filter(item => Object.keys(item).length > 0);
      
      return res.status(200).send(filteredResult); 
    } catch (err) {
      console.error(err);
      return res.status(500).send('Something went wrong!');
    }
  }
  static async listFiles(req, res) {
    try {
      const axiosRequestObj  = {
        url : 'https://echo-serv.tbxnet.com/v1/secret/files',
        method : 'GET'
      }
      const response  = await axios.invokeApi(axiosRequestObj);
      return res.status(200).json(response);
    } catch (err) {
      console.error(err);
      res.status(500).send('Something went wrong!');
    }
  }
}
