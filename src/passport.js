const passport = require('passport')
const GitHubStrategy = require('passport-github2')

passport.use(new GitHubStrategy({
    clientID: 'f56b753f4fb79c86df7d',
    clientSecret: '05d0f1578a574d2f283a5234079703b4662ae719',
    callbackURL: "http://127.0.0.1:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ githubId: profile.id }, function (err, user) {
    //   return done(err, user);
    // });
    // call user service save/create and save the token
  }
))

module.exports = passport