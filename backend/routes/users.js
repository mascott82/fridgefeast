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
      res.send({ msg: isAuth })
    })
    .catch((err) => {
      console.error("Logon error!", err)
      throw err
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
    .then(() => {
      res.send({ message: 1 })
    })
    .catch((err) => {
      console.error("Error creating the user. ", err)
      throw err
    })
})

module.exports = router