import express from 'express';
import user from './src/controller/user';
import bodyParser from 'body-parser';
const app: express.Express = express();

app.use(bodyParser.json());



app.use('/user',user)
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
