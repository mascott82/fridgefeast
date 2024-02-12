import { Container, Row, Col, Card, Button } from "react-bootstrap"
import { useState } from "react"
import axios from "axios"
import RecipeCard from "../components/RecipeCard"
import "../styles/Search.css"

function chunkArray(array, chunkSize) {
  const chunks = []
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize))
  }
  return chunks
}

function SearchResults() {
  const [searchTerm, setSearchTerm] = useState("")
  const [recipes, setRecipes] = useState([])

  const handleSearchSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.get(`http://localhost:3000/s/${searchTerm}`)
      console.log("🚀 ~ handleSearchSubmit ~ response:", response)

      const recipeData = response.data
      console.log("🚀 ~ handleSearchSubmit ~ recipeData :", recipeData)

      setRecipes(response.data)
    } catch (error) {
      console.error("Error fetching recipes with ingredient:", error)
    }
  }

  return (
    <div className="bg-light pt-5">
      <Container>
        <Row className="justify-content-center recipe-row">
          <Col>
            <Card className="search-card">
              <Card.Body>
                <h2 className="mb-4">Find Recipes</h2>
                <form onSubmit={handleSearchSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      required
                      placeholder="Enter ingredients (separate by comma)"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Button variant="primary" type="submit" className="mt-4">
                    Submit
                  </Button>
                </form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      
      <Container>
        <Row className="mt-5 justify-content-center">
          {chunkArray(recipes, 3).map((row, index) => (
            <Row key={index} className="mb-4">
              {row.map((recipe) => (
                <Col key={recipe.id}>
                  <RecipeCard recipe={recipe} />
                </Col>
              ))}
            </Row>
          ))}
        </Row>
      </Container>
    </div>
  )
}

export default SearchResults
