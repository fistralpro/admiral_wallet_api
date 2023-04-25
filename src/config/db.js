const {Sequelize, DataTypes} = require("sequelize");

const {
   DATABASE_DB,
   DATABASE_USER,
   DATABASE_PASSWORD,
   DATABASE_HOST
} = process.env;

const sequelize = new Sequelize(
   process.env.DATABASE_DB,
   process.env.DATABASE_USER,
   process.env.DATABASE_PASSWORD,
   {
      host: process.env.DATABASE_HOST,
      dialect: 'mysql',
  }
  );

sequelize.authenticate().then(() => {
   console.log('Connection has been established successfully.');
}).catch((error) => {
   console.error('Unable to connect to the database: ', error);
   console.error(DATABASE_DB);
   console.error(DATABASE_USER);
   console.error(DATABASE_PASSWORD);
   console.error(DATABASE_HOST);

});

module.exports = {sequelize, DataTypes};