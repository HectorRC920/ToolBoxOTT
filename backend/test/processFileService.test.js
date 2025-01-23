// test/processFileService.test.js

import { expect } from 'chai';
import sinon from 'sinon';
import ProcessFileService from '../src/services/processFile.service.js';
import { AxiosWrapper } from '../src/wrapper/axios.wrapper.js';

describe('ProcessFileService', function() {
  let axiosWrapperMock;
  let processFileService;

  beforeEach(() => {
    axiosWrapperMock = sinon.createStubInstance(AxiosWrapper);
    processFileService = new ProcessFileService(axiosWrapperMock);
  });

  describe('processCSVFileRegex', function() {
    it('should parse text using regex and return valid lines', async function() {
      const textData = 'test.csv,hello,1234,abc123\ntest.csv,world,5678,def456\n';
      axiosWrapperMock.invokeApi.resolves(textData);

      const result = await processFileService.processCSVFileRegex('test.csv');

      expect(result).to.deep.equal({
        file: 'test.csv',
        lines: [
          { text: 'hello', number: "1234", hex: 'abc123' },
          { text: 'world', number: "5678", hex: 'def456' },
        ],
      });
    });

    it('should return an empty object on Axios error', async function() {
      axiosWrapperMock.invokeApi.rejects({ isAxiosError: true, message: 'Network error' });

      const result = await processFileService.processCSVFileRegex('test.csv');

      expect(result).to.deep.equal({});
    });
  });
});