const { dbPool } = require('../connection')

const getFavorites = (user_id) => {
  return dbPool.query('SELECT * FROM favorites where user_id = $1', [user_id])
    .then(data => {
      return data.rows
    })
}

const addFavorites = (favorite) => {
  return dbPool.query(`INSERT INTO favorites (user_id, recipe_id) 
      VALUES ($1, $2)`,
  [favorite.user_id, favorite.recipe_id])
    .then(() => {
      console.log('Favorite added successfully!')
    })
    .catch(error => {
      console.error('Error adding favorite: ', error)
      throw error;
    })
}


module.exports = { getFavorites, addFavorites }