import { AxiosWrapper } from "../wrapper/axios.wrapper.js"; 

/**
 * Service class to process CSV files fetched from an API.
 */
export default class ProcessFileService {
  
  /**
   * Constructor to initialize the service.
   * @param {AxiosWrapper} axiosWrapper - Instance of AxiosWrapper to handle API requests.
   */
  constructor(axiosWrapper) {
    this.axios = axiosWrapper; // Store the Axios wrapper instance
  }

  /**
   * Static method to get a singleton instance of the service.
   * @returns {ProcessFileService} The singleton instance of the service.
   */
  static getInstance() {
    if (!ProcessFileService._instance) {
      // Create an instance if it doesn't exist
      ProcessFileService._instance = new ProcessFileService(AxiosWrapper.getInstance());
    }
    return ProcessFileService._instance; // Return the singleton instance
  }


  /**
   * Processes a CSV file using a regex approach to extract and validate lines.
   * @param {string} file - The file name to be processed.
   * @returns {Promise<Object>} An object containing the file name and valid lines.
   */
  async processCSVFileRegex(file) {
    const axiosRequestObj = {
      url: `https://echo-serv.tbxnet.com/v1/secret/file/${file}`, // API endpoint
      method: 'GET', // HTTP method
      responseType: 'text' // Expecting a text response
    };

    try {
      const response = await this.axios.invokeApi(axiosRequestObj); // Make API request
      const regex = /(?<fileName>\w+\.csv),(?<text>\w*),(?<number>\d+),(?<hex>[\da-fA-F]+)/g; // Regex to match valid lines
      const validLines = []; // Array to store valid lines
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
        file: file, // File name
        lines: validLines, // Return valid lines
      };
    } catch (error) {
      // Handle errors (Axios-specific or general)
      if (error.isAxiosError) {
        console.error(`Error processing file ${file}:`, error.message);
      } else {
        console.error(`Unexpected error processing file ${file}:`, error);
      }
    }

    return {}; // Return an empty object in case of failure
  }
}
