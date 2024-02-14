import React, { useState, useEffect } from "react"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { Container } from "react-bootstrap"
import axios from "axios"
import TestFavouriteButton from "../components/TestFavButton"


const TestFavouritesPage = ({ sessionCookie }) => {
  const [loading, setLoading] = useState(true) // State to track loading
  const [allFavRecipes, setAllFavRecipes] = useState([])
  const userid = sessionCookie.userid

  useEffect(() => {
    const getFavUserRecipes = async () => {
      try {
        const response = await axios.post(`http://localhost:3000/test/list`, {
          userid: userid,
        })
        const favUserRecipes = response.data.favs
        const recipeIds = favUserRecipes.map((fav) => fav.recipe_id).join(",")
        const responseAll = await axios.get(
          `http://localhost:3000/test/bulkrecipes/${recipeIds}`
        )
        setAllFavRecipes(responseAll.data)
        setLoading(false) // Set loading to false when data is fetched
      } catch (error) {
        console.error("Error fetching user fave recipes:", error)
      }
    }
    getFavUserRecipes()
  }, [userid])

  return (
    <Container>
      <div className="mt-5">
        <h1>Favourites</h1>
        <div className="p-5 bg-light">
          <Container>
            {loading ? ( // Check loading state and display loading message if true
              <div>Loading...</div>
            ) : (
              <Row>
                {allFavRecipes.map((favRecipe) => (
                  <Col md={4} key={favRecipe.id}>
                    <Card className="recipe-card mb-4">
                      <a href={`/recipes/${favRecipe.id}`}>
                        <Card.Img
                          variant="top"
                          className="recipe-card-img"
                          src={favRecipe.image}
                          alt={favRecipe.title}
                        />
                      </a>
                      <div className="fav-button-container">
                        <TestFavouriteButton
                          sessionCookie={sessionCookie}
                          userid={sessionCookie.userid}
                          recipeid={favRecipe.id}
                        />
                      </div>
                      <Card.Body>
                        <Card.Title>{favRecipe.title}</Card.Title>
                        <Card.Text>
                          {favRecipe.readyInMinutes} minutes | Serving Size:{" "}
                          {favRecipe.servings}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
          </Container>
        </div>
      </div>
    </Container>
  )
}

export default TestFavouritesPage
