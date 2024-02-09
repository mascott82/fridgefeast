/*
 * All routes for Item-listings are defined here
 * Since this file is loaded in server.js into /f,
 *   these routes are mounted onto /f
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const favQry = require('../db/queries/favorites');

router.get('/list', (req, res) => {
  // userid =1, john.doe@email.com, $2a$12$XpHkSnm4Tf/jZS38tYNpVu1P9B27TPs5f.yhvXCBdHkk3mCZCRVTu
  // userid =2, jane.smith@email.com, $2a$12$XpHkSnm4Tf/jZS38tYNpVu1P9B27TPs5f.yhvXCBdHkk3mCZCRVTu
  if (req.session.username || req.session.userId) {
    // request user's favorites information against database via query
    favQry.getFavourites(req.session.userId).then(favs => {
      const _sortedResult = _customSortQryResult(favs, req.query.sortby);
      // username, userId in templateVars -> goes to views/partials/_header.ejs
      // favorites in templateVars -> goes to views/favorties.ejs
      const templateVars = { username: req.session.username, userId: req.session.userId, favorites: _sortedResult };
      res.render('favorites', templateVars);
    });
  } else {
    // redirect to login page
    res.redirect("/login/");
  }
});


// router.get('/favorites/:userid/:rowlimit', (req, res) => {
//   if (req.session.username || req.session.userId) {
//     const userId = req.params.userid;
//     // follow request rowLimit
//     const rowLimit = req.params.rowlimit;
//     favQry.getFavourites(userId, rowLimit).then(favs => {

//       const _sortedResult = _customSortQryResult(favs, req.query.sortby);
//       const templateVars = { username: req.session.username, userId: req.session.userId, favorites: _sortedResult, rowLimit: req.params.rowLimit };

//       res.render('favorites', templateVars);
//     });

//   } else {
//     // redirect to login page
//     res.redirect("/login/");
//   }
// });

module.exports = router;
