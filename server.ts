import express from 'express';
import user from './src/controller/user';
import bodyParser from 'body-parser';
import run from './src/models/mongo_connect';
const app: express.Express = express();


run();
app.use(bodyParser.json());
app.use('/user',user)
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
