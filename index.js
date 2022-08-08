const express = require('express'),
  app = express(),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  uuid = require('uuid');

app.use(bodyParser.json());
app.use(morgan('common'));

let users = [
  {
    id: 1,
    name: 'Rachael',
    favoriteMovies: ['Promising Young Woman']
  },
  {
    id: 2,
    name: 'Emily',
    favoriteMovies: ['Bridesmaids'] 
  },
  {
    id: 3,
    name: 'Beth',
    favoriteMovies: []
  }
]

let movies = [
  {
    title: 'Sleepless in Seattle',
    description: 'Man and woman in Seattle fall in love.',
    year: '1993',
    director: {
      name: 'Nora Ephron',
      bio: 'Will add later',
      birth: 'Will add later'
    },
    genre: {
      name:'romance',
      description: 'People fall in love.'
    },
    imageURL: 'https://m.media-amazon.com/images/M/MV5BNWY1MDJkZGUtZTE2OS00ODZiLTlmNzQtMDZjNzM2ZjkwM2QxXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg'
  },
   {
    title: 'Clueless',
    description: 'High school girls have fun.',
    year: '1995',
    director: {
      name: 'Amy Heckerling',
      bio: 'Will add later',
      birth: 'Will add later'
    },
    genre: {
      name: 'comedy',
      description: 'The story is funny.'
    },
    imageURL: 'https://m.media-amazon.com/images/M/MV5BMzBmOGQ0NWItOTZjZC00ZDAxLTgyOTEtODJiYWQ2YWNiYWVjXkEyXkFqcGdeQXVyNTE1NjY5Mg@@._V1_.jpg'
  },
   {
    title: 'Ever After',
    description: 'A retelling of Cinderella.',
    year: '1998',
    director: {
      name: 'Andy Tennant',
      bio: 'Will add later',
      birth: 'Will add later'
    },
    genre: {
      name:'romance',
      description: 'People fall in love.'
    },
    imageURL: 'https://m.media-amazon.com/images/M/MV5BN2FhYTY5ODItOGU4OC00MTkyLTlmYTMtYjIxN2Y4MmVlMDVhXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_FMjpg_UX1000_.jpg'
  },
  {
    title: 'Legally Blonde',
    description: 'Woman goes to Harvard Law School.',
    year: '2001',
    director: {
      name: 'Robert Luketic',
      bio: 'Will add later',
      birth: 'Will add later'
    },
    genre: {
      name: 'comedy',
      description: 'The story is funny.'
    },
    imageURL: 'https://m.media-amazon.com/images/M/MV5BNTEyNjUwMTkxMV5BMl5BanBnXkFtZTcwNjk0NDk0NA@@._V1_.jpg'
  },
  {
    title: 'Mean Girls',
    description: 'High school girls bully each other.',
    year: '2004',
    director: {
      name: 'Mark Waters',
      bio: 'Will add later',
      birth: 'Will add later'
    },
    genre: {
      name: 'comedy',
      description: 'The story is funny.'
    },
    imageURL: 'https://m.media-amazon.com/images/M/MV5BMjE1MDQ4MjI1OV5BMl5BanBnXkFtZTcwNzcwODAzMw@@._V1_FMjpg_UX1000_.jpg'
  },
  {
    title: 'Pride and Prejudice',
    description: 'Man and woman hate each other then fall in love.',
    year: '2005',
    director: {
      name: 'Joe Wright',
      bio: 'Will add later',
      birth: 'Will add later'
    },
    genre: {
      name:'romance',
      description: 'People fall in love.'
    },
    imageURL: 'https://m.media-amazon.com/images/M/MV5BMTA1NDQ3NTcyOTNeQTJeQWpwZ15BbWU3MDA0MzA4MzE@._V1_.jpg'
  },
  {
    title: 'Bridesmaids',
    description: 'Bridal party is funny chaos.',
    year: '2011',
    director: {
      name: 'Paul Feig',
      bio: 'Will add later',
      birth: 'Will add later'
    },
    genre: {
      name: 'comedy',
      description: 'The story is funny.'
    },
    imageURL: 'https://m.media-amazon.com/images/M/MV5BMjAyOTMyMzUxNl5BMl5BanBnXkFtZTcwODI4MzE0NA@@._V1_FMjpg_UX1000_.jpg'
  },
   {
    title: 'Booksmart',
    description: 'High school girls have a fun night.',
    year: '2019',
    director: {
      name: 'Olivia Wilde',
      bio: 'Will add later',
      birth: 'Will add later'
    },
    genre: {
      name: 'comedy',
      description: 'The story is funny.'
    },
    imageURL: 'https://m.media-amazon.com/images/M/MV5BMjEzMjcxNjA2Nl5BMl5BanBnXkFtZTgwMjAxMDM2NzM@._V1_.jpg'
  },
   {
    title: 'Little Women',
    description: 'Sisters grow up.',
    year: '2019',
    director: {
      name: 'Greta Gerwig',
      bio: 'Will add later',
      birth: 'Will add later'
    },
    genre: {
      name: 'drama',
      description: 'The story is serious.'
    },
    imageURL: 'https://m.media-amazon.com/images/M/MV5BY2QzYTQyYzItMzAwYi00YjZlLThjNTUtNzMyMDdkYzJiNWM4XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_FMjpg_UX1000_.jpg'
  }, 
  {
    title: 'Promising Young Woman',
    description: 'Woman seeks revenge.',
    year: '2020',
    director: {
      name: 'Emerald Fennell',
      bio: 'Will add later',
      birth: 'Will add later'
    },
    genre: {
      name: 'drama',
      description: 'The story is serious.'
    },
    imageURL: 'https://m.media-amazon.com/images/M/MV5BOTgzMzE4MGItZDgxYS00ZGEwLWE3YTctZWY3ZDAyMTk0ZGU4XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_FMjpg_UX1000_.jpg'
  }
];

// Display documentation file at /documentation--I made sure Morgan is installed and it's still not working 
app.use(express.static('public'));

// Welcome message on home page
app.get('/', (req, res) => {
  res.send('Welcome to my movie app!');
});

// Create: allow new users to register
app.post('/users', (req, res) => {
  const newUser = req.body;

  if (newUser.name) {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).json(newUser)
  } else {
    res.status(400).send('Users need names')
  }
})

// Read: return a list of all movies
app.get('/movies', (req, res) => {
  res.status(200).json(movies);
});

// Read: return data about a single movie
app.get('/movies/:title', (req, res) => {
  const { title } = req.params;
  const movie = movies.find(movie => movie.title === title);

  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(400).send('Movie not found')
  }
});

// Read: return data about a genre
app.get('/movies/genres/:genreName', (req, res) => {
  const { genreName } = req.params;
  const genre = movies.find(movie => movie.genre.name === genreName).genre;

  if (genre) {
    res.status(200).json(genre);
  } else {
    res.status(400).send('Genre not found')
  }
}); 

// Read: return director data by director's name
app.get('/movies/directors/:directorName', (req, res) => {
  const { directorName } = req.params;
  const director = movies.find(movie => movie.director.name === directorName).director;

  if (director) {
    res.status(200).json(director);
  } else {
    res.status(400).send('Director not found')
  }
}); 

// Update: allow users to update their user info
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;

  let user = users.find(user => user.id == id);

  if (user) {
    user.name = updatedUser.name;
    res.status(200).json(user);
  } else {
    res.status(400).send('User not found')
  }
})

// Post: allow users to add a movie to their list of favorites
app.post('/users/:id/:movieTitle', (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find(user => user.id == id);

  if (user) {
    user.favoriteMovies.push(movieTitle);
    res.status(200).send(`${movieTitle} has been added to user ${id}'s array.`);
  } else {
    res.status(400).send('User not found')
  }
})

// Delete: allow users to remove a movie from their list of favorites
app.delete('/users/:id/:movieTitle', (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find(user => user.id == id);

  if (user) {
    user.favoriteMovies = user.favoriteMovies.filter(title => title !== movieTitle);
    res.status(200).send(`${movieTitle} has been removed from user ${id}'s array.`);
  } else {
    res.status(400).send('User not found')
  }
}) 

// Delete: allow user to remove profile
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;

  let user = users.find(user => user.id == id);

  if (user) {
    users = users.filter(user => user.id != id);
    res.status(200).send(`User ${id} has been deleted.`);
  } else {
    res.status(400).send('User not found')
  }
}) 

// error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});

