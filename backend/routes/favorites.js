/*
 * All routes for Item-listings are defined here
 * Since this file is loaded in server.js into /f,
 *   these routes are mounted onto /f
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const favQry = require('../db/queries/favorites');

router.get("/show", (req, res)=>{
    const testuserid=1
    favQry.getFavorites(testuserid).then(favs => {       
        res.send({ favs: favs })  
    }).catch((error) =>{console.error("user's fav query has error: ",error)});
})

router.post('/list', (req, res) => {
    // favorites is located within ProtectedRoute, without login, cannot be accessible.
    // no pagination at qry level, qry all recipes of the given user -> apply checkbox condition, sorting order at the client side -> run pagination with javascript
    // pros: no repetitive qry
    // cons: additional storage space at client level, at the worst case, user's favorites result is greater than client's memery buffer. (but very low chance...)
    favQry.getFavorites(req.body.userid).then(favs => {     
        res.send({ favs: favs })  // favs = Array[Object,..]
    }).catch((error) =>{console.error("user's fav query has error: ",error)});
});

module.exports = router;
