const {Sequelize, DataTypes} = require("sequelize");

const sequelize = new Sequelize(
   process.env.DATABASE_DB,
   process.env.DATABASE_USER,
   process.env.DATABASE_PASSWORD,
   {
      host: process.env.DATABASE_HOST || 'localhost',   //if running with npm run startd, use localhost
      dialect: 'mysql',
  }
  );

sequelize.authenticate().then(() => {
   console.log('Connection has been established successfully.');
}).catch((error) => {
   console.error('Unable to connect to the database: ', error);
});

module.exports = {sequelize, DataTypes};