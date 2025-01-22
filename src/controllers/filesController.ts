import { Request, Response } from 'express';

export default class FilesController {

  static async getFiles(req: Request, res: Response): Promise<void> {
    try {
      res.send('Hello, Toolbox');
    } catch (err) {
      console.error(err);
      res.status(500).send('Something went wrong!');
    }
  }
}
