import React, { useState, useEffect } from "react"
import axios from "axios"

export const FavouritesContext = React.createContext()

export const FavouritesProvider = ({ children, sessionCookie }) => {
  const [isFav, setIsFav] = useState([])

  useEffect(() => {
    // Fetch the favourite recipes from the server
    axios
      .get("http://localhost:3000/test/isFav", {user_id: sessionCookie.userid})
      .then((response) => {
        console.log("🚀 ~ .then ~ response:", response)

        // Add the IDs of the favourite recipes to the isFav array
        const favIds = response.data.favRecipeIds.map(
          (recipe) => recipe.recipe_id
        )
        console.log("🚀 ~ .then ~ favIds:", favIds)
        setIsFav(favIds)
      })
      .catch((error) => {
        console.error("Error fetching favourite recipes: ", error)
      })
  }, [sessionCookie])

  const addFavourite = async (recipeid) => {
    try {
      const response = await axios.post(`http://localhost:3000/test/add`, {
        userid: sessionCookie.userid,
        recipeid: recipeid,
      })
      console.log(`Added fav qty: ${response.data.added_fav_qty}`)
      setIsFav((prevFavs) => [...prevFavs, recipeid])
    } catch (error) {
      console.error("Error adding recipe to user faves:", error)
    }
  }

  const removeFavourite = async (recipeid) => {
    try {
      const response = await axios.post(`http://localhost:3000/test/delete`, {
        userid: sessionCookie.userid,
        recipeid: recipeid,
      })
      console.log(`Removed fav qty: ${response.data.removed_fav_qty}`)
      setIsFav((prevFavs) => prevFavs.filter((id) => id !== recipeid))
    } catch (error) {
      console.error("Error deleting recipe from user faves:", error)
    }
  }

  return (
    <FavouritesContext.Provider
      value={{ isFav, addFavourite, removeFavourite }}>
      {children}
    </FavouritesContext.Provider>
  )
}
