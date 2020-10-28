import express from 'express';
import {
  useAuthAuthMiddleware,
  useFakeAuthAuthMiddleware,
} from './middleware/auth.middleware';
import { useSessionMiddleware } from './middleware/session.middleware';
import bodyParser from 'body-parser';

require('dotenv').config();

const app = express();

app.set('view engine', 'pug');

addBodyParser();

app.use(useSessionMiddleware());

applyMiddleWare();

addHTTPMethods();

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

function addHTTPMethods() {
  app.get('/login', (req, res, next) => {
    if (!req.session?.user) {
      req.session.user = {
        username: 'ankitpant',
        displayName: 'Ankit Pant',
        email: 'ankit12.pant@gmail.com',
      };
    }
    res.status(200).json({
      maxAge: req.session.cookie.maxAge,
      expiresIn: req.session.cookie.maxAge / 1000,
    });
  });

  app.get('/', function (req, res) {
    res.render('index', {
      title: 'express-sessions-redis',
      message: 'Managing Node.js - Express Sessions with Redis',
    });
  });

  app.get('/welcome', (req, res, next) => {
    if (!req.session?.user) {
      res.status(401).json({ message: 'invalid users' });
      return;
    }
    res
      .status(200)
      .json({ default: 'Hello from the NodeJs app', session: req.session });
  });

  app.get('/logout', (req, res, next) => {
    delete req.session;
    return res.redirect(process.env.LOGOUT_URL);
  });
}
