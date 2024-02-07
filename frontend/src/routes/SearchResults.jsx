import React from "react"
import {Container, Row, Col, Card} from "react-bootstrap"

const SearchResults = () => {
  // Mock Sample Data (DELETE LATER)
  const results = [
    {
      title: "Result 1",
      description: "Description of result 1.",
      time: "45 Minutes",
      serves: 3,
    },
    {
      title: "Result 2",
      description: "Description of result 2.",
      time: "60 Minutes",
      serves: 4,
    },
    {
      title: "Result 3",
      description: "Description of result 3.",
      time: "30 Minutes",
      serves: 2,
    },
    {
      title: "Result 4",
      description: "Description of result 4.",
      time: "75 Minutes",
      serves: 6,
    },
  ]

  return (
    <Container>
      <Row>
        {/* Filter By section */}
        <Col md={3} className="mb-4">
          <div className="filters">
            <h3>Filters</h3>
            <hr />
            <div>
              <h5>Filter by:</h5>
              <ul>
                <li>
                  <input type="checkbox" /> Option 1
                </li>
                <li>
                  <input type="checkbox" /> Option 2
                </li>
                <li>
                  <input type="checkbox" /> Option 3
                </li>
              </ul>
            </div>
          </div>
        </Col>

        {/* Results section */}
        <Col md={9}>
        <h1>Search Results</h1>
          <Row>
            {results.map((result, index) => (
              <Col key={index} md={4} sm={6} xs={12}>
                <Card className="recipe-card">
                  <Card.Img
                    variant="top"
                    className="recipe-card-img"
                    src="src/assets/placeholder-img.jpg"
                    alt="Title"
                  />
                  <Card.Body>
                    <Card.Title>{result.title}</Card.Title>
                    <Card.Text>{result.description}</Card.Text>
                    <Card.Text>
                      {result.time} | Serves: {result.serves}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default SearchResults
