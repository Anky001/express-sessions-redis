export async function addRoutes(app) {
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
