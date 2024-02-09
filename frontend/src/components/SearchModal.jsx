import { Modal, Button, Card } from "react-bootstrap"
import { useEffect, useState, FormEvent } from "react"
import axios from "axios"

function SearchModal({ onClose }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [recipes, setRecipes] = useState([])

  const handleSearchSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.get(
        `http://localhost:5000/api/recipes/search?searchTerm=${searchTerm}`
      )

      const responseData = response.data
      setRecipes(response)
    } catch (error) {
      console.error("Error fetching recipes with ingredient:", error)
    }
  }

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Find Recipes</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card>
          <Card.Title>Add ingredients (up to 5)</Card.Title>
          <Card.Body>
            <form onSubmit={handleSearchSubmit}>
              <input
                type="text"
                required
                placeholder="Enter a search term"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit">Submit</button>
            </form>
            {/* Search items */}
          </Card.Body>
        </Card>
      </Modal.Body>
      <Modal.Footer>
        <div>
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </Modal.Footer>
    </Modal>
  )
}

export default SearchModal
