import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import RecipeInstructions from "../components/recipeInstructions"
import RecipeItem from "../components/RecipeItem"

const RecipePage = ({ recipes }) => {
  console.log("recipes", recipes)
  return (
    <>
      {recipes.map((_recipe) => (
        <div key={_recipe.id} className="recipe-card">
          <RecipeItem recipe={_recipe} />
        </div>
      ))}
    </>
  )
}

export default RecipePage
