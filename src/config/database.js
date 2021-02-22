const env = require('./env');

module.exports = {
  CONNECTION_STRING: `postgres://${env.database.user}:${env.database.pass}@${env.database.host}:${env.database.port}/${env.database.db}`,
  dialect: env.database.dialect,
  username: env.database.user,
  password: env.database.pass,
  database: env.database.db,
  host: `${env.database.host}`,
  timestamps: true,

  DB_OPTIONS: {
    dialectOptions: {
      useUTC: true,
    },
    define: {
      timestamps: true,
      underscored: true, 
      underscoredAll: true,
    },
    logging: env.mode !== 'test',
  },
};
