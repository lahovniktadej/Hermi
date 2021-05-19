import logo from './logo.svg';
import './App.css';

import { BrowserRouter } from "react-router-dom";

import Main from "../public/components/Main";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Main />
      </BrowserRouter>
    </div>
  );
}

export default App;
