import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import path from 'path';
import morgan from 'morgan';
import config from './config';
import urlRoutes from './modules/url/UrlRoutes';

const { MONGO_URL, PORT } = config;
/*
* DATABASE
*/
mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URL);
mongoose.connection
  .once('open', () => console.log(`Connected to MongoDb: running on ${MONGO_URL}`)) // eslint-disable-line
  .on('error', err => console.warn('Warning', err)); // eslint-disable-line

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/views/index.html'));
});

app.use([urlRoutes]);

app.listen(PORT, err => {
  if (err) return console.log(err); // eslint-disable-line
  console.log(`App listen to port: ${PORT}`); // eslint-disable-line
});
