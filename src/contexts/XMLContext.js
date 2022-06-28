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
    sourceData : {}
  }
}

export const SET_GENERAL = 'SET_GENERAL'
export const SET_DESCRIPTION = 'SET_DESCRIPTION'

export function setGeneral(value) {
  return { type : 'SET_GENERAL', value }
}
export function setDescription(description) {
  return { type : 'SET_DESCRIPTION', description }
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
      return {
        ...state,
        description : action.description
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
