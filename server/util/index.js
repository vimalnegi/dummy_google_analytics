'use strict';
import request from 'request';

export function getIPDetails(ip){
  return new Promise((resolve, reject)=>{
    let uri = `http://freegeoip.net/json/${ip}`;
    var options = {
      url: uri,
      headers: {
        'User-Agent': 'request'
      }
    };    
    request(options, (error, response, body)=>{
      let parsedData = JSON.parse(body);
      delete parsedData.__deprecation_message__;
      parsedData.country_name = parsedData.country_name && parsedData.country_name.toLowerCase();
      resolve(parsedData);
    });
  });
}

export function getURL(req) {
  var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  return fullUrl;
}

export function whichBrowser(req) {
  var UAParser = require('ua-parser-js');
  var parser = new UAParser();
  var ua = req.headers['user-agent'];
  var browserName = parser.setUA(ua).getBrowser().name;
  browserName = browserName.toLowerCase()
  var fullBrowserVersion = parser.setUA(ua).getBrowser().version;
  var browserVersion = fullBrowserVersion && fullBrowserVersion.split(".", 1).toString();
  var browserVersionNumber = Number(browserVersion);
  return { browserName, fullBrowserVersion, browserVersion, browserVersionNumber };
}

export function getIp(req) {
  var forwardedIpsStr = req.header('x-forwarded-for');
  var IP = '';

  if (forwardedIpsStr) {
    IP = forwardedIpsStr.split(',')[0];
  }
  return IP;
}

Date.prototype.dateOnly = function () {
  let date = new Date(this);
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  return date;
}

Date.prototype.incrementDate = function (days = 1) {
  let incrementedDate = new Date(this);
  incrementedDate.setDate(this.getDate() + days);
  return incrementedDate;
}