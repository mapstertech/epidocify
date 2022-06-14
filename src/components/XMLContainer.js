import { useEffect, useState, useRef } from 'react';
import { Modal, Button } from 'react-bootstrap'
import { Controlled as CodeMirror } from 'react-codemirror2'
import hBeautify from 'js-beautify';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/xml/xml.js';

function XMLContainer({ activeDocument }) {

  const [ modalOpen, setModalOpen ] = useState(false);

  // <title>Price <rs type="textType">edict</rs> of the emperor Diocletian.</title>

  const testString = `
    <TEI xmlns="http://www.tei-c.org/ns/1.0" xml:id="P42500" xml:lang="en">
      <teiHeader>
        <fileDesc>
          <titleStmt>
            ${activeDocument.title ? `<title>${activeDocument.title}</title>` : ""}
            ${activeDocument.editors ? activeDocument.editors.map((editor, key) => `<editor xml:id="editor-${key}">${editor}</editor>`).join('\n') : ""}
          </titleStmt>
          <publicationStmt>
            ${activeDocument.authority ? `<authority>${activeDocument.authority}</authority>` : ""}
            ${activeDocument.idNumber ? `<idno type="filename">${activeDocument.idNumber}</idno>` : ""}
            ${activeDocument.availabilities && activeDocument.availabilities.length > 0 ?
              `<availability>
                ${activeDocument.availabilities.map((availability) => {
                  if(availability !== "") {
                    let regExp = /\(([^)]+)\)/;
                    let matches = availability.match(regExp);
                    let url = matches ? matches[1] : false;
                    return `<p>${availability.split('(')[0]} ${url ? `(<ref>${url}</ref>)` : ''}</p>`;
                  } else {
                    return "";
                  }
                }).join('\n')}
              </availability>`
            : ""}
          </publicationStmt>
        </fileDesc>
      </teiHeader>
    </TEI>`

  return (
    <div className="d-flex align-items-end right-col">
      <div className="flex-fill" style={{marginLeft: '10px'}}>
        <div className="d-grid flex-fill gap-2" style={{marginBottom: '10px'}}>
          <Button variant="primary" onClick={() => setModalOpen(true)}>View XML</Button>
        </div>
        <div className="d-grid flex-fill gap-2">
          <Button variant="secondary" onClick={() => setModalOpen(true)}>Download XML</Button>
        </div>
      </div>
      <Modal fullscreen={true} show={modalOpen} onHide={() => setModalOpen(false)}>
        <Modal.Body>
          <CodeMirror
            value={hBeautify.html(testString)}
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
