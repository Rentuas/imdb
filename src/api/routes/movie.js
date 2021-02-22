const express = require('express');
const router = express.Router();
const { authorize } = require('./../services/authorize');
const controller = require ('../controllers/movie');

router.get('/movies', controller.listMovies);
router.post('/movies/vote', authorize, controller.voteAMovie); //X

module.exports = router;