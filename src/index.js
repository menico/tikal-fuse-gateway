const express = require('express')
const httpProxy = require('http-proxy')

const getServiceHost = name => name // get from discovery

const app = express()
const passport = require('passport')

app.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }))

app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  })

app.use('/api/author', (req, res, next) =>
  proxy.web(req, res, {target: getServiceHost('author')}))

app.use('/api/tutor', (req, res, next) =>
  proxy.web(req, res, {target: getServiceHost('tutor')}))

app.use('/api/roadmap', (req, res, next) =>
  proxy.web(req, res, {target: getServiceHost('roadmap')}))

app.use('/api/student', (req, res, next) =>
  proxy.web(req, res, {target: getServiceHost('student')}))