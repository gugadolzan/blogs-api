const express = require('express');

const app = express();

const errorMiddleware = require('./middlewares/error');
const UserRouter = require('./routes/UserRouter');

app.use(express.json());

app.get('/', (_request, response) => {
  response.send();
});
app.use('/user', UserRouter);

app.use(errorMiddleware);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
