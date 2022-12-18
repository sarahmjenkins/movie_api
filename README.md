# Movie API

## Project Description

This is a back-end, server-side component of a movie web app. It includes user profiles and lists of movies. The final product allows users to register, log in, view movies and their details, add movies to a list of favorites, remove movies from a list of favorites, edit their profiles, and delete their profiles

## Key Features

- API enpoints that allow the following:
  - A list of all movies
  - Data on each movie, including a description, director, genre, and image
  - Add and delete movie from user favorites
  - Data on each director
  - Data on each genre
  - User registration
  - User log in
  - User profile
  - Edit user profile
  - Delete profile

## Required Tools

This project can be run locally using Node.js. The project also requires MongoDB, Express, Heroku (or another service to deploy the API), and Postman. It follows the principles of a REST API.

## Running the Project

1. Ensure Node.js are installed, create an account in MongoDB to host the database and another in Heroku to deploy the API.

2. Clone project from GitHub using command line:
  - HTTPS: `$ git clone https://github.com/sarahmjenkins/movie-api.git`
  - SSH: `$ git clone git@github.com:sarahmjenkins/movie-api.git`

3. Install dependencies:
  `$ npm install `

4. Run locally:
  `$ npm start`

## Project Dependencies

    "bcrypt": "^5.0.1",
    "body-parser": "^1.20.0",
    "cors": "^2.8.5",
    "express": "^4.18.1",
    "express-validator": "^6.14.2",
    "jsonwebtoken": "^8.5.1",
    "mongoose": "^6.5.4",
    "morgan": "^1.10.0",
    "passport": "^0.6.0",
    "passport-jwt": "^4.0.0",
    "passport-local": "^1.0.0",
    "uuid": "^8.3.2"

## Developer Dependencies

    "nodemon": "^2.0.19"

## Deployed API

[Movie API](https://myflixbysarah.herokuapp.com/)
[Endpoint Documentation](https://myflixbysarah.herokuapp.com/documentation/html)