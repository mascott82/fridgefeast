// import { FaHeart, FaRegHeart } from "react-icons/fa"
// import axios from "axios"
// import { useState, useEffect, useContext } from "react"
// import { FavouritesContext } from "../hooks/favContext"

// const TestFavouriteButton = ({ sessionCookie, recipeid }) => {
//   const { isFav, addFavourite, removeFavourite } = useContext(FavouritesContext)

//   const handleFavorite = () => {
//     if (isFav.has(recipeid)) {
//       removeFavourite(recipeid)
//     } else {
//       addFavourite(recipeid)
//     }
//   }

//   // const toggleFavourites = async () => {
//   //   try {
//   //     const url = isFav
//   //       ? "http://localhost:3000/test/delete"
//   //       : "http://localhost:3000/test/add"
//   //     await axios.post(url, {
//   //       userid: sessionCookie.userid,
//   //       recipeid: recipeid,
//   //     })
//   //     setIsFav(!isFav)
//   //   } catch (error) {
//   //     console.error("Error toggling favourites:", error)
//   //   }
//   // }

//   return (
//     <button onClick={handleFavorite}>
//       {isFav.has(recipeid) ? <FaHeart color="red" /> : <FaRegHeart />}
//     </button>
//   )
// }

// export default TestFavouriteButton

import { FaHeart, FaRegHeart } from "react-icons/fa"
import axios from "axios"
import { useContext } from "react"
import { FavouritesContext } from "../hooks/favContext"

const TestFavouriteButton = ({ sessionCookie, recipeid, userid }) => {
  const { isFav, addFavourite, removeFavourite } = useContext(FavouritesContext)

const toggleFavourites = () => {
  const isFavourite = isFav.includes(recipeid)
  if (isFavourite) {
    removeFavourite(recipeid)
  } else {
    addFavourite(recipeid)
  }
}

  return (
    <button
      onClick={toggleFavourites}
      style={{ backgroundColor: "transparent" }}>
      {isFav.includes(recipeid) ? <FaHeart color="red" /> : <FaRegHeart />}
    </button>
  )
}

export default TestFavouriteButton
