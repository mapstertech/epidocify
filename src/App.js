import { useState, useEffect } from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import $ from 'jquery'

import Document from './components/Document';

function App() {

  // Each of these could have "additional info" for extra text
  const epidocSections = [{
    title : "General",
    tags : ["titleStmt", "publicationStmt", "msIdentifier"]
  },{
    title : "Source Text",
  },{
    title : "Media"
  },{
    title : "Descriptions",
    tags : ["supportDesc", "layoutDesc", "handDesc"]
  },{
    title : "Text History",
    tags : ["origPlace", "origDate"]
  },{
    title : "Translation",
  },{
    title : "Commentary"
  },{
    title : "Bibliography"
  }]

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#home">
            <img
              src="./img/quill-ink-svgrepo-com.svg"
              width="30"
              height="30"
              style={{marginRight: 10}}
              className="d-inline-block align-top"
              alt="Epidocify Icon"
            />
            EpiDocify
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <NavDropdown title="About" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link href="#home">Login</Nav.Link>
              <Nav.Link href="#link">Sign Up</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <Document />
      </Container>
    </div>
  );
}

export default App;
