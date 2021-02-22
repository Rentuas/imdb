const express = require('express');
const router = express.Router();
const { authorize } = require('./../services/authorize');
const controller = require ('./../controllers/user');

router.post('/users', controller.createUser);
router.put('/users', authorize, controller.updateUser);
router.delete('/users', authorize, controller.deleteUser);
router.post('/login', controller.login);
router.post('/logout', authorize, controller.logout); //X

module.exports = router;