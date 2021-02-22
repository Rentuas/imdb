const jwt = require('jsonwebtoken');

const { JWT_TOKEN_SECRET } = require('../../config/env');

const {
  Account,
  User
} = require('../models');

module.exports = {
  generateJWTToken: (data) => {
    const token = jwt.sign({ data }, JWT_TOKEN_SECRET, { expiresIn: '365d' });
    return token;
  },

  authorize: (req, res, next) => {
    const authToken = req.headers.authorization;

    if (!authToken) {
      return res.status(401).json({
        message: 'Acesso Restrito',
      });
    }
    const [, token] = authToken.split(' ');

    jwt.verify(token, JWT_TOKEN_SECRET, async (error, decoded) => {
      if (error) {
        return res.status(401).json({
          message: 'Token Inválido',
        });
      }
      
      if(decoded.admin) {
        return res.status(401).json({
          message: 'Acesso Restrito',
        });
      }

      const user = await User.findOne({
        attributes: ['id','guid'],
        where: {
          id: decoded.data.id
        }
      });

      if (!user) {
        return res.status(401).json({
          message: 'Acesso Restrito',
        });
      }

      req.user = user;

      return next();
    });

    return null;
  },

  authorizeAdmin: (req, res, next) => {
    const authToken = req.headers.authorization;

    if (!authToken) {
      return res.status(401).json({
        message: 'Acesso Restrito',
      });
    }
    const [, token] = authToken.split(' ');

    jwt.verify(token, JWT_TOKEN_SECRET, async (error, decoded) => {
      if (error) {
        return res.status(401).json({
          message: 'Token Inválido',
        });
      }

      if(!decoded.admin) {
        return res.status(401).json({
          message: 'Acesso Restrito',
        });
      }

      const account = await Account.findOne({
        attributes: ['id','guid'],
        where: {
          id: decoded.data.id
        }
      });

      if (!account) {
        return res.status(401).json({
          message: 'Acesso Restrito',
        });
      }

      req.user = account;
      
      return next();
    });

    return null;
  },

};
