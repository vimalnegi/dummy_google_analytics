const express = require('express');
const app = express();
import middleWare from './config/express';
import config from './config';
import sqldb from './sqldb';
middleWare(app);
import { getIPDetails, getURL, whichBrowser, getIp } from './util';
import User from './api/user/user.model';
// import Analysis from './api/analysis/analysis.model';
import { Analysis } from './sqldb';

app.get('/list', (req, res) => {
  let query = req.query;
  return Analysis.get(sqldb, query)
  .then(data=>{
    res.send({query, data});
  });
});

app.post('/',(req, res)=>{
  let id = req.body.id;
  let data = {};
  data.ip = getIp(req);
  data.pageUrl = req.body.pageUrl && req.body.pageUrl.toLowerCase();
  data.resolution = req.body.resolution;
  let userAgent = whichBrowser(req);
  getIPDetails(data.ip)
    .then(resp => {
      return Analysis.insert({ 
        pageUrl: data.pageUrl,
        ip: data.ip,
        browser: userAgent,
        screenResolution: data.resolution,
        country: resp.country_name,
        UserId: id
      });
    })
    .then(data=>{
      res.send({success: true, data});
    })
    .catch(err=>{
      console.log(err);
      res.status(500)
          .send({success: false, err})
    });
    
});




function startServer(app){
  app.listen(3000, () => console.log('Example app listening on port 3000!'));
}

sqldb.sequelize.sync({ force: config.regenerateDB })
  .then(()=> {
    return sqldb.User.createDefault().then((data)=>{}).catch((err)=>{console.log(err)})
  })
  .then(()=>{
    startServer(app);
    return null;
  })
  .catch(function (err) {
    console.log(err.stack);
    console.log('Server failed to start due to error: %s', err.stack);
  });


