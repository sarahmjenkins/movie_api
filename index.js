// adding Express and Morgan
const express = require('express'),
  morgan = require('morgan');

const app = express();

// movies to be listed at /movies
let topMovies = [
  {
    title: 'Sleepless in Seattle',
    year: '1993',
    director: 'Nora Ephron'
  },
   {
    title: 'Clueless',
    year: '1995',
    director: 'Amy Heckerling'
  },
   {
    title: 'Ever After',
    year: '1998',
    director: 'Andy Tennant'
  },
  {
    title: 'Legally Blonde',
    year: '2001',
    director: 'Robert Luketic'
  },
  {
    title: 'Mean Girls',
    year: '2004',
    director: 'Mark Waters'
  },
  {
    title: 'Pride and Prejudice',
    year: '2005',
    director: 'Joe Wright'
  },
  {
    title: 'Bridesmaids',
    year: '2011',
    director: 'Paul Feig'
  },
   {
    title: 'Booksmart',
    year: '2019',
    director: 'Olivia Wilde'
  },
   {
    title: 'Little Women',
    year: '2019',
    director: 'Greta Gerwig'
  }, 
  {
    title: 'Promising Young Woman',
    year: '2020',
    director: 'Emerald Fennell'
  }
];

app.use(morgan('common'));

app.get('/', (req, res) => {
  res.send('Welcome to my movie app!');
});

// lists top movies
app.get('/movies', (req, res) => {
  res.json(topMovies);
});

// I'm struggling to serve the documentation.html file I've tried the three below 
app.use('/documentation', express.static('public'));

// app.use('/documentation.html', express.static('public'));

// app.get('/documentation.html', (req, res) => {
//   app.use(express.static('public'));
// });

// error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});

