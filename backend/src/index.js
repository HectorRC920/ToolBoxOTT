import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';  // Import the fileURLToPath function

import routerAPI from './routes/index.js';

dotenv.config();

const app = express();

// Use import.meta.url to get __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the React app's build directory
app.use(express.static(path.join(__dirname, '../../frontend/dist')));

new routerAPI(app);

// Catch-all handler to serve the React app for any route not handled by the API
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/build', 'bundle.js'));
});

const PORT = 3000;

app.use(express.json());

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;