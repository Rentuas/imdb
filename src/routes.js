const routes = require('express').Router();

const adminAccountRoutes = require('./api/routes/admin/account');
const adminActorRoutes = require('./api/routes/admin/actor');
const adminDirectorRoutes = require('./api/routes/admin/director');
const adminMovieRoutes = require('./api/routes/admin/movie');

routes.use('/admin', adminAccountRoutes);
routes.use('/admin', adminActorRoutes);
routes.use('/admin', adminDirectorRoutes);
routes.use('/admin', adminMovieRoutes);

const userRoutes = require('./api/routes/user');
const movieRoutes = require('./api/routes/movie');

routes.use('', userRoutes);
routes.use('', movieRoutes);

module.exports = routes;