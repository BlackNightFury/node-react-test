'use strict';

var express = require('express');
var cache = require('memory-cache');
var moment = require('moment');
var config = require('../config/config');
var poster = require('../modules/posters');
var router = express.Router();

router.get('/', async (req, res) => {
  res.set('Content-Type', 'application/json');
  const { keyword } = req.query;

  if (!keyword) {
    res.status(400);
    res.json({
      code: 'Bad Request',
      message: 'keyword is missing!',
    });
    return;
  }
  
  const cachedResult = cache.get(keyword);
  if (cachedResult) {
    const { posters, created } = cachedResult;
    res.json({ posters });

    /*
      BONUS If the user searches for a keyword that is cached on the server but the results are older than 1 minute ago, 
      serve the user the cached results immediately, and then refresh the results in the cache 
      so the next user will get the latest results
    */
    if (moment().diff(moment(created, 'YYYY-MM-DDTHH:mm:ss'), 'm') > config.SETTINGS.CACHE_TIMEOUT) {
      const refreshPosters = await poster.getAllPosters(keyword);
      cache.put(keyword, { posters: refreshPosters, created: moment().format('YYYY-MM-DDTHH:mm:ss') });
    }
  } else {
    const posters = await poster.getAllPosters(keyword);
    cache.put(keyword, { posters, created: moment().format('YYYY-MM-DDTHH:mm:ss') });
    res.json({ posters });
  }
});

module.exports = router;