import { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import { getElements, getDefinition } from '../../utils/epidoc-utils'

function Description() {

    const [ epidocXML, setEpidocXML ] = useState(false);
    const [ epidocElements, setEpidocElements ] = useState([]);

    useEffect(() => {
      fetch('./schemas/tei-epidoc.xml').then(resp => resp.text()).then(response => {
        let parser = new DOMParser();
        let xmlDoc = parser.parseFromString(response, "text/xml");
        setEpidocXML(xmlDoc);
      });
    }, []);

    useEffect(() => {
      if(epidocXML) {
        let xmlElements = {};
        let rootElementRefNames = ['tei_sourceDesc'];
        console.log(getDefinition(epidocXML, 'tei_sourceDesc'))
      }
    }, [epidocXML]);

    /*

      Things under sourceDesc
       - tei_model.biblLike
       - tei_model.listLike

      Should have an "add default" button that'll just do the basic one

      Default is
       - tei_msDesc
        - tei_msIdentifier
         - tei_repository
         - tei_idno
        - tei_physDesc
        - tei_history


     Maybe just have the top options. And then in the XML side, if they really want, we can have
     basically an Oxygen-level XML editor showing the possible properites and so on, if they want to get crazy about it


    */


    return (
      <div>
        <h4>Edit Source Description</h4>
      </div>
    );

}

export default Description;
