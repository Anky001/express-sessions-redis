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

  app.get('/', async (req, res) => {
    // await checkUserSession(req, res);

    res.render('index', {
      title: 'express-sessions-redis',
      message: 'Express Sessions with Redis',
      description: !req.session?.user
        ? 'No Session found in the store, please login first.'
        : 'Please go to Welcome Route to see the session details!',
    });
  });

  app.get('/welcome', async (req, res, next) => {
    await checkUserSession(req, res);

    res
      .status(200)
      .json({ default: 'Hello from the NodeJs app', session: req.session });
  });

  app.get('/logout', (req, res, next) => {
    delete req.session;
    return res.redirect(process.env.LOGOUT_URL);
  });
}

function checkUserSession(req, res): Promise<boolean> {
  if (!req.session?.user) {
    res
      .status(401)
      .json({ message: 'No Session found in the store, please login first' });
    return;
  }
  Promise.resolve(true);
}
