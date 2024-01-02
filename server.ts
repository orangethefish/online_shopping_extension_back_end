import express from 'express';
import user from './src/controller/user';
import bodyParser from 'body-parser';
import mongo_connect from './src/models/mongo_connect';
const app: express.Express = express();


mongo_connect();
app.use(bodyParser.json());
app.use('/user',user)
app.get('/', (req, res, next) => {
  res.send('Hello World!');
});
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
