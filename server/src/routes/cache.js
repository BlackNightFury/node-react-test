'use strict';

var express = require('express');
var cache = require('memory-cache');
var moment = require('moment');
var config = require('../config/config');
var poster = require('../modules/posters');
var router = express.Router();

/*
  BONUS Add an endpoint /api/cache/refresh that will loop on every keyword that is cached 
  on the server, and refresh the results with the latest from the external API
*/
router.post('/refresh', (req, res) => {
  res.set('Content-Type', 'application/json');

  const cachedKeys = cache.keys();

  cachedKeys.forEach(async key => {
    cache.put(
      key,
      {
        posters: await poster.getAllPosters(key),
        created: moment().format('YYYY-MM-DDTHH:mm:ss'),
      },
    );
  });
  res.json({
      message: 'Cache refreshed!',
  });
});

module.exports = router;