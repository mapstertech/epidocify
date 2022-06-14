import { useState, useEffect } from 'react';
import { Row, Col, Container, Alert, Form, ButtonGroup, Button } from 'react-bootstrap';
import $ from 'jquery';

function OriginalText() {

    const [rawText, setRawText] = useState(false);
    const [xmlOutput, setXmlOutput] = useState(false);
    const [selectedText, setSelectedText] = useState([]);

    useEffect(() => {
      if(rawText) {

        fetch("./schemas/replacements_general.txt").then(resp => resp.text()).then(response => {
          var ep = new window.Epigraph2Markup(response);
  				// ep.lineBreaks($('ignoreLB').value);
  				let result = ep.convert(rawText);
          setXmlOutput(result);
        })

      }
    }, [rawText])

    const mouseUpLine = (e) => {
      if(e.button !== 2) {
        if (window.getSelection) {
          if(window.getSelection().toString() !== "") {
            let highlightedNodes = [];
            $('.raw-text-lines span').each(function() {
              let span = $(this)[0];
              let isHighlighted = window.getSelection().containsNode(span, true);
              if(isHighlighted) {
                highlightedNodes.push({
                  lineNumber : $(this).attr('linenumber'),
                  charNumber : $(this).attr('charnumber')
                });
              }
            });

            if(highlightedNodes.length > 0) {
              setSelectedText(highlightedNodes);
              var left  = e.clientX  + "px";
              var top  = e.clientY  + "px";
              var div = document.getElementById('mouseover_box');
              div.style.display = 'block';
              div.style.left = left;
              div.style.top = top;
            }
          }
        }
      } else {
        var div = document.getElementById('mouseover_box');
        div.style.display = 'none';
      }
    }

    const mouseDownLine = () => {
      var div = document.getElementById('mouseover_box');
      div.style.display = 'none';
    }

    const setTextType = (type) => {
      console.log(selectedText);
      selectedText.forEach(textNodes => {
        const thisSpan = $('.raw-text-lines').find(`div[linenumber="${textNodes.lineNumber}"] span[charnumber="${textNodes.charNumber}"]`)
        thisSpan.addClass('erased')
      })
    }

    return (
      <div>
        <h4>Edit Original Text</h4>
        <p>In this section, paste or write the original text you are working with (in whatever annotation you prefer). You'll then be able to highlight sections and indicate their quality, missing parts, and so on.</p>
        {rawText ?
          <Alert variant="dark">
            {rawText.split(/\r\n|\r|\n/).map((line, i) => {
              return (
                <Row>
                  <Col sm={1} className="line-numbers">
                    <div>{(i+1)}</div>
                  </Col>
                  <Col sm={11} className="raw-text-lines">
                    <div onMouseDown={() => mouseDownLine()} onMouseUp={(e) => mouseUpLine(e)} linenumber={i+1}>
                      {line.split('').map((char, charIndex) => {
                        return (
                          <span linenumber={i+1} charnumber={charIndex+1}>{char}</span>
                        )
                      })}
                    </div>
                  </Col>
                </Row>
              )
            })}
            <div id="mouseover_box">
              <ButtonGroup vertical>
                <Button onClick={() => setTextType('erased')} variant="secondary" size="sm">Erased</Button>
                <Button onClick={() => setTextType('incomplete')} variant="secondary" size="sm">Incomplete</Button>
              </ButtonGroup>
            </div>
          </Alert>
        : false }

        {xmlOutput}

        <Form.Group className="mb-3">
          <Form.Label>Original Text</Form.Label>
          <Form.Control as="textarea" rows={10} placeholder="Paste or type your original text here." onKeyUp={(e) => setRawText(e.target.value)} />
        </Form.Group>
      </div>
    );

}

export default OriginalText;
