import fs from 'fs';
import path from 'path';
import { Sequelize, DataTypes } from 'sequelize';
import process from 'process';
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const configSuffix = env === 'development' ? '.ts' : '.js';
const config = require(__dirname + `/../config/config${configSuffix}`)[env];
const db: any = {};

let sequelize: any;
if (config.use_env_variable) {
  // @ts-ignore
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else if (config.url) {
  // @ts-ignore
  sequelize = new Sequelize(config.url, config);
} else {
  // @ts-ignore
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Use fs.readdirSync and dynamic import (import()) to load models
fs.readdirSync(__dirname)
  .filter((file: any) => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === (process.env.NODE_ENV === 'development' ? '.ts' : '.js') &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(async (file: any) => {
    // Use dynamic import instead of require
    const model = (await import(path.join(__dirname, file))).default(sequelize, DataTypes);
    // @ts-ignore
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  // @ts-ignore
  if (db[modelName].associate) {
    // @ts-ignore
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
export { db, sequelize };
