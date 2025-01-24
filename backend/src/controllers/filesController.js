import { AxiosWrapper } from '../wrapper/axios.wrapper.js'; 
import ProcessFileService from '../services/processFile.service.js'; 

// Create singleton instances of AxiosWrapper and ProcessFileService
const axios = AxiosWrapper.getInstance();
const processFileService = ProcessFileService.getInstance();

/**
 * Controller class for handling file-related endpoints.
 */
export default class FilesController {
  /**
   * Handles the GET /data endpoint.
   * Fetches and processes a specific file or all files based on the query parameters.
   * @param {Object} req - The HTTP request object.
   * @param {Object} res - The HTTP response object.
   */
  static async getFiles(req, res) {
    try {
      const { fileName } = req.query; // Extract the `fileName` query parameter

      if (fileName && typeof fileName === 'string') {
       
        const result = await processFileService.processCSVFileRegex(fileName);

        // Check if the result is empty and return a 404 status if no data is found
        if (Object.keys(result).length === 0) {
          return res.status(404).send('No data available');
        }

        // Return the processed file data with a 200 status
        return res.status(200).json([result]);
      }

      // If no specific file is requested, fetch the list of available files
      const axiosRequestObj = {
        url: 'https://echo-serv.tbxnet.com/v1/secret/files', // API endpoint for file list
        method: 'GET' 
      };

      const response = await axios.invokeApi(axiosRequestObj);
      const files = response.files; // Extract the list of files from the API response
      let result = [];

      // Process each file and store the result
      for (const file of files) {
        result.push(await processFileService.processCSVFileRegex(file));
      }

      // Filter out empty results (files with no valid data)
      const filteredResult = result.filter(item => Object.keys(item).length > 0);

     
      return res.status(200).send(filteredResult);
    } catch (err) {
     
      console.error(err);
      return res.status(500).send('Something went wrong!');
    }
  }

  /**
   * Handles the GET /list endpoint.
   * Fetches the list of available files from the external API.
   * @param {Object} req - The HTTP request object.
   * @param {Object} res - The HTTP response object.
   */
  static async listFiles(req, res) {
    try {
      const axiosRequestObj = {
        url: 'https://echo-serv.tbxnet.com/v1/secret/files', 
        method: 'GET' 
      };

      const response = await axios.invokeApi(axiosRequestObj); 
      return res.status(200).json(response); 
    } catch (err) {
      
      console.error(err);
      res.status(500).send('Something went wrong!');
    }
  }
}
