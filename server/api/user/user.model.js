'use strict';
import bcrypt from 'bcrypt-nodejs';
import { METHODS } from 'http';

export default function (sequelize, DataTypes) {
  let Schema = {

    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      }
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  };
  
  let options = {
    hooks: {
      beforeCreate: function (user, field, fn) {
      },

      beforeUpdate: function (user, field, fn) {
      },

      beforeBulkCreate: function (userArray, field, fn) {
      },
    },
    indexes: [{
      fields: ['id']
    }]
  };

  let instanceMethods = {
  };

  let classMethods = {
    createDefault: function createDefaultUser() {
      return this.create({
        email: 'test@gmail.com'
      });
    }
  };
  
  let Model = sequelize.define('User', Schema, options);
  Object.assign(Model, classMethods);
  Object.assign(Model.prototype, instanceMethods);

  return Model;
}
