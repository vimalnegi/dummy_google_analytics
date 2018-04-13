'use strict';

import bodyParser from 'body-parser';
import cors from 'cors';
import config from './index';
import path from 'path';
import express from 'express';

export default function(app) {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cors());
  app.set('public',path.join(config.root , 'public'));
  app.use(express.static(app.get('public')));  
  app.set('resource', path.join(config.root, 'resource'));
  app.use(express.static(app.get('resource')));
}