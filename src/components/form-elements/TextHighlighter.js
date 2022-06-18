import { useEffect, useState } from 'react'
import $ from 'jquery';
import { Row, Col, Container, FloatingLabel, Form, Button, Badge, ButtonGroup, Alert } from 'react-bootstrap';

function TextHighlighter({ placeholder, description, highlighters, setData }) {

    const [ textRaw, setTextRaw ] = useState('');

    const addHighlight = (highlightTerm) => {
      var selection = window.getSelection().getRangeAt(0);
      var selectedText = selection.extractContents();

      var wrappedEle = document.createElement(highlightTerm);
      wrappedEle.appendChild(selectedText);
      selection.insertNode(wrappedEle);

      setData($('.highlighted-text').html().replace(/<br>/g, '\n'))
    }

    // useEffect(() => {
    //   setData($('.highlighted-text').html().replace(/<br>/g, '\n'))
    // }, [textRaw, highlighted])

    return (
      <div>

        {textRaw !== "" ?
          <Row>
            <Col sm="8">
                <Row>
                  <Col>
                    <ButtonGroup className="text-toolbar-group mb-2" aria-label="Basic example">
                      {highlighters.map(highlightTerm => {
                        return (<Button onClick={() => addHighlight(highlightTerm)} size="sm" variant="secondary">{highlightTerm}</Button>)
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
                <Alert variant="light">
                  {highlighters.map(highlightTerm => {
                    let texts = []
                    $('.highlighted-text').find(highlightTerm).each(function() {
                      texts.push($(this).text());
                    })
                    return (
                      <div>
                        {texts.length > 0 ?
                          <div>
                            <div><strong>{highlightTerm}</strong></div>
                            {texts.map(text => {
                              return (<span>{text}</span>)
                            })}
                          </div>
                        : false}
                      </div>
                    )
                  })}
                </Alert>
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
