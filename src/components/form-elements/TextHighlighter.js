import { useEffect, useState } from 'react'
import $ from 'jquery';
import { Row, Col, Container, FloatingLabel, Form, Button, Badge, ButtonGroup, Alert, Accordion } from 'react-bootstrap';

function TextHighlighter({ placeholder, description, highlighters, secondaryHighlighters, setData }) {

    const [ textRaw, setTextRaw ] = useState('');
    const [ accordionOpen, setAccordionOpen ] = useState(false);

    const addHighlight = (highlightTerm) => {
      var selection = window.getSelection().getRangeAt(0);
      var selectedText = selection.extractContents();

      var wrappedEle = document.createElement(highlightTerm);
      wrappedEle.appendChild(selectedText);
      selection.insertNode(wrappedEle);

      setData($('.highlighted-text').html().replace(/<br>/g, '\n'))
    }

    const removeHighlight = (highlightTerm, index) => {
      const thisEle = $('.highlighted-text').find(highlightTerm).eq(index);
      thisEle.children().each(function() {
        $(this).contents().unwrap();
      })
      thisEle.contents().unwrap();

      setData($('.highlighted-text').html().replace(/<br>/g, '\n'))
    }

    return (
      <div>

        {textRaw !== "" ?
          <Row>
            <Col sm="8">
                <Row>
                  <Col>
                    <ButtonGroup className="text-toolbar-group mb-2" aria-label="Basic example">
                      {highlighters.map((highlightTerm, i) => {
                        return (
                          <div key={`highlight-${i}`}>
                            <Button onClick={() => addHighlight(highlightTerm)} size="sm" variant="outline-secondary">{highlightTerm}</Button>
                            {secondaryHighlighters[highlightTerm] ?
                              <span className="secondary-highlighters">
                                {secondaryHighlighters[highlightTerm].map((secondaryHighlightTerm, ii) => {
                                  return (
                                    <Button key={`sHighlight-${ii}`} onClick={() => addHighlight(secondaryHighlightTerm)} size="sm" variant="outline-secondary">{secondaryHighlightTerm}</Button>
                                  )
                                })}
                              </span>
                            : false}
                          </div>
                        )
                      })}
                    </ButtonGroup>
                    <Alert variant="dark">
                      <div className="highlighted-text" dangerouslySetInnerHTML={{__html : textRaw.replace(/\n/g, '<br />')}} />
                    </Alert>
                  </Col>
                </Row>
            </Col>
            <Col sm={4}>
              {highlighters.length > 0 ?
                <Accordion activeKey={accordionOpen}>
                  {highlighters.map((highlightTerm, i) => {
                    let texts = []
                    $('.highlighted-text').find(highlightTerm).each(function() {
                      texts.push($(this).html());
                    })
                    if(texts.length > 0) {
                      return (
                        <Accordion.Item eventKey={i} key={`highlighted-${i}`} onClick={() => setAccordionOpen(accordionOpen === i ? false : i)}>
                          {texts.length > 0 ?
                            <div>
                              <Accordion.Header className="highlight-header">{highlightTerm}</Accordion.Header>
                              <Accordion.Body className="highlight-body">
                                {texts.map((text, ii) => {
                                  return (
                                    <div className="line-holder">
                                      <div dangerouslySetInnerHTML={{__html : text}} />
                                      <div onClick={() => removeHighlight(highlightTerm, ii)}><i className="bi bi-dash-circle"></i></div>
                                    </div>
                                  )
                                })}
                              </Accordion.Body>
                            </div>
                          : false}
                        </Accordion.Item>
                      )
                    }
                  })}
                </Accordion>
              : "Highlight text and press a button to add metadata."}
            </Col>
          </Row>
        : false}

        <Form.Control value={textRaw} as="textarea" rows={4} placeholder={placeholder} onChange={(e) => setTextRaw(e.target.value)} />
        <Badge bg="light" text="dark" className="label-badge">{description}</Badge>

      </div>
    )
}

export default TextHighlighter;
