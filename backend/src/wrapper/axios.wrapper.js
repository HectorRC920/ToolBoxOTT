import axios from "axios";

/**
 * Wrapper class for axios to provide a singleton instance and simplify API requests.
 */
export class AxiosWrapper {
  /**
   * Constructor to initialize the AxiosWrapper.
   * @param {Object} axiosInstance - An axios instance for making HTTP requests.
   * @throws Will throw an error if the class is instantiated directly (enforces singleton usage).
   */
  constructor(axiosInstance) {
    // Enforce singleton pattern by throwing an error if an instance already exists
    if (AxiosWrapper._instance) {
      throw new Error("Error - use AxiosWrapper.getInstance()");
    }

    this.axios = axiosInstance; // Store the provided axios instance
  }

  /**
   * Static method to get a singleton instance of the AxiosWrapper.
   * @returns {AxiosWrapper} The singleton instance of AxiosWrapper.
   */
  static getInstance() {
    if (!AxiosWrapper._instance) {
      AxiosWrapper._instance = new AxiosWrapper(axios.create()); // Create a new axios instance
    }
    return AxiosWrapper._instance; // Return the singleton instance
  }

  /**
   * Method to invoke an API using the provided request configuration.
   * @param {Object} requestConfig - The axios request configuration object.
   * @returns {Promise<Object>} The response data from the API.
   * @throws Will rethrow any error encountered during the API call.
   */
  async invokeApi(requestConfig) {
    try {
      // Add an Authorization header to the request
      requestConfig.headers = { Authorization: "Bearer aSuperSecretKey" };

      // Make the API request and return the response data
      const res = await this.axios(requestConfig);
      return res.data;
    } catch (error) {
      
      console.error(AxiosWrapper.name, error.message);

      throw error;
    }
  }
}
