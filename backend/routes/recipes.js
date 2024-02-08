/*
 * All routes for Item-listings are defined here
 * Since this file is loaded in server.js into /f,
 *   these routes are mounted onto /f
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express')
const router = express.Router()
const axios = require('axios')

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

router.get('/:id/information', (req, res) => {
  const recipeId = req.params.id

  const apiEndpoint = `https://api.spoonacular.com/recipes/${recipeId}/information`
  
  const options = {
    params: {
      includeNutrition: false
    },
    headers: {
      'Content-Type': 'application/json',
      'x-api-key':  'd244d7df0bca4e509d34d9496190e714'
    }
  }

  axios
    .get(apiEndpoint, options)
    .then((response) => {
      console.log(response.data)
      res.send(response.data)
    })
    .catch((err) => {
      console.error("====", err)
    })
    .finally(() => {
      console.log("--End--")
    })
})

router.get('/:id/ingredients', (req, res) => {
  const recipeId = req.params.id

  const apiEndpoint = `https://api.spoonacular.com/recipes/${recipeId}/ingredientWidget.json`
  
  const options = {
    headers: {
      'Content-Type': 'application/json',
      'x-api-key':  'd244d7df0bca4e509d34d9496190e714'
    }
  }

  axios
    .get(apiEndpoint, options)
    .then((response) => {
      console.log(response.data)
      res.send(response.data)
    })
    .catch((err) => {
      console.error("====", err)
    })
    .finally(() => {
      console.log("--End--")
    })
})

router.get('/:id/instructions', (req, res) => {
  const recipeId = req.params.id

  const apiEndpoint = `https://api.spoonacular.com/recipes/${recipeId}/analyzedInstructions`
  
  const options = {
    params: {
      stepBreakdown: true
    },
    headers: {
      'Content-Type': 'application/json',
      'x-api-key':  'd244d7df0bca4e509d34d9496190e714'
    }
  }

  axios
    .get(apiEndpoint, options)
    .then((response) => {
      console.log(response.data)
      res.send(response.data)
    })
    .catch((err) => {
      console.error("====", err)
    })
    .finally(() => {
      console.log("--End--")
    })
})

module.exports = router
