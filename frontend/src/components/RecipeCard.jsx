import React from "react"
import Card from "react-bootstrap/Card"
import FavouriteButton from "../components/FavouriteButton"


const RecipeCard = ({ recipe, sessionCookie }) => {
  return (
    <Card className="recipe-card">
      <Card.Img variant="top" className="recipe-img" src={recipe.image} />
      <Card.Body>
        {sessionCookie == null ? (
          <></>
        ) : (
          <div className="fav-button-container">
            <FavouriteButton
              addNew={true}
              userid={sessionCookie.userid}
              recipeid={recipe.id}
            />
          </div>
        )}
        <Card.Title>{recipe.title}</Card.Title>
      </Card.Body>
    </Card>
  )
}

export default RecipeCard
