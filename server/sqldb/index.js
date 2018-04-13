var path = require('path');
import config from '../config';
console.log(config)
// var config = require('../config');
var Sequelize = require('sequelize');
var lodash = require('lodash');

var sequelize = new Sequelize(config.sequelize.uri, config.sequelize.options);

//totalModels are actually name of folders.Models are with '-' replaced with '_'
// var totalModels = ['user'];
var totalModels = ['user', 'analysis'];

// var totalModels = ['appointment','appointment-resource', 'appointment-staff','appointment-class'];
var db = {};

var modelPathFormat = path.join(__dirname, '../api/{0}/{1}.model.js');

for (var i in totalModels) {
    var modelFile = totalModels[i].replace(/-/g, '.');
    var model = sequelize.import(modelPathFormat.replace(/\{0\}/g, totalModels[i]).replace(/\{1\}/g, modelFile));
    console.log("model: ", model.name);
    db[model.name] = model;
}
console.log(db);

Object.keys(db).forEach(function(modelName) {
    if ('associate' in db[modelName]) {
        console.log('insert' in db[modelName])
        console.log('associating',modelName);
        db[modelName].associate(db);
    }
});
console.log('associated');

module.exports = lodash.extend({
    sequelize: sequelize,
    Sequelize: Sequelize
}, db);