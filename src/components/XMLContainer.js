import { useEffect, useState, useRef } from 'react';
import { Modal, Button } from 'react-bootstrap'
import { Controlled as CodeMirror } from 'react-codemirror2'
import $ from 'jquery';
import hBeautify from 'js-beautify';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/xml/xml.js';

import { useXMLContext } from '../contexts/XMLContext';
import { dataAndTags } from '../utils/xml-utils';

function XMLContainer() {

  const [ modalOpen, setModalOpen ] = useState(false);
  const [ xmlString, setXMLString ] = useState('');
  const { xml : { general, description, originalXML }, dispatch } = useXMLContext()

  // <title>Price <rs type="textType">edict</rs> of the emperor Diocletian.</title>

  useEffect(() => {

    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(originalXML.trim(), "text/xml");
    var xmlVars = { general, description }

    dataAndTags.forEach(data => {
      const dataVars = data.data.split('.')
      const actualData = xmlVars[dataVars[0]][dataVars[1]]
      if((typeof actualData === 'string' && actualData !== "") || (typeof actualData === 'object' && actualData.length > 0)) {
        // Replace elements or create new if they don't exist
        const existingElements = xmlDoc.getElementsByTagName(data.tag);
        let thisElement = null;
        if(existingElements.length > 0) { // This won't work with arrays, just will replace one
          thisElement = existingElements[0];
        } else {
          thisElement = xmlDoc.createElement(data.tag);
        }
        if(data.atts) {
          data.atts.forEach(attr => {
            const split = attr.split('|');
            thisElement.setAttribute(split[0], split[1]);
          })
        }
        let innerContent = actualData;
        if(data.formatting) {
          innerContent = data.formatting(actualData);
        }
        thisElement.innerHTML = innerContent;
        if(existingElements.length === 0) {
          xmlDoc.getElementsByTagName(data.parent)[0].appendChild(thisElement);
        }
      }
    })

    // Removing empty nodes
    removeEmptyTagsRecursively($(xmlDoc))

    function removeEmptyTagsRecursively($el) {
      if ($el.children().length) {
          $el.children().each(function(i, val) {
              removeEmptyTagsRecursively($(val));
          });
      } else {
        let nodeContent = $el.html();
        if(nodeContent && nodeContent.trim() === '') {
          let parentNode = $el.parent();
          $el.remove();
          removeEmptyTagsRecursively(parentNode)
        }
      }
    }

    let xmlString = new XMLSerializer().serializeToString(xmlDoc)
    xmlString = xmlString.replace(/xmlns=""/g, "");
    xmlString = xmlString.replace(/xmlns=""/g, "");
    setXMLString(xmlString)
  }, [general, description])

  return (
    <div className="d-flex align-items-end download-container">
      <div className="flex-fill" style={{marginLeft: '10px'}}>
        <div className="d-grid flex-fill gap-2" style={{marginBottom: '10px'}}>
          <Button variant="secondary" onClick={() => setModalOpen(true)}>View XML</Button>
        </div>
        <div className="d-grid flex-fill gap-2">
          <Button variant="light" onClick={() => setModalOpen(true)}>Download XML</Button>
        </div>
      </div>
      <Modal fullscreen={true} show={modalOpen} onHide={() => setModalOpen(false)}>
        <Modal.Body>
          <CodeMirror
            value={hBeautify.html(xmlString)}
            className="xml-height"
            options={{
              mode: 'xml'
            }}
            onChange={(editor, data, value) => {
            }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalOpen(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default XMLContainer;
