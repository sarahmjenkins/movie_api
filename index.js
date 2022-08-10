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
    description: 'Sam is a recent widower who is seeking someone new. Sam\'s son Jonah, is also looking for a new mother, so when Jonah puts his father on national radio, hundreds of women write to him. One of the women is Annie. She\'s engaged to Walter, but he\'s a bit strange. Annie goes to great lengths to meet Sam.',
    year: '1993',
    director: {
      name: 'Nora Ephron',
      bio: 'Nora Ephron was an American journalist, writer, and filmmaker. She is best known for her romantic comedy films and was nominated three times for both the Writer\’s Guild of America Award and the Academy Award for Best Original Screenplay for Silkwood (1983), When Harry Met Sally... (1989), and Sleepless in Seattle (1993). She won the BAFTA Award for Best Original Screenplay for When Harry Met Sally..., which the Writers Guild of America ranked as the 40th greatest screenplay of all time.',
      birth: 'May 19, 1941',
      death: 'June 26, 2012'
    },
    genre: {
      name:'romance',
      description: 'Romance films or movies involve romantic love stories recorded in visual media for broadcast in theatres or on television that focus on passion, emotion, and the affectionate romantic involvement of the main characters. Typically their journey through dating, courtship, or marriage is featured. These films make the search for romantic love the main plot focus.'
    },
    imageURL: 'https://m.media-amazon.com/images/M/MV5BNWY1MDJkZGUtZTE2OS00ODZiLTlmNzQtMDZjNzM2ZjkwM2QxXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg',
    featured: true
  },
   {
    title: 'Clueless',
    description: 'Cher, a high school student in Beverly Hills, must survive the ups and downs of adolescent life. Her external demeanor at first seems superficial, but rather it hides her wit, charm, and intelligence which help her to deal with relationships, friends, family, school, and the all-important teenage social life.',
    year: '1995',
    director: {
      name: 'Amy Heckerling',
      bio: 'Amy Heckerling is an American filmmaker. An alumna of both New York University and the American Film Institute, she directed the commercially successful films Fast Times at Ridgemont High (1982), National Lampoon\'s European Vacation (1985), Look Who\'s Talking (1989), and Clueless (1995).',
      birth: 'May 7, 1954',
      death: ''
    },
    genre: {
      name: 'comedy',
      description: 'A comedy film is a category of film which emphasizes humor. These films are designed to make the audience laugh through amusement. Films in this style traditionally have a happy ending (black comedy being an exception).'
    },
    imageURL: 'https://m.media-amazon.com/images/M/MV5BMzBmOGQ0NWItOTZjZC00ZDAxLTgyOTEtODJiYWQ2YWNiYWVjXkEyXkFqcGdeQXVyNTE1NjY5Mg@@._V1_.jpg',
    featured: false
  },
   {
    title: 'Ever After',
    description: 'With the sudden death of her loving father, Danielle is made a servant by her new stepmother. She also has two new stepsisters, one quite kind but the other one really horrid. Still, Danielle grows up to be a happy and strong-willed young lady, and one day her path crosses that of handsome Prince Henry, who has troubles of his own at home. Luckily the nice Leonardo da Vinci is on hand to help all round.',
    year: '1998',
    director: {
      name: 'Andy Tennant',
      bio: 'Andrew Wellman Tennant is an American screenwriter, film and television director, actor, and dancer.',
      birth: 'June 15, 1955',
      death: ''
    },
    genre: {
      name:'romance',
      description: 'Romance films or movies involve romantic love stories recorded in visual media for broadcast in theatres or on television that focus on passion, emotion, and the affectionate romantic involvement of the main characters. Typically their journey through dating, courtship, or marriage is featured. These films make the search for romantic love the main plot focus.'
    },
    imageURL: 'https://m.media-amazon.com/images/M/MV5BN2FhYTY5ODItOGU4OC00MTkyLTlmYTMtYjIxN2Y4MmVlMDVhXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_FMjpg_UX1000_.jpg',
    featured: false
  },
  {
    title: 'Legally Blonde',
    description: 'Elle Woods, a fashionable sorority queen, is dumped by her boyfriend. She decides to follow him to law school. While she is there, she figures out that there is more to her than just looks.',
    year: '2001',
    director: {
      name: 'Robert Luketic',
      bio: 'Robert Luketic is an Australian film director. His films include Monster-in-Law, Legally Blonde, 21, Paranoia, and Killers.',
      birth: 'August 14, 1971',
      death: ''
    },
    genre: {
      name: 'comedy',
      description: 'A comedy film is a category of film which emphasizes humor. These films are designed to make the audience laugh through amusement. Films in this style traditionally have a happy ending (black comedy being an exception).'
    },
    imageURL: 'https://m.media-amazon.com/images/M/MV5BNTEyNjUwMTkxMV5BMl5BanBnXkFtZTcwNjk0NDk0NA@@._V1_.jpg',
    featured: false
  },
  {
    title: 'Mean Girls',
    description: 'Cady Heron is a hit with The Plastics, the A-list girl clique at her new school, until she makes the mistake of falling for Aaron Samuels, the ex-boyfriend of alpha Plastic Regina George.',
    year: '2004',
    director: {
      name: 'Mark Waters',
      bio: 'Mark Stephen Waters is an American filmmaker. He is best known for directing the comedy films Freaky Friday, Mean Girls, Ghosts of Girlfriends Past, Mr. Popper\'s Penguins, and Vampire Academy.',
      birth: 'June 30, 1964',
      death: ''
    },
    genre: {
      name: 'comedy',
      description: 'A comedy film is a category of film which emphasizes humor. These films are designed to make the audience laugh through amusement. Films in this style traditionally have a happy ending (black comedy being an exception).'
    },
    imageURL: 'https://m.media-amazon.com/images/M/MV5BMjE1MDQ4MjI1OV5BMl5BanBnXkFtZTcwNzcwODAzMw@@._V1_FMjpg_UX1000_.jpg',
    featured: false
  },
  {
    title: 'Pride and Prejudice',
    description: 'Sparks fly when spirited Elizabeth Bennet meets single, rich, and proud Mr. Darcy. But Mr. Darcy reluctantly finds himself falling in love with a woman beneath his class. Can each overcome their own pride and prejudice?',
    year: '2005',
    director: {
      name: 'Joe Wright',
      bio: 'Joseph Wright is a British film director residing in Somerset, England. His motion pictures include the literary adaptations Pride & Prejudice (2005), Anna Karenina (2012), and Cyrano (2021), the romantic war drama Atonement (2007), the action thriller Hanna (2011), Peter Pan origin story Pan (2015), and Darkest Hour (2017), a political drama following Winston Churchill during World War II nominated for Best Picture.',
      birth: 'June 12, 1971',
      death: ''
    },
    genre: {
      name:'romance',
      description: 'Romance films or movies involve romantic love stories recorded in visual media for broadcast in theatres or on television that focus on passion, emotion, and the affectionate romantic involvement of the main characters. Typically their journey through dating, courtship, or marriage is featured. These films make the search for romantic love the main plot focus.'
    },
    imageURL: 'https://m.media-amazon.com/images/M/MV5BMTA1NDQ3NTcyOTNeQTJeQWpwZ15BbWU3MDA0MzA4MzE@._V1_.jpg',
    featured: false
  },
  {
    title: 'Bridesmaids',
    description: 'Competition between the maid of honor and a bridesmaid, over who is the bride\'s best friend, threatens to upend the life of an out-of-work pastry chef.',
    year: '2011',
    director: {
      name: 'Paul Feig',
      bio: 'Paul Samuel Feig is an American actor, film director, comedian and filmmaker. He is known for directing films starring frequent collaborator Melissa McCarthy, including Bridesmaids (2011), The Heat (2013), Spy (2015), and Ghostbusters (2016). He also directed the black comedy mystery film A Simple Favor (2018) and the romantic comedy film Last Christmas (2019).',
      birth: 'September 17, 1962',
      death: ''
    },
    genre: {
      name: 'comedy',
      description: 'A comedy film is a category of film which emphasizes humor. These films are designed to make the audience laugh through amusement. Films in this style traditionally have a happy ending (black comedy being an exception).'
    },
    imageURL: 'https://m.media-amazon.com/images/M/MV5BMjAyOTMyMzUxNl5BMl5BanBnXkFtZTcwODI4MzE0NA@@._V1_FMjpg_UX1000_.jpg',
    featured: false
  },
   {
    title: 'Booksmart',
    description: 'On the eve of their high-school graduation, two academic superstars and best friends realize they should have worked less and played more. Determined not to fall short of their peers, the girls try to cram four years of fun into one night.',
    year: '2019',
    director: {
      name: 'Olivia Wilde',
      bio: 'Olivia Wilde is an American actress and filmmaker. She played Remy "Thirteen" Hadley on the medical-drama television series House (2007–2012), and appeared in the films Tron: Legacy (2010), Cowboys & Aliens (2011), The Incredible Burt Wonderstone (2013), and The Lazarus Effect (2015). In 2017, Wilde made her Broadway debut, playing the role of Julia in 1984. In 2019, she directed her first film, the teen comedy Booksmart, for which she won the Independent Spirit Award for Best First Feature.',
      birth: 'March 10, 1984',
      death: ''
    },
    genre: {
      name: 'comedy',
      description: 'A comedy film is a category of film which emphasizes humor. These films are designed to make the audience laugh through amusement. Films in this style traditionally have a happy ending (black comedy being an exception).'
    },
    imageURL: 'https://m.media-amazon.com/images/M/MV5BMjEzMjcxNjA2Nl5BMl5BanBnXkFtZTgwMjAxMDM2NzM@._V1_.jpg',
    featured: false
  },
  {
    title: 'Lady Bird',
    description: 'In 2002, an artistically inclined seventeen-year-old girl comes of age in Sacramento, California.',
    year: '2017',
    director: {
      name: 'Greta Gerwig',
      bio: 'Greta Celeste Gerwig is an American actress, writer, and director. She first garnered attention after working on and appearing in several mumblecore films. Between 2006 and 2009, she appeared in a number of films by Joe Swanberg, some of which she co-wrote or co-directed, including Hannah Takes the Stairs (2007) and Nights and Weekends (2008). Gerwig has had two solo directorial ventures, the coming-of-age films Lady Bird (2017) and Little Women (2019), both of which earned nominations for the Academy Award for Best Picture. For the former, she received Academy Award nominations for Best Director and Best Original Screenplay, and for the latter, she was nominated for Best Adapted Screenplay. Gerwig was included in the annual Time 100 list of the most influential people in the world in 2018.',
      birth: 'August 4, 1983',
      death: ''
    },
    genre: {
      name: 'drama',
      description: 'Drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone.'
    },
    imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSinDGzmmoii4AGFjCY7d-l3Z1PrNPWuKHiyw&usqp=CAU',
    featured: false
  },
   {
    title: 'Little Women',
    description: 'Jo March reflects back and forth on her life, telling the beloved story of the March sisters - four young women, each determined to live life on her own terms.',
    year: '2019',
    director: {
      name: 'Greta Gerwig',
      bio: 'Greta Celeste Gerwig is an American actress, writer, and director. She first garnered attention after working on and appearing in several mumblecore films. Between 2006 and 2009, she appeared in a number of films by Joe Swanberg, some of which she co-wrote or co-directed, including Hannah Takes the Stairs (2007) and Nights and Weekends (2008). Gerwig has had two solo directorial ventures, the coming-of-age films Lady Bird (2017) and Little Women (2019), both of which earned nominations for the Academy Award for Best Picture. For the former, she received Academy Award nominations for Best Director and Best Original Screenplay, and for the latter, she was nominated for Best Adapted Screenplay. Gerwig was included in the annual Time 100 list of the most influential people in the world in 2018.',
      birth: 'August 4, 1983',
      death: ''
    },
    genre: {
      name: 'drama',
      description: 'Drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone.'
    },
    imageURL: 'https://m.media-amazon.com/images/M/MV5BY2QzYTQyYzItMzAwYi00YjZlLThjNTUtNzMyMDdkYzJiNWM4XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_FMjpg_UX1000_.jpg',
    featured: false
  },
  {
    title: 'Promising Young Woman',
    description: 'A young woman, traumatized by a tragic event in her past, seeks out vengeance against those who crossed her path.',
    year: '2020',
    director: {
      name: 'Emerald Fennell',
      bio: 'Emerald Lilly Fennell is an English actress, filmmaker, and writer. She has received many awards and nominations, including an Academy Award, two British Academy Film Awards, one Screen Actors Guild Award, and nominations for three Primetime Emmy Awards and three Golden Globe Awards. Fennell first gained attention for her roles in period drama films, such as Albert Nobbs (2011), Anna Karenina (2012), The Danish Girl (2015), and Vita and Virginia (2018). She went on to receive wider recognition for her starring roles in the BBC One period drama series Call the Midwife (2013–17) and for her portrayal of Camilla, Duchess of Cornwall in the Netflix period drama series The Crown (2019–20). As a writer-director, Fennell is known as the showrunner for season two of the BBC thriller series Killing Eve (2019), which earned her two Primetime Emmy Award nominations. In 2020, Fennell made her feature film directorial debut with the thriller Promising Young Woman (2020), for which she won the Academy Award for Best Original Screenplay, and received nominations for Best Picture, and Best Director, becoming one of only seven women, and the first British woman, to be nominated for the latter.',
      birth: 'October 1, 1985',
      death: ''
    },
    genre: {
      name: 'drama',
      description: 'Drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone.'
    },
    imageURL: 'https://m.media-amazon.com/images/M/MV5BOTgzMzE4MGItZDgxYS00ZGEwLWE3YTctZWY3ZDAyMTk0ZGU4XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_FMjpg_UX1000_.jpg',
    featured: false
  },
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

