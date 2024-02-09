const { dbPool } = require('../connection')

const getFavorites = (user_id) => {
  const _qry = `SELECT * from recipes where id in (SELECT DISTINCT recipe_id FROM favorites where user_id = ${user_id})`
  console.log(_qry)
  return dbPool.query(_qry)
    .then(data => {
      return data.rows  // data.rows from recipes table with tags, tags will be used post-filtering based on user's checkbox
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