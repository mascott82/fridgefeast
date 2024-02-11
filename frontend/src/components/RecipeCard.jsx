import React from "react"
import Card from "react-bootstrap/Card"

const RecipeCard = ({ recipe }) => {
  return (
    <Card className="recipe-card">
      <Card.Img variant="top" className="recipe-img" src={recipe.image} />
      <Card.Body>
        <Card.Title>{recipe.title}</Card.Title>
      </Card.Body>
    </Card>
  )
}

export default RecipeCard
