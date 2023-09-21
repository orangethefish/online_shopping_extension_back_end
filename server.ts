import express from 'express';
import user from './src/controller/user';

const app: express.Express = express();

app.use('/index',user)
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
