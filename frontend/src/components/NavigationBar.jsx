// NavigationBar.jsx

import React, {useState} from "react"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import NavDropdown from "react-bootstrap/NavDropdown"
import {CgSearch} from "react-icons/cg"
import SearchModal from "./SearchModal"

const NavigationBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">Fridge Feast</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/signup">Sign Up</Nav.Link>
              <Nav.Link href="/login">Login</Nav.Link>

              <NavDropdown title="User" id="basic-nav-dropdown">
                <NavDropdown.Item href="/favourites">
                  Favourites
                </NavDropdown.Item>
                <NavDropdown.Item href="/pantry">Pantry</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link onClick={handleOpenModal}>
                <CgSearch />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {isModalOpen && (
        <div className="search-modal-overlay">
          <SearchModal onClose={handleCloseModal} />
        </div>
      )}
    </div>
  )
}

export default NavigationBar
