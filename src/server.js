const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');

class AppController {
  constructor() {
    this.express = express();
    this.middlewares();
    this.routes();

  }

  middlewares() {
    this.express.use(cors());
    this.express.use(express.urlencoded({ extended: false }));

    const limitJSON = 50
    this.express.use((req, res, next) => bodyParser.json({
      limit: `${limitJSON}mb`,
      extended: true,
    })(req, res, (err) => {
      if (err) {
        res.status(400).send({ result: `As informações deve ter no máximo ${limitJSON}mb.` });
        return;
      }
      next();
    }));
    const limitURLEncoded = 1
    this.express.use((req, res, next) => bodyParser.urlencoded({
      limit: `${limitURLEncoded}mb`,
      extended: true,
    })(req, res, (err) => {
      if (err) {
        res.status(400).send({ result: `As informações deve ter no máximo ${limitURLEncoded}mb.` });
        return;
      }
      next();
    }));
  }

  routes() {
    this.express.use(routes);
  }
}

module.exports = new AppController().express;
