import { Container, Row, Col, Card, Button } from "react-bootstrap"
import { useState } from "react"
import axios from "axios"
import RecipeCard from "../components/RecipeCard"
import "../styles/Search.css"

const loadMoreCount = 6

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
  const [showIndex, setShowIndex] = useState(loadMoreCount)

  const handleClickLoadMore = () => {
    const newIndexEnd = showIndex + loadMoreCount
    setShowIndex(newIndexEnd)
  }

  const handleSearchSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.get(`http://localhost:3000/s/${searchTerm}`)
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

      {recipes.length > 0 && (
        <Container>
          <Row className="mt-5 justify-content-center">
            {chunkArray(recipes.slice(0, showIndex), 3).map((row, index) => (
              <Row key={index} className="mb-4">
                {row.map((recipe) => (
                  <Col key={recipe.id}>
                    <RecipeCard recipe={recipe} />
                  </Col>
                ))}
              </Row>
            ))}
            {showIndex < 30 && (
              <div className="load-container">
                <button
                  className="btn btn-primary mb-4"
                  onClick={() => handleClickLoadMore()}>
                  Load More
                </button>
              </div>
            )}
          </Row>
        </Container>
      )}
    </div>
  )
}

export default SearchResults
