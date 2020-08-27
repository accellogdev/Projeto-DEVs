import cors from 'cors';
import express from 'express';
import routes from './routes';
import { trim } from './middlewares';
import * as swagger from './config/swagger';
import { DB_MONGO } from './config/env';
import mongoose from 'mongoose';

class AppController {
  constructor() {
    this.express = express();

    this.database();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.express.use(express.json());
    this.express.use(trim);
    this.express.use(cors());
  }

  routes() {
    this.express.use('/api', routes);
    this.express.use('/api/docs', swagger.router);
  }

  database() {
    mongoose.connect(DB_MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
}

module.exports = new AppController().express;



