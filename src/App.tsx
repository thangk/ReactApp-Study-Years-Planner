import Main from './pages/Main';

import { createContext, useReducer } from 'react'
import { reducer_DataArrays  } from './components/Reducer_DataArrays'
import { reducer_Toggles  } from "./components/Reducer_Toggles";
import { iniStates_Toggles, iniStates_DataArrays, iniStates_Sets } from './components/InitialStates'
import { reducer_Sets } from './components/Reducer_Sets';




export const AllContext = createContext<any>({});

const App = () => {


  const [state_DataArrays, dispatch_DataArrays] = useReducer(reducer_DataArrays, iniStates_DataArrays);
  const [state_Toggles, dispatch_Toggles] = useReducer(reducer_Toggles, iniStates_Toggles);
  const [state_Sets, dispatch_Sets] = useReducer(reducer_Sets, iniStates_Sets);

  return (
    
      <AllContext.Provider value={{ 
            state_DataArrays, 
            state_Toggles,
            state_Sets,
            dispatch_DataArrays,
            dispatch_Toggles,
            dispatch_Sets }}>

            <Main />
      </AllContext.Provider>

  );
}

export default App;
