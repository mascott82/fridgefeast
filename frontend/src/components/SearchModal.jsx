import React from "react"
import {Modal, Button, Card} from "react-bootstrap"

function SearchModal({onClose}) {
  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Find Recipes</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card>
          <Card.Title>Add ingredients (up to 5)</Card.Title>
          <Card.Body>
            <input
              type="text"
              placeholder="Type an ingredient name..."
              className="form-control mb-2"
            />
            {/* Search items */}
          </Card.Body>
        </Card>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onClose}>
          Search Recipes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default SearchModal
