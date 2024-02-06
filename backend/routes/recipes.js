/*
 * All routes for Item-listings are defined here
 * Since this file is loaded in server.js into /f,
 *   these routes are mounted onto /f
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express')
const router = express.Router()

const { getRecipes, getRecipeById } = require('../db/queries/recipe')

router.get('/', (req, res) => {
  const results = []
  getRecipes()
    .then(recipes => {
      recipes.forEach(element => {
       
        results.push(element)
      })
      res.json(results)
    })
})

router.get('/:id', (req, res) => {
  const recipeId = req.params.id
  const results = []
  getRecipeById(recipeId)
    .then(recipe => {
      
      res.json(recipe)
    })
})

module.exports = router
