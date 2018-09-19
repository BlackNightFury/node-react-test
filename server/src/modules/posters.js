'use strict';
var axios = require('axios');
var config = require('../config/config');

async function getPosters(page, search) {
  try {
    const res = await axios.get(
      `${config.SETTINGS.OMDB_URL}?apikey=${config.SETTINGS.API_KEY}&s=${search}&page=${page}`
    );
    return res;
  } catch(err) {
    return;
  }  
}
  
async function getAllPosters(search) {
  const posters = [];
  for (let i = 0; i < Math.ceil(config.SETTINGS.MAXIMUM_POSTERS / config.SETTINGS.POSTERS_PER_PAGE); i += 1) {
    const res = await getPosters(i + 1, search);
    if (!res || !res.data.Search) {
      continue;
    }
    posters.push(...res.data.Search);
  }

  return posters;
}

module.exports = {
  getPosters,
  getAllPosters,
};