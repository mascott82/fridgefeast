/*
 * All routes for searching are defined here
 * Since this file is loaded in server.js into /s,
 *   these routes are mounted onto /s
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express')
const router  = express.Router()
const axios = require('axios')

// Route for searching recipes by ingredients
router.get('/:i', (req, res) => {
  const params = req.params.i

  const ingredients = params.split(",")

  const apiEndpoint = 'https://api.spoonacular.com/recipes/findByIngredients'

  const options = {
    params: {
      ingredients: 'apples,flour,sugar',
      number: 5,
      ignorePantry: true,
      ranking: 1
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
      console.err("====", err)
    })
    .finally(() => {
      console.log("--End--")
    })
})

// Route for finding similar recipes by recipe ID
router.get('/:id/similar', (req, res) => {
  const recipeId = req.params.id

  const apiEndpoint = `https://api.spoonacular.com/recipes/${recipeId}/similar`
  
  const options = {
    params: {
      number: 5
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

router.get('/random', (req, res) => {
  const apiEndpoint = `https://api.spoonacular.com/recipes/random`
  
  const options = {
    params: {
      'include-tags': 'meal, cuisine, vegetarian, dessert',
      number: 10
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
