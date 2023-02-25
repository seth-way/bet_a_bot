const Sequelize = require('sequelize');
const db = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost:5432/bet_a_bot',
  {
    logging: false,
  }
);

module.exports = db;
