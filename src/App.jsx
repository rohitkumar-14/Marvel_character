import MarvelCharacter from "./components/MarvelCharacter"
import { useState } from "react";

function App() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };
  
  return (
    <div className={`${theme}`}>
      <MarvelCharacter theme={theme} toggleTheme={toggleTheme} />
    </div>
  );
}

export default App;
