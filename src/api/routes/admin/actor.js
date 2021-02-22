const express = require('express');
const router = express.Router();
const { authorizeAdmin } = require('./../../services/authorize');
const controller = require ('../../controllers/admin/actor');

router.get('/actors', authorizeAdmin, controller.listActors);
router.post('/actors', authorizeAdmin, controller.createActor);
router.put('/actors/:actorId', authorizeAdmin, controller.updateActor);
router.delete('/actors/:actorId', authorizeAdmin, controller.deleteActor);

module.exports = router;