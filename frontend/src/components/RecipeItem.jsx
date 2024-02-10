import { useState, useEffect } from "react"
import { Container, Row, Col, Image, ListGroup } from "react-bootstrap"
import axios from "axios"


const RecipeItem = ({recipe}) => {
  // Hardcoded recipe data
  const dummy_recipe = {
    name: "Delicious Pasta",
    image: "https://via.placeholder.com/400x300",
    servingSize: "4 servings",
    timeToMake: "30 minutes",
    ingredients: [
      "1 pound pasta",
      "2 cups marinara sauce",
      "1/2 cup grated parmesan cheese",
      "1/4 cup chopped fresh basil",
      "Salt and pepper to taste",
    ],
    directions: [
      "Cook pasta according to package instructions. Drain and set aside.",
      "In a large skillet, heat marinara sauce over medium heat.",
      "Add cooked pasta to the skillet and toss until well coated with sauce.",
      "Remove from heat and sprinkle with parmesan cheese and fresh basil.",
      "Season with salt and pepper to taste. Serve hot.",
    ],
  }

  recipe = (recipe !== null ? recipe : dummy_recipe)

  const [recipeById, setRecipeById] = useState([])

  const getRecipeById = async () => {
    try {
      // Make a GET request to your backend route to fetch random recipes
      const response = await axios.get(
        "http://localhost:3000/recipes/:id/information"
      )
      console.log("🚀 ~ getRecipeId ~ response:", response)
      

      // Extract recipe data from the response
      const recipeByIdData = response.data
      console.log("🚀 ~ getRecipeId ~ recipeIdData:", recipeByIdData)
      

      // Update state with the fetched recipes
      setRecipeById(recipeByIdData)
    } catch (error) {
      console.error("Error fetching recipe Id:", error)
    }
  }

  // Call the fetchRecipes function when the component mounts
  useEffect(() => {
    getRecipeById()
  }, [])

  return (
    <Container className="my-5">
      <Row>
        <Col>
          <h2>{recipe.name}</h2>
          <Image src={recipe.image} alt={recipe.name} fluid className="mb-3" />
          <p>
            <strong>Serving Size:</strong> {recipe.servingSize}
          </p>
          <p>
            <strong>Time to Make:</strong> {recipe.timeToMake == null ? "" : recipe.timeToMake}
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <h3>Ingredients</h3>
          <ListGroup>
            {recipe.ingredients == null ? "" : recipe.ingredients.map((ingredient, index) => (
              <ListGroup.Item key={index}>{ingredient}</ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col>
          <h3>Directions</h3>
          <ol>
            {!Array.isArray(recipe.directions) ? <li>recipe.directions</li> : recipe.directions.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </Col>
      </Row>
    </Container>
  )
}

export default RecipeItem
