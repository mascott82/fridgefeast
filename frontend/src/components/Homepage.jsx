import React from "react"
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

const Homepage = () => {
  return (
    <div>
      {/* Hero Banner */}
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
        <h2 className="featured-title">Featured Recipes</h2>
        <Row>
          <Col md={4}>
            <Card className="recipe-card">
              <Card.Img
                variant="top"
                className="recipe-card-img"
                src="src/assets/placeholder-img.jpg"
                alt="Title"
              />
              <Card.Body>
                <Card.Title>Recipe Name</Card.Title>
                <Card.Text>Short description of the recipe.</Card.Text>
                <Card.Text>45 Minutes | Serves: 3</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="recipe-card">
              <Card.Img
                variant="top"
                className="recipe-card-img"
                src="src/assets/placeholder-img.jpg"
                alt="Title"
              />
              <Card.Body>
                <Card.Title>Recipe Name</Card.Title>
                <Card.Text>Short description of the recipe.</Card.Text>
                <Card.Text>45 Minutes | Serves: 3</Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="recipe-card">
              <Card.Img
                variant="top"
                className="recipe-card-img"
                src="src/assets/placeholder-img.jpg"
                alt="Title"
              />
              <Card.Body>
                <Card.Title>Recipe Name</Card.Title>
                <Card.Text>Short description of the recipe.</Card.Text>
                <Card.Text>45 Minutes | Serves: 3</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default Homepage
