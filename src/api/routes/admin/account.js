const express = require('express');
const router = express.Router();
const { authorizeAdmin } = require('./../../services/authorize');
const controller = require ('../../controllers/admin/account');

router.get('/accounts', authorizeAdmin, controller.getOwnerAccount);
router.post('/accounts', authorizeAdmin, controller.createAccount);
router.put('/accounts', authorizeAdmin, controller.updateAccount);
router.post('/login', controller.login);
router.post('/logout', authorizeAdmin, controller.logout); //X
router.delete('/accounts/:accountId', authorizeAdmin, controller.deleteAccount);
router.delete('/accounts', authorizeAdmin, controller.deleteOwnerAccount);

module.exports = router;