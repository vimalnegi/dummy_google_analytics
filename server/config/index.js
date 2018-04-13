let DB_USER_NAME = process.env.DB_USER_NAME || 'postgres';
let DB_PASSWORD = process.env.DB_PASSWORD || 'password';
let DB_LOCATION = process.env.DB || 'localhost';
let DB_PORT = process.env.DB_PORT || 5432;
let DB_NAME = process.env.DB_NAME || 'analytics';
import path from 'path';


let config = {
  root: path.normalize(__dirname + '/../..'),
  // regenerateDB: true,
  sequelize: {
    //password is password here. username is postgres and database is analytics
    uri: `postgres://${DB_USER_NAME}:${DB_PASSWORD}@${DB_LOCATION}:${DB_PORT}/${DB_NAME}`,

    options: {
      logging: false,
      // logging: console.log,
      dialect: 'postgres',
      define: {
        timestamps: false,
        //underscored true will ensure that whenever a foreign key created automatically it should be in Snake_case format
        underscored: false,
        freezeTableName: true //restrict to change table name into plural form
      }
    }
  },
};

export default config;