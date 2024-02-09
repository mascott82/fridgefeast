import { Container, Row, Col, Card, Button } from "react-bootstrap"
import { useState} from "react"
import axios from "axios"
import RecipeCard from "../components/RecipeCard"

function SearchResults() {
  const [searchTerm, setSearchTerm] = useState("")
  const [recipes, setRecipes] = useState([])

  const handleSearchSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const response = await axios.get(`http://localhost:3000/s/chocolate`)
      console.log("🚀 ~ handleSearchSubmit ~ response:", response)

      const recipeData = response.data
      console.log("🚀 ~ handleSearchSubmit ~ recipeData :", recipeData )
      
      setRecipes(response.data)
    } catch (error) {
      console.error("Error fetching recipes with ingredient:", error)
    }
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Body>
              <h2 className="mb-4">Find Recipes</h2>
              <form onSubmit={handleSearchSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    required
                    placeholder="Enter ingredients (up to 5)"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-5 justify-content-center">
        {recipes.map((recipe) => (
          <Col key={recipe.id} md={4} className="mb-4">
            <RecipeCard recipe={recipe} />
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default SearchResults
