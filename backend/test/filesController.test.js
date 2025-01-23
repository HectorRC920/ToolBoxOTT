// test/filesController.test.js

import { expect } from 'chai';
import sinon from 'sinon';
import request from 'supertest';
import express from 'express';
import FilesController from '../src/controllers//filesController.js';
import { AxiosWrapper } from '../src/wrapper/axios.wrapper.js';
import ProcessFileService from '../src/services/processFile.service.js';

describe('FilesController', function() {
  let app;
  let axiosWrapperMock;
  let processFileServiceMock;

  beforeEach(() => {
    app = express();
    axiosWrapperMock = sinon.createStubInstance(AxiosWrapper);
    processFileServiceMock = sinon.createStubInstance(ProcessFileService);

    // Mock instances
    FilesController.prototype.axios = axiosWrapperMock;
    FilesController.prototype.processFileService = processFileServiceMock;

    // Define routes
    app.get('/api/files/data', (req, res) => FilesController.getFiles(req, res));
    app.get('/api/files/list', (req, res) => FilesController.listFiles(req, res));
  });

  describe('getFiles', function() {
  
    it('should return filtered results when no fileName is provided', async function() {


      axiosWrapperMock.invokeApi.resolves();
      processFileServiceMock.processCSVFileRegex.resolves();

      const response = await request(app).get('/api/files/data');

      expect(response.status).to.equal(200);

    });


  });

  describe('listFiles', function() {
    it('should return list of files', async function() {
      const filesResponse = {
        files: [
            "test1.csv",
            "test2.csv",
            "test3.csv",
            "test18.csv",
            "test4.csv",
            "test5.csv",
            "test6.csv",
            "test9.csv",
            "test15.csv"
        ]
    }
      
      axiosWrapperMock.invokeApi.resolves(filesResponse);

      const response = await request(app).get('/api/files/list');

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(filesResponse);
    });

  });
});