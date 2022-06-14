import './App.css';
import { useState } from 'react';
import { Button } from "./components/button/Button.js"
import Input from "./components/input/Input.js";

function App() {
  const [ showDiv, setShowDiv ] = useState(true);

  return (
    <div className="App">
        <Input showDiv={showDiv}  />
        <Button/>
      
    </div>
  );
}

export default App;
