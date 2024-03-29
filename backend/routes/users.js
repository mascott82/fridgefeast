/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express')
const router  = express.Router()
const { getUsers, addUser, loginUser } = require('../db/queries/user')

router.get('/', (req, res) => {
  const results = []

  getUsers()
    .then((users) => {
      users.forEach(user => {
        results.push(user)
      })
      res.send(results)
    })
    .catch((err) => {
      console.log("Error fetching users.", err)
      throw err
    })
})

router.post('/auth', (req, res) => {
  const email = req.body.email
  const password = req.body.password

  loginUser(email, password)
    .then((result) => {
      let isAuth = false
      if (result !== undefined) {
        isAuth = true
        console.log("Login sucessfully!")
      } else {
        isAuth = false
        console.log("Login failed!")
      }
      let randomToken = null;
      if(isAuth){
        const randomTokenLength = 5;
        randomToken = (Math.random() + 1).toString(36).substring(2,2+randomTokenLength);
        console.log("result at login", result)
        res.send({ authToken: randomToken, userid: result.id })
      }else{
        console.log("Login failed!");
        res.status(401).send({ error: "Authentication failed" });
      }      
    })
    .catch((err) => {
      console.error("Login error!", err);
      res.status(500).send({ error: "An unexpected error occurred" });
    })
})

router.post('/save', (req, res) => {
  const user = {
    first_name:  req.body.firstName,
    last_name: req.body.lastName,
    email:  req.body.email,
    password: req.body.password
  }
  addUser(user)
    .then((result) => {
      console.log("Signup successfully")
      res.send(result)
    })
    .catch((err) => {
      console.error("Error creating the user. ", err)
      throw err
    })
})

module.exports = router