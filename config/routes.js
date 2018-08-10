const axios = require('axios');
const { authenticate } = require('./middlewares');
const db = require('../database/dbConfig');
const bcrypt = require('bcryptjs');
const secret = require('../_secrets/keys');
const jwt = require('jsonwebtoken');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};


const options = {
  expiresIn: '1h',
}


function generateToken(user) {
  const payload = {
    username: user.username,
  }
  return jwt.sign(payload, secret.jwtKey, options)
}

function register(req, res) {

  const user = req.body;
  const hash = bcrypt.hashSync(user.password, 14);

  user.password = hash;
  console.log('user', user)
  db('users')
    .insert(user)
    .then(response => {
      console.log('response',response)
      const token = generateToken(user);
      res.status(200).json({
        token
      })
    })
    .catch(err => {
      res.status(500).json({
        'register_err': err
      });
    })
}

function login(req, res) {
      const credentials = req.body;
      db('users')
        .where({
          username: credentials.username
        })
        .first()
        .then(function (user) {
          if (user && bcrypt.compareSync(credentials.password, user.password)) {

            const token = generateToken(user);
            res.send(token);
          }
        })
        .catch(err => {
          res.status(500).json({
            'login_err': err,
          });
        })
}

function getJokes(req, res) {
  axios
    .get(
      'https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_ten'
    )
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
