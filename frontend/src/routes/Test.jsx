import { useState, useEffect } from "react"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { Container } from "react-bootstrap"
import axios from "axios"
// import FavouriteButton from "../components/FavouriteButton"
import TestFavouriteButton from "../components/TestFavButton"

const TestFavouritesPage = ({ sessionCookie }) => {
  
  //Get recipeIds from user favourites
  const [favUserRecipes, setFavUserRecipes] = useState([])
  const userid = sessionCookie.userid
  
  const getFavUserRecipes = async () => {
    try {
      const response = await axios.post(`http://localhost:3000/test/list`, {
        userid: userid,
      })
      console.log("🚀 ~ fetchFavRecipes ~ response:", response)

      const favUserRecipes = response.data.favs
      console.log("🚀 ~ getFavUserRecipes ~ favUserRecipes:", favUserRecipes)

      setFavUserRecipes(response.data.favs)
    } catch (error) {
      console.error("Error fetching favorite recipes:", error)
    }
  }
  useEffect(() => {
    getFavUserRecipes()
  }, [])

  //Get recipe ingformation for all the recipeIds
  const [allFavRecipes, setAllFavRecipes] = useState([])

  const favUserRecipesArr = favUserRecipes.map((favUserRecipe) => {
    return favUserRecipe.recipe_id
  })

  const recipeId = favUserRecipesArr.join(",")
  // console.log("🚀 ~ FavouritesPage ~ recipeId:", recipeId)

  const getAllFavRecipes = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/test/bulkrecipes/${recipeId}`
      )



      setAllFavRecipes(response.data)
    } catch (error) {
      console.error("Error fetching favorite recipes:", error)
    }
  }
  useEffect(() => {
    getAllFavRecipes()
  }, [])

  return (
    <Container>
      <div>
        {/* Header Section */}
        <h1>Favourites</h1>
        <p>Your favorite recipes</p>
        Favorite Recipes Card Section
        <div className="p-5 bg-light">
          <Container>
            <Row>
              {allFavRecipes.map((allFavRecipes) => (
                <Col md={4} key={allFavRecipes.id}>
                  <Card className="recipe-card mb-4">
                    <a href={`/recipes/${allFavRecipes.id}`}>
                      <Card.Img
                        variant="top"
                        className="recipe-card-img"
                        src={allFavRecipes.image}
                        alt={allFavRecipes.title}
                      />
                    </a>
                    <div className="fav-button-container">
                      <TestFavouriteButton
                        sessionCookie={sessionCookie}
                        userid={sessionCookie.userid}
                        recipeid={allFavRecipes.id}
                      />
                    </div>
                    <Card.Body>
                      <Card.Title>{allFavRecipes.title}</Card.Title>
                      <Card.Text>
                        {allFavRecipes.readyInMinutes} minutes | Serving Size:{" "}
                        {allFavRecipes.servings}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      </div>
    </Container>
  )
}

export default TestFavouritesPage
