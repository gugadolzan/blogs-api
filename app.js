const express = require('express');

const { error } = require('./middlewares');
const routes = require('./routes');

const app = express();

app.use(express.json());

app.get('/', (_req, res) => res.send());

app.use('/user', routes.User);
app.use('/login', routes.Login);
app.use('/categories', routes.Category);
app.use('/post', routes.BlogPost);

app.use(error);

module.exports = app;
