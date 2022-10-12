import { createContext, useReducer, useContext } from "react";

export const XMLContext = createContext();

const initialState = {
  general : {
    title : '',
    editors : [],
    authority : '',
    idNumber : '',
    availabilities : []
  },
  description : {
    sourceData : {},
    layoutData : {},
    handData : {}
  },
  originalXML : ''
}

export const SET_GENERAL = 'SET_GENERAL'
export const SET_DESCRIPTION = 'SET_DESCRIPTION'
export const SET_ORIGINAL_XML = 'SET_ORIGINAL_XML'

export function setGeneral(value) {
  return { type : 'SET_GENERAL', value }
}
export function setDescription(description) {
  return { type : 'SET_DESCRIPTION', description }
}
export function setOriginalXML(originalXML) {
  return { type : 'SET_ORIGINAL_XML', originalXML }
}

export function xmlReducer(state, action) {
  switch (action.type) {
    case SET_GENERAL:
      let newGeneral = JSON.parse(JSON.stringify(state.general));
      for(let prop in action.value) {
        newGeneral[prop] = action.value[prop];
      }
      return {
        ...state,
        general : newGeneral
      };
    case SET_DESCRIPTION:
      let newDescription = JSON.parse(JSON.stringify(state.description));
      for(let prop in action.description) {
        newDescription[prop] = action.description[prop];
      }
      console.log(newDescription)
      return {
        ...state,
        description : newDescription
      };
    case SET_ORIGINAL_XML:
      return {
        ...state,
        originalXML : action.originalXML
      };
    default:
      return state;
  }
}

function XMLProvider(props) {
  const [xml, dispatch] = useReducer(xmlReducer, initialState);

  const xmlData = { xml, dispatch };

  return <XMLContext.Provider value={xmlData} {...props} />;
}

function useXMLContext() {
  return useContext(XMLContext);
}

export { XMLProvider, useXMLContext };
