const passport = require('passport')
const GitHubStrategy = require('passport-github2').Strategy
require('isomorphic-fetch')

const getService = name => name

passport.use(new GitHubStrategy({
  clientID: 'f56b753f4fb79c86df7d',
  clientSecret: '05d0f1578a574d2f283a5234079703b4662ae719',
  callbackURL: 'http://localhost:3000/auth/github/callback'
},
function (accessToken, refreshToken, profile, done) {
  fetch(getService('user-service') + '/user/register', {method: 'POST', body: profile})
    .then((response) => {
      if (response.status >= 400) {
        throw new Error('Bad response from server')
      }
      return response.json()
    })
    .then(res => {
      res.set('Authorization', 'Bearer ' + res.jwt)
      done()
    })
}
))

module.exports = passport
