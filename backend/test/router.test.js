// test/routerAPI.test.js

import express from 'express';
import { expect } from 'chai';
import request from 'supertest';
import RouterAPI from '../src/routes/index.js'; // Adjust this path if necessary

// Mock filesRouter as a standalone router
const mockFilesRouter = express.Router();
mockFilesRouter.get('/', (req, res) => {
  res.status(200).json({ message: 'Files route works!' });
});

function setupRouterAPIWithMockedFilesRouter(app) {
  const originalUse = express.Router.prototype.use;

  express.Router.prototype.use = function(path, router) {
    if (path === '/files') {
      return originalUse.call(this, path, mockFilesRouter);
    }
    return originalUse.call(this, path, router);
  };

  new RouterAPI(app);

  // Restore the original use method after setting up the test
  express.Router.prototype.use = originalUse;
}

describe('RouterAPI', function() {
  let app;

  beforeEach(() => {
    app = express();
    setupRouterAPIWithMockedFilesRouter(app);
  });

  it('should mount the filesRouter at /api/v1/files/data', async function() {
    const response = await request(app).get('/api/v1/files/data');
    console.log(response.body);
    expect(response.status).to.equal(200);
  });
});