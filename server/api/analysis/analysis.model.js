'use strict';
import {Op} from 'sequelize'

export default function (sequelize, DataTypes) {
  let Schema = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    pageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ip: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    browser: {
      type: DataTypes.JSONB,
      allowNull: false,
      index: true,
    },
    screenResolution: {
      type: DataTypes.JSONB,
      allowNull: false,
      index: true,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      defaultValue: new Date(),
    }
  };

  let hooks = {
    beforeCreate: function (user, field, fn) {
    },

    beforeUpdate: function (user, field, fn) {
    },

    beforeBulkCreate: function (userArray, field, fn) {
    },
  };

  let indexes = [{
    fields: ['id', 'country']
  }];

  let options = {
    hooks,
    indexes
  };

  let classMethods = {
    associate: function (model) {
      var Analysis = model.Analysis;
      var User = model.User;
      var Branch = model.Branch;
      var Service = model.Service;

      User.hasMany(Analysis, { onDelete: 'cascade', hooks: true });
      Analysis.belongsTo(User);
    },
    get(sqldb, {limit = 10, skip=0, userId, browserName, pageUrl, fromDate, toDate, country }={}){
      let userIdFilter = userId ? { UserId: userId } : {};
      let pageUrlFilter = pageUrl ? { pageUrl } : {};
      let countryFilter = country ? {country} : {};
      let browserFilter = browserName ? {browser: {browserName}} : {};
      let dateFilter = calculateDateRangeFilter('date', {fromDate, toDate});
      let filter = Object.assign({},userIdFilter,pageUrlFilter, countryFilter, browserFilter, dateFilter);
      let User = sqldb.User;
      return this.findAll({
        where:filter,
        limit: limit,
        offset: skip,
        include:[{
          model: User
        }]
      });
    },
    insert: function({pageUrl, ip, browser, screenResolution, country, UserId}){
      return this.create({ pageUrl, ip, browser, screenResolution, country, UserId});
    }
  };

  let instanceMethods = {
  };

  let Model = sequelize.define('Analysis', Schema, options);
  Object.assign(Model, classMethods);
  Object.assign(Model.prototype, instanceMethods);

  return Model;
}


function calculateDateRangeFilter(colName, {fromDate, toDate}){
  fromDate = (new Date(fromDate)).dateOnly();
  toDate = (new Date(toDate)).incrementDate().dateOnly();
  if(Date.parse(fromDate) && Date.parse(toDate)) {
    return {
      [Op.and]: [{
        [colName]: {
          gte: fromDate
        }
      }, {
        [colName]: {
          lt: toDate
        }
      }]
    };
  }
  else if(Date.parse(fromDate)){
    return {
      [colName] : {
        gte: fromDate
      }
    };
  }
  else if(Date.parse(toDate)){
    return {
      [colName]: {
        lt: toDate
      }
    };
  }
  return {};
  
}