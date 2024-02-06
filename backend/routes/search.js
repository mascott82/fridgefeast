/*
 * All routes for searching are defined here
 * Since this file is loaded in server.js into /s,
 *   these routes are mounted onto /s
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express')
const router  = express.Router()
const axios = require('axios')

router.get('/:i', (req, res) => {
  const params = req.params.i

  const ingredients = params.split(",")

  const apiEndpoint = 'https://api.spoonacular.com/recipes/findByIngredients'

  const options = {
    params: {
      ingredients: 'apples,flour,sugar',
      number: '5',
      ignorePantry: 'true',
      ranking: '1'
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
    })
    .catch((err) => {
      console.err("====", err)
    })
    .finally(() => {
      console.log("--End--")
    })

  res.json(ingredients)
})

module.exports = router
