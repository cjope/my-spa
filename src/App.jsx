import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import SimpleBottomNavigation from "./BottomNavigation";
import TopAppBar from "./assets/TopAppBar.jsx";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="AppLayout">
      <div className="TopBar">
        <TopAppBar />
      </div>
      <div className="ContentArea">
        <div>
          <a href="http://craigjope.com" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="http://craigjope.com" target="_blank">
            <img src={reactLogo} className="logo" alt="React logo" />
          </a>
        </div>
        <h1>Getting things set up here...</h1>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>Testing Changes</p>
      </div>
      <div className="BottomBar">
        <SimpleBottomNavigation />
      </div>
    </div>
  );
}

export default App;