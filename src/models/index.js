const Movie = require('./Movie');
const Actor = require('./Actor')
const Director = require('./Director')
const Genre = require('./Genre')

Movie.belongsToMany(Actor, {through: 'moviesActors'});
Actor.belongsToMany(Movie, {through: 'moviesActors'});

Movie.belongsToMany(Director, {through: 'moviesDirectors'});
Director.belongsToMany(Movie, {through: 'moviesDirectors'});

Movie.belongsToMany(Genre, {through: 'moviesGenres'});
Genre.belongsToMany(Movie, {through: 'moviesGenres'});