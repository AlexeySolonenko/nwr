const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// passport takes care of authentification and of passing 
// encrypted data between the two nodes

const keys = require('../config/keys');
const mongoose = require('mongoose');

// our application is run with Express
// Express is a real-time continously run 
// process handled by Node, this is, actually
// one side of the system

// then we need a service or process that 
// will represent the opposite side of the system - 
// the MongoDB, actually. we may use MongoDB api
// but we choose another option - mongoose

// call an existing model - a constructor of a collection, a 
// 
const User = mongoose.model('users');


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
  
});

// authentication can be done in many ways
// one of the ways is to use a third-party provider
// for instance, googleAPI, so then once we enter a
// a corresponding URL, we get redirected, and here
// passport uses a request to authenticate and 
// returns a user from our database, either an existing
// or creates new one 

passport.use(new GoogleStrategy({
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL: '/auth/google/callback',
  proxy: true
},
 async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({googleId: profile.id});
    //.then((existingUser) => {
      //console.log('EXISTING USER: '+existingUser);
      if(existingUser) {
        return done(null, existingUser); // first - error? [1] - arg
        // we already have a record with the given profile ID
      };
      // we don't have a user record with this ID, make a new record!
      const user = await new User({googleId: profile.id}).save();
      done(null, user); // asynchronous call back, mongo returns us a 
      // 'trimmed' or modified version of a user model instance - instance! constructor is the same
          
      
    //});
  
    }
  )
);



