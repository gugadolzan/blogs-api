const express = require('express');

const app = express();

const { error } = require('./middlewares');
const routes = require('./routes');

app.use(express.json());

app.get('/', (_request, response) => {
  response.send();
});

app.use('/user', routes.User);
app.use('/login', routes.Login);
app.use('/categories', routes.Category);

app.use(error);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
