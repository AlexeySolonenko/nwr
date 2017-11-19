const mongoose = require('mongoose');

const { Schema } = mongoose; // object destructuring 
// - actually extracted a constructor

const userSchema = new Schema({
  googleId: String,
  credits: { type: Number, default: 0 }
});

mongoose.model('users', userSchema); // note: 
// two arguments are used with this call - 
// it means 'users' collection is created here
// if there is just one argument, then it means
// a call to that created here collection