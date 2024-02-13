import React from "react"
import Card from "react-bootstrap/Card"
import FavouriteButton from "../components/FavouriteButton"
import TestFavouriteButton from "./TestFavButton"

const RecipeCard = ({ recipe, sessionCookie }) => {
  return (
      <Card className="recipe-card">
        <a href={`/recipes/${recipe.id}`}>
        <Card.Img variant="top" className="recipe-img" src={recipe.image} />
        </a>
        <Card.Body>
          {sessionCookie == null ? (
            <></>
          ) : (
            <div className="fav-button-container">
              <TestFavouriteButton
                sessionCookie={sessionCookie}
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
