import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import { useAuthAuthMiddleware } from './middleware/auth.middleware';
import { useFakeAuthAuthMiddleware } from './middleware/fake-auth.middleware';
import { useSessionMiddleware } from './middleware/session.middleware';
import { addRoutes } from './routes/routes';

require('dotenv').config();

const app = express();

expressAppSetFunctions();

expressAppUseFunctions();

addRoutes(app);

app.listen({ port: process.env.PORT }, () => {
  console.log(`Node Server on ${process.env.API_URL}:${process.env.PORT}/`);
});

function expressAppSetFunctions() {
  app.set('views', path.join(__dirname, './views'));
  app.set('view engine', 'pug');
}

async function expressAppUseFunctions() {
  app.use(express.static(path.join(__dirname, './public')));
  app.use(useSessionMiddleware());

  await addBodyParser();
  await applyMiddleWare();
}

function addBodyParser(): Promise<boolean> {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(require('cookie-parser')());

  return Promise.resolve(true);
}

function applyMiddleWare(): Promise<boolean> {
  if (process.env.NODE_ENV === 'development') {
    app.use(useFakeAuthAuthMiddleware);
  } else {
    app.use(useAuthAuthMiddleware);
  }
  return Promise.resolve(true);
}
