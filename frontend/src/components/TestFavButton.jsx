import { FaHeart, FaRegHeart } from "react-icons/fa"
import axios from "axios"
import { useContext } from "react"
import { FavouritesContext } from "../hooks/favContext"

const TestFavouriteButton = ({ sessionCookie, recipeid }) => {
  const { isFav, addFavourite, removeFavourite, setIsFav } =
    useContext(FavouritesContext)

  const toggleFavourites = () => {
    const isFavourite = isFav.includes(recipeid)
    if (isFavourite) {
      removeFavourite(recipeid).then(() => {
        setIsFav(isFav.filter((id) => id !== recipeid))
      })
    } else {
      addFavourite(recipeid).then(() => {
        setIsFav([...isFav, recipeid])
      })
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
