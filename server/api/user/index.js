'use strict';

import { Router } from 'express';
import * as controller from './user.controller';

var router = new Router();
router.get('/test', controller.test);



module.exports = router;