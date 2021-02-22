const express = require('express');
const router = express.Router();
const { authorizeAdmin } = require('./../../services/authorize');
const controller = require ('../../controllers/admin/director');

router.get('/directors', authorizeAdmin, controller.listDirectors);
router.post('/directors', authorizeAdmin, controller.createDirector);
router.put('/directors/:directorId', authorizeAdmin, controller.updateDirector);
router.delete('/directors/:directorId', authorizeAdmin, controller.deleteDirector); 

module.exports = router;