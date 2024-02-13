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
import { useState, useEffect, useContext } from "react"
import { FavouritesContext } from "../hooks/favContext"

const TestFavouriteButton = ({ sessionCookie, recipeid }) => {
  const { isFav, addFavourite, removeFavourite } = useContext(FavouritesContext)

  const toggleFavourites = async () => {
    try {
      const url = isFav.has(recipeid)
        ? "http://localhost:3000/test/delete"
        : "http://localhost:3000/test/add"
      await axios.post(url, {
        userid: sessionCookie.userid,
        recipeid: recipeid,
      })
      // Toggle the isFav state directly based on the current value
      if (isFav.has(recipeid)) {
        removeFavourite(recipeid)
      } else {
        addFavourite(recipeid)
      }
    } catch (error) {
      console.error("Error toggling favourites:", error)
    }
  }

  return (
    <button onClick={toggleFavourites}>
      {isFav.has(recipeid) ? <FaHeart color="red" /> : <FaRegHeart />}
    </button>
  )
}

export default TestFavouriteButton


