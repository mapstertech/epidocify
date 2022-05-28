import { useState, useEffect } from 'react';
import { Row, Col, Tabs, Tab, Form, FloatingLabel, Button, Badge, Nav } from 'react-bootstrap';

import History from './tabs/History';
import General from './tabs/General';
import Media from './tabs/Media';
import OriginalText from './tabs/OriginalText';
import Translation from './tabs/Translation';
import Bibliography from './tabs/Bibliography';
import Description from './tabs/Description';
import Commentary from './tabs/Commentary';

function Document() {

  const [activeDocument, setActiveDocument] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  const createNewDocument = () => {
    setActiveDocument({
      title : newTitle
    });
  }

  return (
    <Row>
      <Col xs={8}>
        {/*
        <p>Welcome to the Epidoc builder! This is a tool meant to make it easier for you, a scholar, to create epidoc XML documents, without having to deal with all the fuss of learning XML, figuring out syntax, and more -- so you can get back to the ancient world as fast as possible.</p>
        <p>You can make an account to access documents you've already created, or make a new one by entering a title and pressing "Create".</p>
        */}

        {!activeDocument ?
          <div>
            <Form>
              <h3>Create New Document</h3>
              <Form.Group className="mb-3">
                <FloatingLabel
                  controlId="documentTitle"
                  label="Document Title"
                  className="mb-3"
                >
                  <Form.Control onKeyUp={(e) => setNewTitle(e.target.value)} type="text" placeholder="My Ancient Document" />
                  <Badge bg="light" text="dark" style={{float:'right'}}>This can be changed later, don't worry!</Badge>
                </FloatingLabel>
                <Button variant="primary" type="submit" onClick={() => createNewDocument()}>Create</Button>
              </Form.Group>
            </Form>
          </div>
        : false}

        {activeDocument ?
          <div>
            <h3>{activeDocument.title}</h3>
            <hr />
            <Tab.Container defaultActiveKey="general">
              <Row>
                <Col sm={3}>
                  <Nav variant="pills" className="flex-column">
                    <Nav.Item>
                      <Nav.Link eventKey="general">General</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="original-text">Text</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="description">Description</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="history">History</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="translation">Translation</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="commentary">Commentary</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="bibliography">Bibliography</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="media">Media</Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>
                <Col sm={9}>
                  <Tab.Content>
                    <Tab.Pane eventKey="general" title="General">
                      <General />
                    </Tab.Pane>
                    <Tab.Pane eventKey="original-text" title="Text">
                      <OriginalText />
                    </Tab.Pane>
                    <Tab.Pane eventKey="description" title="Description">
                      <Description />
                    </Tab.Pane>
                    <Tab.Pane eventKey="history" title="History">
                      <History />
                    </Tab.Pane>
                    <Tab.Pane eventKey="translation" title="Translation">
                      <Translation />
                    </Tab.Pane>
                    <Tab.Pane eventKey="commentary" title="Commentary">
                      <Commentary />
                    </Tab.Pane>
                    <Tab.Pane eventKey="bibliography" title="Bibliography">
                      <Bibliography />
                    </Tab.Pane>
                    <Tab.Pane eventKey="media" title="Media">
                      <Media />
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </div>
        : false}
      </Col>
      <Col xs={4} className="right-col">
        <p>What</p>
      </Col>
    </Row>
  )
}

export default Document;