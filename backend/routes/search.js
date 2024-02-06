/*
 * All routes for searching are defined here
 * Since this file is loaded in server.js into /s,
 *   these routes are mounted onto /s
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

router.get('/:i', (req, res) => {
  const ingredients = req.params.i;

  console.log("====", ingredients);
});

module.exports = router;
