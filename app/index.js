import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config';
import router from './router';
import logger from './logger';

let app = express();
app.use(bodyParser.json());
let port = process.env.PORT || 8080;

app.use(cors());

const handleNotFound = (req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err)
};

const handleError = (err, req, res, next) => {
  logger.error(`${err} ${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  res.status(err.status || 500)
    .json({
      status: 'error',
      message: err.message
    })
};

app.use(router);
app.use(handleNotFound);
app.use(handleError);


app.listen(port, (err) => {
  if (err) {
    logger.error(err.toString());
    return
  }
  logger.info(`app is running at port ${port}`)
});