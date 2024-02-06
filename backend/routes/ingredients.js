/*
 * All routes for Item-listings are defined here
 * Since this file is loaded in server.js into /f,
 *   these routes are mounted onto /f
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express')
const router = express.Router()

const { getIngredients, addIngredient } = require('../db/queries/ingredient')

router.get('/', (req, res) => {
  const userId = req.session.userId ? req.session.userId : 1
  const results = []
  getIngredients()
    .then(ingredients => {
      ingredients.forEach(element => {
        console.log("===", element)
      });

      const templateVars = { username: req.session.username, userId: req.session.userId, results }
      res.render('feeds', templateVars)
    })
})

router.get('/new', (req, res) => {
  const templateVars = { username: req.session.username, userId: req.session.userId }
  res.render('newFeed', templateVars)
})

module.exports = router
