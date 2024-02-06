/*
 * All routes for Item-listings are defined here
 * Since this file is loaded in server.js into /f,
 *   these routes are mounted onto /f
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

const reviews = require('../db/queries/review');

router.get('/list', (req, res) => {
  const toUserId = req.session.userId ? req.session.userId : 1;
  const toUserName = req.session.username ? req.session.username : '';
  
  console.log("===", reviews);
});

module.exports = router;
