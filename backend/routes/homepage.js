/*
 * All routes for searching are defined here
 * Since this file is loaded in homepage.js into /home,
 *   these routes are mounted onto /home
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express')
const router = express.Router()
const axios = require('axios')

router.get('/random', (req, res) => {
  const apiEndpoint = `https://api.spoonacular.com/recipes/random`

  const options = {
    params: {
      'include-tags': 'meal, cuisine, vegetarian, dessert',
      number: 3
    },

    headers: {
      'Content-Type': 'application/json',
      'x-api-key': 'd244d7df0bca4e509d34d9496190e714'
    }
  }

})


module.exports = router

// RESPONSE DATA RESULTS (from thunderclient)
// {
//   "recipes": [
//     {
//       "vegetarian": false,
//       "vegan": false,
//       "glutenFree": true,
//       "dairyFree": true,
//       "veryHealthy": false,
//       "cheap": false,
//       "veryPopular": false,
//       "sustainable": false,
//       "lowFodmap": false,
//       "weightWatcherSmartPoints": 13,
//       "gaps": "no",
//       "preparationMinutes": -1,
//       "cookingMinutes": -1,
//       "aggregateLikes": 2,
//       "healthScore": 11,
//       "creditsText": "foodista.com",
//       "sourceName": "foodista.com",
//       "pricePerServing": 169.5,
//       "id": 655793,
//       "title": "Peruvian Roast Chicken",
//       "readyInMinutes": 45,
//       "servings": 4,
//       "sourceUrl": "https://www.foodista.com/recipe/48JPTJ2N/peruvian-roast-chicken",
//       "image": "https://spoonacular.com/recipeImages/655793-556x370.jpg",
//       "imageType": "jpg",
//     },
//     {
//       "vegetarian": false,
//       "vegan": false,
//       "glutenFree": true,
//       "dairyFree": true,
//       "veryHealthy": false,
//       "cheap": false,
//       "veryPopular": false,
//       "sustainable": false,
//       "lowFodmap": false,
//       "weightWatcherSmartPoints": 13,
//       "gaps": "no",
//       "preparationMinutes": -1,
//       "cookingMinutes": -1,
//       "aggregateLikes": 2,
//       "healthScore": 11,
//       "creditsText": "foodista.com",
//       "sourceName": "foodista.com",
//       "pricePerServing": 169.5,
//       "id": 655793,
//       "title": "Peruvian Roast Chicken",
//       "readyInMinutes": 45,
//       "servings": 4,
//       "sourceUrl": "https://www.foodista.com/recipe/48JPTJ2N/peruvian-roast-chicken",
//       "image": "https://spoonacular.com/recipeImages/655793-556x370.jpg",
//       "imageType": "jpg",
//     },
//     {
//       "vegetarian": false,
//       "vegan": false,
//       "glutenFree": true,
//       "dairyFree": true,
//       "veryHealthy": false,
//       "cheap": false,
//       "veryPopular": false,
//       "sustainable": false,
//       "lowFodmap": false,
//       "weightWatcherSmartPoints": 13,
//       "gaps": "no",
//       "preparationMinutes": -1,
//       "cookingMinutes": -1,
//       "aggregateLikes": 2,
//       "healthScore": 11,
//       "creditsText": "foodista.com",
//       "sourceName": "foodista.com",
//       "pricePerServing": 169.5,
//       "id": 655793,
//       "title": "Peruvian Roast Chicken",
//       "readyInMinutes": 45,
//       "servings": 4,
//       "sourceUrl": "https://www.foodista.com/recipe/48JPTJ2N/peruvian-roast-chicken",
//       "image": "https://spoonacular.com/recipeImages/655793-556x370.jpg",
//       "imageType": "jpg",
//     },
//     {
//       "vegetarian": false,
//       "vegan": false,
//       "glutenFree": true,
//       "dairyFree": true,
//       "veryHealthy": false,
//       "cheap": false,
//       "veryPopular": false,
//       "sustainable": false,
//       "lowFodmap": false,
//       "weightWatcherSmartPoints": 13,
//       "gaps": "no",
//       "preparationMinutes": -1,
//       "cookingMinutes": -1,
//       "aggregateLikes": 2,
//       "healthScore": 11,
//       "creditsText": "foodista.com",
//       "sourceName": "foodista.com",
//       "pricePerServing": 169.5,
//       "id": 655793,
//       "title": "Peruvian Roast Chicken",
//       "readyInMinutes": 45,
//       "servings": 4,
//       "sourceUrl": "https://www.foodista.com/recipe/48JPTJ2N/peruvian-roast-chicken",
//       "image": "https://spoonacular.com/recipeImages/655793-556x370.jpg",
//       "imageType": "jpg",
// }

// ]
// }