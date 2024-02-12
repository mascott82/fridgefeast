/*
 * All routes for Item-listings are defined here
 * Since this file is loaded in server.js into /f,
 *   these routes are mounted onto /f
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const favQry = require("../db/queries/favorites");

router.get("/list", (req, res) => {
  favQry
    .getFavorites(req.body.userid)
    .then((favs) => {
      res.send({ favs: favs }); // favs = Array[Object,..]
    })
    .catch((error) => {
      console.error("user's fav query has error: ", error);
    });
});

router.post("/delete", (req, res) => {
  favQry
    .removeFavorites({ user_id: req.body.userid, recipe_id: req.body.recipeid })
    .then((result) => {
      res.send({ qty: result.removed_fav_qty });
    })
    .catch((error) => {
      console.error("user's remove fav query has error: ", error);
    });
});

router.post("/add", (req, res) => {
  favQry
    .addFavorites({ user_id: req.body.userid, recipe_id: req.body.recipeid })
    .then((result) => {
      res.send({ qty: result.add_fav_qty });
    })
    .catch((error) => {
      console.error("user's added fav query has error: ", error);
    });
});
module.exports = router;
