import './App.css';
import "../public/assets/Styles.css";

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
