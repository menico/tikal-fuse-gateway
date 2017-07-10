const express = require('express')
const proxy = require('http-proxy')
const session = require('express-session')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const partials = require('express-partials')
const path = require('path')

const getServiceHost = name => name // get from discovery

const app = express()
const passport = require('./passport')
// console.log(path.join(__dirname, '../views'))

app.use(partials())
app.use(bodyParser.json())
app.use(methodOverride())
app.use(session({secret: 'keyboard cat', cookie: { maxAge: 60000 }}))
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize())
app.use(passport.session())
// app.use(express.static(__dirname + '/public'))

app.get('/', function (req, res) {
  res.send("I'm alive " + (req.isAuthenticated() ? 'Authenticated' : 'Not Authenticated'))
})

// app.get('/login', function (req, res) {
//   res.render('login', { user: req.user })
// })

app.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }))

app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/auth/github' }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/')
  })

app.use('/api', (req, res, next) =>
  req.isAuthenticated() ? next() : res.redirect('/auth/github')
)

app.use('/api/author', (req, res, next) =>
  proxy.web(req, res, {target: getServiceHost('author')}))

app.use('/api/tutor', (req, res, next) =>
  proxy.web(req, res, {target: getServiceHost('tutor')}))

app.use('/api/roadmap', (req, res, next) =>
  proxy.web(req, res, {target: getServiceHost('roadmap')}))

app.use('/api/student', (req, res, next) =>
  proxy.web(req, res, {target: getServiceHost('student')}))

app.use((err, req, res, next) => res.status(400).send(err))

app.listen(3000)
