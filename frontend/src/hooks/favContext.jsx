import React, { useState } from "react"

export const FavouritesContext = React.createContext()

export const FavouritesProvider = ({ children }) => {
  const [isFav, setIsFav] = useState(new Set())

  const addFavourite = (recipeId) => {
    setIsFav((prevFavs) => new Set(prevFavs).add(recipeId))
  }

  const removeFavourite = (recipeId) => {
    setIsFav((prevFavs) => {
      const newFavs = new Set(prevFavs)
      newFavs.delete(recipeId)
      return newFavs
    })
  }

  return (
    <FavouritesContext.Provider
      value={{ isFav, addFavourite, removeFavourite }}>
      {children}
    </FavouritesContext.Provider>
  )
}
