const passport = require('passport');

// though this files requies only passsport
// actually this is an express app, this file
// returns an anonymous function that can be either passed
// as a literal, or called
// this function fires a series of get calls
// on our app object and sets actions for it 

module.exports = (app) => {
  
  app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
  }));

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/surveys');
    }
  );
  
  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
    //res.send(req.user);
    //res.send('hey here');
  });
  
  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
    // res.send(req.user);
  });
};