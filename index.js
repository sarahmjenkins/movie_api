const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Models = require('./models.js');
const cors = require('cors')
const {check, validationResult} = require('express-validator');
const Movies = Models.Movie;
const Users = Models.User;
const auth = require('./auth');
const passport = require('passport');
require('./passport.js')

// Connects to local database
// mongoose.connect('mongodb://localhost:27017/myFlixDB', {useNewUrlParser: true, useUnifiedTopology: true});

/** connecting to database MongoDB
*/
mongoose.connect(process.env.CONNECTION_URI, {useNewUrlParser: true, useUnifiedTopology: true});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('common'));
app.use(express.static('public'));

/** Setting allowedOrigins
*/
// let allowedOrigins = "*"; // allows all domains to make requests to the API
let allowedOrigins = ['http://localhost:8080', 'http://testsite.com', 'http://localhost:1234', 'myflixbysarah.netlify.app', 'http://localhost:4200', 'https://sarahmjenkins.github.io/myFlix-Angular-client/'];
app.use(cors({
  origin: (origin, callback) => {
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      let message = 'The CORS policy for this application doesn\'t allow access from origin ' + origin;
      return callback(new Error(message), false);
    }
    return callback(null, true);
  }
}));

/** Authentication
*/
auth(app);

/** 
 * Welcome message
 * GET welcome message from '/' endpoint
 * @kind function
 * @returns welcome message
*/
app.get('/', (req, res) => {
  res.send('Welcome to my movie app!');
});

/** 
 * List of all movies
 * GET list of all movies
 * Request body: bearer token
 * @kind function
 * @requires passport 
 * @returns array of movie objects
*/
app.get('/movies', (req,res) => {
  Movies.find()
    .then((movies) => {
      res.status(201).json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});


/** 
 * List of all users for troubleshooting app issues
 * GET list of all users
 * Request body: bearer token
 * @kind function
 * @requires passport 
 * @returns array of user objects
*/
// app.get('/users', (req, res) => {
//   Users.find()
//     .then((users) => {
//       res.status(201).json(users);
//     })
//     .catch((err) => {
//       console.error(err);
//       res.status(500).send('Error: ' + err);
//     });
// });

/** 
 * Data on a single movie
 * GET data on a single movie
 * Request body: bearer token
 * @kind function
 * @requires passport 
 * @param title
 * @returns movie object
*/
app.get('/movies/:title', passport.authenticate('jwt', {session: false}), (req, res) => {
  Movies.findOne({title: req.params.title})
    .then((movie) => {
      res.json(movie);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

/** 
 * Data on a single genre
 * GET data on a single genre
 * Request body: bearer token
 * @kind function
 * @requires passport 
 * @param genreName
 * @returns genre object
*/
app.get('/genres/:genreName', passport.authenticate('jwt', {session: false}), (req, res) => {
  Movies.findOne({'genre.name': req.params.genreName})
    .then((movie) => {
      res.json(movie.genre);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

/** 
 * Data on a single director
 * GET data on a single director
 * Request body: bearer token
 * @kind function
 * @requires passport 
 * @param directorName
 * @returns director object
*/
app.get('/directors/:directorName', passport.authenticate('jwt', {session: false}), (req, res) => {
  Movies.findOne({'director.name': req.params.directorName})
    .then((movie) => {
      res.json(movie.director);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

/** 
 * User registration
 * POST new user's data
 * Request body: bearer token and JSON user object
 * {
 *  ID: number,
 *  username: string,
 *  password: string,
 *  email: string,
 *  birthday: date
 * }
 * @kind function
 * @returns new user object
*/
app.post('/register',
  [
    check('username', 'Username is required').isLength({min: 5}),
    check('username', 'Username contains non-alphanumeric characters--not allowed.').isAlphanumeric(),
    check('password', 'Password is required.').not().isEmpty(),
    check('email', 'Email does not appear to be valid.').isEmail()
  ], (req, res) => {
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()});
    }

    let hashedPassword = Users.hashPassword(req.body.password);
    Users.findOne({username: req.body.username}) 
      .then((user) => { 
        if (user) {
          return res.status(400).send(req.body.username + ' already exists');
        } else {
          Users
            .create({
              username: req.body.username,
              password: hashedPassword,
              email: req.body.email,
              birthday: req.body.birthday
            })
            .then((user) => {res.status(201).json(user)})
          .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
          })
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send('Error: ' + error);
      })
    });

// Return user info by username
/** 
 * Data on a single user
 * GET data on a single user
 * Request body: bearer token
 * @kind function
 * @requires passport 
 * @param username
 * @returns user object
*/
app.get('/users/:username', passport.authenticate('jwt', {session: false}), (req, res) =>{
  Users.findOne({username: req.params.username})
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

/** 
 * Update user info
 * PUT data on a single user
 * Request body: bearer token and JSON user object
 * {
 *  username: string,
 *  password: string,
 *  email: string,
 *  birthday: date
 * }
 * @kind function
 * @requires passport 
 * @param username
 * @returns user object
*/
app.put('/users/:username',
  [
    check('username', 'Username is required.').isLength({min: 5}),
    check('username', 'Username contains non-alphanumeric characters--not allowed.').isAlphanumeric(),
    check('password', 'Password is required.').not().isEmpty(),
    check('email', 'Email does not appear to be valid.').isEmail()
  ], passport.authenticate('jwt', {session: false}), (req, res) => {
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({errors: errors.array()});
    }

    let hashedPassword = Users.hashPassword(req.body.password);
    Users.findOneAndUpdate({username: req.params.username}, {$set: 
      {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      birthday: req.body.birthday
      }
    },
    {new: true}, 
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error: ' + err)
      } else {
        res.status(201).json(updatedUser);
      }
    });
  });

/** 
 * Add movie to favorites
 * POST a movie to favorite movies array
 * Request body: bearer token
 * @kind function
 * @requires passport 
 * @param username
 * @param MovieID
 * @returns user object
*/
app.post('/users/:username/movies/:MovieID', passport.authenticate('jwt', {session: false}), (req, res) => {
  Users.findOneAndUpdate({username: req.params.username}, {
    $push: {favoriteMovies: req.params.MovieID}
  },
  {new: true},
  (err, updatedUser) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});

/** 
 * Delete movie from favorites
 * DELETE movie from favorite movies array
 * Request body: bearer token
 * @kind function
 * @requires passport 
 * @param username
 * @param MovieID
 * @returns user object
*/
app.delete('/users/:username/movies/:MovieID', passport.authenticate('jwt', {session: false}), (req, res) => {
  Users.findOneAndUpdate({username: req.params.username}, {
    $pull: {favoriteMovies: req.params.MovieID}
  },
  {new: true},
  (err, updatedUser) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});

/** 
 * Delete user profile
 * DELETE user object
 * Request body: bearer token
 * @kind function
 * @requires passport 
 * @param username
 * @returns status message
*/
app.delete('/users/:username', passport.authenticate('jwt', {session: false}), (req, res) => {
  Users.findOneAndRemove({username: req.params.username})
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.username + ' was not found');
      } else {
        res.status(200).send(req.params.username + ' was deleted.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

/** 
 * Error handler
 * @kind function
*/
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

/** 
 * Request listener
*/
const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0',() => {
  console.log('Listening on Port ' + port);
});

