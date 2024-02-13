import { useState, useEffect } from "react"
import { Container, Row, Col, Image, ListGroup } from "react-bootstrap"
import axios from "axios"
import { useLocation } from "react-router-dom"
import "../styles/RecipePage.css"

const RecipeItem = () => {
  const [recipeById, setRecipeById] = useState(null)
  const location = useLocation().pathname
  const recipeId = location.replace("/recipes/", "")

  useEffect(() => {
    const getRecipeById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/recipes/${recipeId}/information`
        )
        setRecipeById(response.data)
      } catch (error) {
        console.error("Error fetching recipe:", error)
      }
    }

    getRecipeById()
  }, [])

  if (!recipeById) {
    return <div>Loading...</div>
  }

  return (
    <Container className="my-5">
      <Row>
        <Col>
          <h2>{recipeById.title}</h2>
          <Image
            src={recipeById.image}
            alt={recipeById.title}
            fluid
            className="mb-3"
          />
          <p>
            <strong>Serving Size:</strong> {recipeById.servings}
          </p>
          <p>
            <strong>Time to Make:</strong> {recipeById.readyInMinutes} minutes
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <h3>Ingredients</h3>
          <ListGroup>
            {recipeById.extendedIngredients.map((ingredient, index) => (
              <ListGroup.Item key={index}>{ingredient.original}</ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col>
          {recipeById.analyzedInstructions &&
            recipeById.analyzedInstructions.length > 0 && (
              <>
                <h3>Directions</h3>
                <ol>
                  {recipeById.analyzedInstructions[0].steps.map(
                    (step, index) => (
                      <li key={index}>{step.step}</li>
                    )
                  )}
                </ol>
              </>
            )}
        </Col>
      </Row>
    </Container>
  )
}

export default RecipeItem
