const express = require('express');
const router = express.Router();
const { authorizeAdmin } = require('./../../services/authorize');
const controller = require ('../../controllers/admin/movie');

router.get('/movies', authorizeAdmin, controller.listMovies);
router.post('/movies', authorizeAdmin, controller.createMovie);
router.put('/movies/:movieId', authorizeAdmin, controller.updateMovie);
router.delete('/movies/:movieId', authorizeAdmin, controller.deleteMovie);

module.exports = router;