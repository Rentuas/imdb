const GENRE_TYPES = {
  ROMANCE: 'romance',
  TERROR: 'terror',
  COMEDIA: 'comédia',
  ACAO: 'ação'
};

module.exports = {
  GENRE_TYPES,
  getAllGenreTypes: () => Object.values(GENRE_TYPES) ,
};
