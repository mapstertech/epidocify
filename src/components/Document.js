import { useState, useEffect } from 'react';
import { Row, Col, Tabs, Tab, Form, FloatingLabel, Button, Badge, Nav } from 'react-bootstrap';

import XMLContainer from './XMLContainer';
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
  const [title, setTitle] = useState('');

  const createNewDocument = () => {
    setActiveDocument({
      title : title
    });
  }

  const editDocument = (properties) => {
    let newDocument = JSON.parse(JSON.stringify(activeDocument));
    for(let prop in properties) {
      newDocument[prop] = properties[prop];
    }
    setActiveDocument(newDocument)
  }

  return (
    <Row>
      <Col xs={12}>
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
                  <Form.Control onKeyUp={(e) => setTitle(e.target.value)} type="text" placeholder="My Ancient Document" />
                  <Badge bg="light" text="dark" className="label-badge">This can be changed later, don't worry!</Badge>
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
                <Col sm={2}>
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
                  <XMLContainer activeDocument={activeDocument} />
                </Col>
                <Col sm={10}>
                  <Tab.Content>
                    <Tab.Pane eventKey="general">
                      <General title={title} editDocument={editDocument} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="original-text">
                      <OriginalText />
                    </Tab.Pane>
                    <Tab.Pane eventKey="description">
                      <Description editDocument={editDocument} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="history">
                      <History />
                    </Tab.Pane>
                    <Tab.Pane eventKey="translation">
                      <Translation />
                    </Tab.Pane>
                    <Tab.Pane eventKey="commentary">
                      <Commentary />
                    </Tab.Pane>
                    <Tab.Pane eventKey="bibliography">
                      <Bibliography />
                    </Tab.Pane>
                    <Tab.Pane eventKey="media">
                      <Media />
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </div>
        : false}
      </Col>
    </Row>
  )
}

export default Document;
