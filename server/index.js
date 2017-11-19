
const express = require('express'); // library for interaction through HTTP
const mongoose = require('mongoose'); // library for interaction with MongoDB through API over HTTP
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys'); // locally hidden and protected data

require('./models/user'); // created users collection constructor locally
require('./models/Surveys');
require('./services/passport'); // sets up how our passport works

//const authRoutes = require('./routes/authRoutes');

// connect to a real database with real data
mongoose.connect(keys.mongoURI, (err, db) => {
  if(err) throw err;
});


const app = express(); // created our app 

// tell express app to use cookies

// MIDDLEWARES

app.use(bodyParser.json());
app.use(
  cookieSession({
      maxAge: 30 * 24 * 60 * 60 * 1000,
      keys: [keys.cookieKey]
  })
);
// tell express to initialize our cookies with help of passport
app.use(passport.initialize());
// tell express to ask passport for a session
app.use(passport.session());

// sets routes for app
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

if (process.env.NODE_ENV == 'production') {
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(express.static('client/build'));
  
  // Espress will serve up the index.html file 
  // if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
  
}

// finally, sets app to listen to a port
const PORT = process.env.PORT || 5000;
app.listen(PORT);
