import { useState, useEffect } from 'react';
import { Modal, Row, Col, Container, Alert, Form, ButtonGroup, Button, Tabs, Tab } from 'react-bootstrap';
import $ from 'jquery';

function OriginalText() {

    const [rawText, setRawText] = useState(false);
    const [xmlOutput, setXmlOutput] = useState(false);
    const [selectedText, setSelectedText] = useState([]);
    const [relevantAtts, setRelevantAtts] = useState([])
    const [checkedAtts, setCheckedAtts] = useState([])

    // So after they paste in the text (or type it)
    // Then add a prompt to go to the next section
    // Show below a breakdown that has mouseovers

    const getAttrDetails = (attrRef, schemaDoc) => {
      let rootElement = $(schemaDoc).find(`define[name="${attrRef}"]`)
      const attrDetails = {
        elementName : rootElement.find('element').attr('name'),
        documentation : rootElement.find('a\\:documentation').text(),
        atts : []
      }
      rootElement.find('ref').each(function() {
        if ("tei_macro.phraseSeq" !== $(this).attr('name')) { // For some reason this is an infinite loop!
          attrDetails.atts.push( getRefDetails($(this).attr('name'), schemaDoc) )
        }
      })
      return attrDetails
    }

    const getRefDetails = (refRef, schemaDoc) => {
      let rootElement = $(schemaDoc).find(`define[name="${refRef}"]`)
      const refDetails = {
        rootName : refRef,
        attrName : rootElement.find('attribute').attr('name'),
        documentation : rootElement.find('a\\:documentation').text(),
        optional : rootElement.find('optional').length,
        list : rootElement.find('list').length,
        zeroOrMore : rootElement.find('zeroOrMore').length,
        oneOrMore : rootElement.find('oneOrMore').length,
        text : rootElement.find('text').length,
        choice : rootElement.find('choice').length,
        dataTypes : [],
        choiceValues : [],
        atts : []
      }
      rootElement.find('data').each(function() {
        refDetails.dataTypes.push($(this).attr('type'))
      })
      rootElement.find('value').each(function() {
        refDetails.choiceValues.push({
          val : $(this).text(),
          documentation : $(this).next().text()
        })
      })
      rootElement.find('ref').each(function() {
        // console.log($(this).attr('name'))
        refDetails.atts.push(getRefDetails($(this).attr('name'), schemaDoc))
      })
      return refDetails
    }

    useEffect(() => {
      fetch("./schemas/tei-epidoc.xml").then(resp => resp.text()).then(response => new window.DOMParser().parseFromString(response, "text/xml")).then(data => {
        const persNameDetails = getAttrDetails("tei_persName", data)
        console.log(persNameDetails)
        setRelevantAtts([persNameDetails])
      })
    }, [])

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
                  charNumber : $(this).attr('charnumber'),
                  character : $(this).text()
                });
              }
            });

            if(highlightedNodes.length > 0) {
              setSelectedText(highlightedNodes);
              // var left  = e.clientX  + "px";
              // var top  = e.clientY  + "px";
              // var div = document.getElementById('mouseover_box');
              // div.style.display = 'block';
              // div.style.left = left;
              // div.style.top = top;
            }
          }
        }
      } else {
        // var div = document.getElementById('mouseover_box');
        // div.style.display = 'none';
      }
      console.log('mouseup')
    }

    const mouseDownLine = () => {
      // var div = document.getElementById('mouseover_box');
      // div.style.display = 'none';
      console.log('mousedown')
    }

    // const setTextType = (type) => {
    //   console.log(selectedText);
    //   selectedText.forEach(textNodes => {
    //     const thisSpan = $('.raw-text-lines').find(`div[linenumber="${textNodes.lineNumber}"] span[charnumber="${textNodes.charNumber}"]`)
    //     thisSpan.addClass('erased')
    //   })
    // }

    const attrCheckboxChange = (e) => {
      let currentCheckedAttr = JSON.parse(JSON.stringify(checkedAtts))
      if(e.target.checked) {
        currentCheckedAttr.push(e.target.id)
      } else {
        currentCheckedAttr.splice(currentCheckedAttr.indexOf(e.target.id), 1)
      }
      setCheckedAtts(currentCheckedAttr)
      console.log(currentCheckedAttr)
    }

    const renderSubAttrButtons = (attr, topLevel) => {
      let renderedButtons = []
      if(attr.atts.length > 0) {
        attr.atts.forEach(thisAttr => {
          renderedButtons = renderedButtons.concat( renderSubAttrButtons(thisAttr) )
        })
      }
      if(topLevel) {
        console.log(renderedButtons)
        return (
          <div>
            {renderedButtons}
          </div>
        )
      } else {
        const buttonText = attr.rootName.split('.')[attr.rootName.split('.').length - 1]
        renderedButtons.push(<Button key={`sub-att-${buttonText}`} variant="outline-secondary">{buttonText}</Button>)
        return renderedButtons
      }
    }

    return (
      <div>
        <h4>Edit Original Text</h4>

        <Tabs defaultActiveKey="structural" id="uncontrolled-tab-example" className="mb-3">
          <Tab eventKey="structural" title="Structural">
            <p>In this section, paste or write the original text you are working with, in the (diplomatic?) format. You'll then be able to highlight sections and indicate their quality, names, and so on.</p>
            <Form.Group className="mb-3">
              <Form.Label>Original Text</Form.Label>
              <Form.Control as="textarea" rows={10} placeholder="Paste or type your text here." onKeyUp={(e) => setRawText(e.target.value)} />
            </Form.Group>

            {/*
            <div>
              <div dangerouslySetInnerHTML={{ __html : xmlOutput }} />
            </div>
            */}

          </Tab>
          <Tab eventKey="interpretive" title="Interpretive">
          </Tab>
        </Tabs>

        {rawText ?
          <Alert className="sans-serif-font" variant="dark">
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
          </Alert>
        : false }

        <Modal className="attr-modal" size="lg" show={selectedText.length > 1} onHide={() => setSelectedText([])}>
          <Modal.Header closeButton>
            <Modal.Title>Text Attributes</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="sans-serif-font">
              <Alert variant="light">{selectedText.map(char => char.character).join("")}</Alert>
            </div>
            <p>Select the tags you want to apply to this section of the text.</p>
            <div>
              <Form>
                {relevantAtts.map((attr, i) => {
                  return (
                    <Form.Check
                      key={`text-attr-${i}`}
                      inline
                      label={attr.elementName}
                      type="checkbox"
                      id={attr.elementName}
                      onChange={attrCheckboxChange}
                    />
                  )
                })}
              </Form>
              <hr />
              {checkedAtts.length !== 0 ?
                <div>
                  {checkedAtts.map((checkedAttr, i) => {
                    const thisAttr = relevantAtts.find(attr => attr.elementName === checkedAttr)
                    return (
                      <div>
                        <h3>{thisAttr.elementName}</h3>
                        <p>{thisAttr.documentation}</p>
                        <p><em>Details</em></p>
                        {renderSubAttrButtons(thisAttr, true)}
                      </div>
                    )
                  })}
                </div>
              : false}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setSelectedText([])}>
              Close
            </Button>
            <Button variant="primary" onClick={() => setSelectedText([])}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

      </div>
    );

}

// <div id="mouseover_box">
//   <ButtonGroup vertical>
//     <Button onClick={() => setTextType('erased')} variant="secondary" size="sm">Erased</Button>
//     <Button onClick={() => setTextType('incomplete')} variant="secondary" size="sm">Incomplete</Button>
//   </ButtonGroup>
// </div>

export default OriginalText;
