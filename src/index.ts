import express from 'express';
import { useAuthAuthMiddleware } from './middleware/auth.middleware';
import { useFakeAuthAuthMiddleware } from './middleware/fake-auth.middleware';
import { useSessionMiddleware } from './middleware/session.middleware';
import bodyParser from 'body-parser';
import { addRoutes } from './routes/routes';

require('dotenv').config();

const app = express();

app.set('view engine', 'pug');

addBodyParser();

app.use(useSessionMiddleware());

applyMiddleWare();

addRoutes(app);

app.listen({ port: process.env.PORT }, () => {
  console.log(`Node Server on ${process.env.API_URL}:${process.env.PORT}/`);
});

function addBodyParser() {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(require('cookie-parser')());
}

function applyMiddleWare() {
  if (process.env.NODE_ENV === 'development') {
    app.use(useFakeAuthAuthMiddleware);
  } else {
    app.use(useAuthAuthMiddleware);
  }
}
