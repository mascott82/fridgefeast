import { useState, useEffect } from "react"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import axios from "axios"

const Homepage = () => {
  const [randomRecipes, setRandomRecipes] = useState([])

  const getRandomRecipes = async () => {
    try {
      // Make a GET request to your backend route to fetch random recipes

      /* TO DO: update API route to backend instead of to API directly */
      const response = await axios.get("http://localhost:3000/home/random")

      // const response = await axios.get(
      //   "https://api.spoonacular.com/recipes/random?number=3&apiKey=d244d7df0bca4e509d34d9496190e714"
      // )

      console.log("🚀 ~ fetchRecipes ~ RESPOSNE DATA:", response.data)

      // Extract recipe data from the response
      const randomRecipeData = response.data.recipes
      console.log("🚀 ~ fetchRecipes ~ RANDOM RECIPE DATA", randomRecipeData)

      // Update state with the fetched recipes
      setRandomRecipes(randomRecipeData)
    } catch (error) {
      console.error("Error fetching recipes:", error)
    }
  }

  // Call the fetchRecipes function when the component mounts
  useEffect(() => {
    getRandomRecipes()
  }, [])

  return (
    <div>
      {/* Header Section */}
      <div className="p-5 bg-secondary">
        <h1 className="display-5 fw-bold">Fridge Feast</h1>
        <p className="col-md-8 fs-4 lead">
          Your ultimate cooking companion! Fridge Feast allows you to
          effortlessly create delicious meals from what you already have in your
          fridge. Simply input your ingredients, and let the app generate a
          variety of mouthwatering recipes tailored to your ingredients.
        </p>
        <hr className="my-4" />
        <Button className="btn btn-primary btn-lg" type="button">
          Explore Recipes
        </Button>
      </div>

      {/* Featured Recipes Card Section */}
      <div className="p-5 bg-light">
        <h2 className="mb-4">Featured Recipes</h2>

        <Row>
          {randomRecipes.map((randomRecipe) => (
            <Col md={4} key={randomRecipe.id}>
              <Card className="recipe-card">
                <Card.Img
                  variant="top"
                  className="recipe-card-img"
                  src={randomRecipe.image}
                  alt={randomRecipe.title}
                />
                <Card.Body>
                  <Card.Title>{randomRecipe.title}</Card.Title>
                  <Card.Text>
                    {randomRecipe.readyInMinutes} minutes | Serving Size:{" "}
                    {randomRecipe.servings}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  )
}

export default Homepage
