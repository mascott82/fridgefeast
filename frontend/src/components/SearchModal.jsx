// SearchModal.jsx

import React from "react"
import {Modal, Button, Card} from "react-bootstrap"

function SearchModal({onClose}) {
  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Search Modal</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card>
          <Card.Body>
            <input
              type="text"
              placeholder="Input Ingredients (up to 5)"
              className="form-control mb-2"
            />
            {/* Your search results can be displayed here */}
          </Card.Body>
        </Card>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={onClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default SearchModal
