import express from 'express';
import dotenv from 'dotenv';

import routerAPI from './routes/index.js';


dotenv.config();


const app = express();

new routerAPI(app);

const PORT = process.env.PORT || 3000;


app.use(express.json());


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


export default app;
