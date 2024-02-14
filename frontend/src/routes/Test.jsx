import React, { useState, useEffect } from "react"
import axios from "axios"
import { Container, Row, Col, Card } from "react-bootstrap"
import FiltersMenu from "../components/FiltersMenu"
import TestFavouriteButton from "../components/TestFavButton"
import "../styles/Test.css"

const TestFavouritesPage = ({ sessionCookie }) => {
  const [loading, setLoading] = useState(true)
  const [allFavRecipes, setAllFavRecipes] = useState([])
  const [filteredFavRecipes, setFilteredFavRecipes] = useState([]) // State to hold filtered recipes
  const userid = sessionCookie.userid
  
useEffect(() => {
  const getFavUserRecipes = async () => {
    try {
      const response = await axios.post(`http://localhost:3000/test/list`, {
        userid: userid,
      })
      const favUserRecipes = response.data.favs
      if (!Array.isArray(favUserRecipes) || favUserRecipes.length === 0) {
        setLoading(false)
        return
      }
      const recipeIds = favUserRecipes.map((fav) => fav.recipe_id).join(",")
      const responseAll = await axios.get(
        `http://localhost:3000/test/bulkrecipes/${recipeIds}`
      )
      if (!Array.isArray(responseAll.data) || responseAll.data.length === 0) {
        setLoading(false)
        return
      }
      setAllFavRecipes(responseAll.data)
      setFilteredFavRecipes(responseAll.data) // Set filteredFavRecipes to allFavRecipes
      setLoading(false)
    } catch (error) {
      console.error("Error fetching user fave recipes:", error)
      setLoading(false) // Add this line
    }
  }
  getFavUserRecipes()
}, [userid])

  const handleFilterChange = (conditions, times) => {
    // Check if any filters are checked
    const noConditionsChecked = Object.keys(conditions).length === 0
    const noTimesChecked = Object.keys(times).length === 0

    let tempFilteredRecipes = [...allFavRecipes] // Create a temporary variable to hold the filtered recipes

    // Filtering logic based on selected conditions and times
    tempFilteredRecipes = allFavRecipes.filter((recipe) => {
      let conditionsMatch = true
      let timeMatch = true

      if (!noConditionsChecked) {
        conditionsMatch = Object.keys(conditions).every((condition) => {
          const lowerCaseCondition = condition.toLowerCase()
          console.log(
            "🚀 ~ conditionsMatch ~ lowerCaseCondition:",
            lowerCaseCondition
          )
          return recipe.diets.some((diet) =>
            diet.toLowerCase().includes(lowerCaseCondition)
          )
        })
        console.log("🚀 ~ conditionsMatchs ~ recipe.diets:", recipe.diets)
      }

      if (!noTimesChecked) {
        timeMatch = Object.keys(times).some((time) => {
          const [min, max] = time.split("-").map(Number)
          const readyInMinutes = parseInt(recipe.readyInMinutes)
          return min <= readyInMinutes && readyInMinutes <= max
        })
      }
      console.log(
        "🚀 ~ allFavRecipes.filter ~ conditionsMatch:",
        conditionsMatch
      )
      console.log("🚀 ~ allFavRecipes.filter ~ timeMatch:", timeMatch)
      return conditionsMatch && timeMatch
    })
    // Update filtered recipes state
    setFilteredFavRecipes(tempFilteredRecipes)
  }

  return (
    <Container className="my-4">
      <Row>
        <Col md={3}>
          <FiltersMenu onFilterChange={handleFilterChange} />
        </Col>
        <Col md={9}>
          <h1 className="my-4">Favourites</h1>
          {loading ? (
            <div>Loading...</div>
          ) : filteredFavRecipes.length === 0 ? (
            <div>You don't have any favourited recipes. Explore recipes <a href='/search'>here</a>!</div>
          ) : (
            <Row>
              {filteredFavRecipes.map((favRecipe) => (
                <Col key={favRecipe.id} md={4}>
                  <Card className="recipe-card mb-4">
                    <a href={`/recipes/${favRecipe.id}`}>
                      <Card.Img
                        variant="top"
                        className="recipe-card-img"
                        src={favRecipe.image}
                        alt={favRecipe.title}
                      />
                    </a>
                    <Card.Body>
                      <div className="fav-btn">
                        <TestFavouriteButton
                          sessionCookie={sessionCookie}
                          recipeid={favRecipe.id}
                        />
                      </div>
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
        </Col>
      </Row>
    </Container>
  )
}

export default TestFavouritesPage
