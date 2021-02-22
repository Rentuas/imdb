require('dotenv').config({
  path: `./env/${process.env.NODE_ENV || 'dev'}.env`,
});

const envs = {
  mode: process.env.MODE,
  appSecret: process.env.APP_SECRET,
  database: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER_NAME,
    pass: process.env.DB_PASSWORD,
    db: process.env.DB_NAME,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
  },
  JWT_TOKEN_SECRET: process.env.JWT_TOKEN_SECRET,
  SERVER_PORT: process.env.SERVER_PORT,
};

module.exports = envs;
