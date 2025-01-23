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
      const processedResults = [
        {
            "file": "test1.csv",
            "lines": []
        },
        {
            "file": "test2.csv",
            "lines": [
                {
                    "text": "hxFFDQgWycJSTNjacu",
                    "number": 981492051,
                    "hex": "f048e16bcad74ff9a806596d36f17a43"
                }
            ]
        },
        {
            "file": "test3.csv",
            "lines": [
                {
                    "text": "XCGoqeYtxmbSVrL",
                    "number": 9721446,
                    "hex": "6370a8ad4fb32d5cea3b15ecf7b95779"
                },
                {
                    "text": "xyFHXRORAxwfQrRIykFiOsJdjzPlkL",
                    "number": 22,
                    "hex": "ab8e9cabafe5c7726723e4c152756ef9"
                },
                {
                    "text": "WjviMeoSHuvftfaEsk",
                    "number": 23427,
                    "hex": "ee9abbefbf57707275347f8da7b826e9"
                }
            ]
        },
        {
            "file": "test18.csv",
            "lines": []
        },
        {
            "file": "test6.csv",
            "lines": []
        },
        {
            "file": "test9.csv",
            "lines": [
                {
                    "text": "bCEzrftzoCac",
                    "number": 780,
                    "hex": "6f1d3217a4cc037a079e10f00e6525fd"
                },
                {
                    "text": "DEe",
                    "number": 0,
                    "hex": "a9beed72f8c21d09522f9747f4850003"
                },
                {
                    "text": "d",
                    "number": 353,
                    "hex": "5f91d30fad77c357bf7b30735424d9f3"
                },
                {
                    "text": "SsivZcnKiJrtSGqZPgKPfIBnUGqQvd",
                    "number": 6914334800,
                    "hex": "08bc294123dd28906cf3f4fee2b5f497"
                },
                {
                    "text": "UWqhcbswPJKpOJRdsVrKYTr",
                    "number": 220,
                    "hex": "8f11257aa01680d64de863b555465d7b"
                },
                {
                    "text": "cAFXQcvHYvBnhGLAlZ",
                    "number": 237009,
                    "hex": "60e4135ada4d8b514df9ce79ffb05039"
                },
                {
                    "text": "zvqtJjMrMAzyRzCyVFGUf",
                    "number": 896522924,
                    "hex": "cb96ea34c0c1f86467bf11ae2ee753cb"
                },
                {
                    "text": "gDoeJbtTdEbx",
                    "number": 13710,
                    "hex": "3d903bb7268d3307b69cca458e345b7f"
                },
                {
                    "text": "qGhcxFeOuAjOLiY",
                    "number": 111,
                    "hex": "9bd1afd2f52c2c22cff6fd3a2fa544dc"
                },
                {
                    "text": "XKMgVVJBNKhxGZisHWgYjAgyiFXbzQwt",
                    "number": 7511472,
                    "hex": "2936c1294bd6e081b619001ae7bb72cc"
                },
                {
                    "text": "sVrJWLcENpLtwGZvFBZLCL",
                    "number": 6262168,
                    "hex": "5d7faf4d37458656a11e1ea521192a5b"
                },
                {
                    "text": "IANLobnUZsBf",
                    "number": 6948335890,
                    "hex": "ebcab3fa36cc6ad72040674a8c06c0fe"
                }
            ]
        },
        {
            "file": "test15.csv",
            "lines": []
        }
    ];

      axiosWrapperMock.invokeApi.resolves();
      processFileServiceMock.processCSVFileRegex.resolves(processedResults);

      const response = await request(app).get('/api/files/data');

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(processedResults);
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