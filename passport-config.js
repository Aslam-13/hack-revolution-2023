const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const User = require('./models/User');

function initialize(passport, getUserByEmail, getUserById) {
  const authenticateUser = async (email, password, done) => {
    const user = await User.findOne({email: email});
    if (user == null) {
      return done(null, false, { message: 'No user with that email' })
    }
    await bcrypt.compare(password, user.password, ).then(find => {
      if(find)
      {
        return done(null, user, {message: 'Logged in successfully '});
       }
       return done(null, false, {message: 'Incorrect Password'} );
      }).catch(error =>{
        return done(null, false, {message: 'Something went wrong'});
          })
     
  }

  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser((id, done) =>{
    User.findById(id, (err, user) =>{
      done(err, user);
        })
  })
}

module.exports = initialize