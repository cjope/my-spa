import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import SimpleBottomNavigation from "./BottomNavigation";
import TopAppBar from "./TopAppBar.jsx";
import "./App.css";
import Projects from "./Projects";
import Sonarr from "./Sonarr.jsx";
import Calendar from "./Calendar.jsx";

function Home({ count, setCount }) {
  return (
    <>
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
    </>
  );
}

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <div className="AppLayout">
        <div className="TopBar">
          <TopAppBar />
        </div>
        <div className="ContentArea">
          <Routes>
            <Route
              path="/"
              element={<Home count={count} setCount={setCount} />}
            />
            <Route path="/sonarr" element={<Sonarr />} />
            {/* Add more routes as needed */}
          </Routes>
        </div>
        <div className="BottomBar">
          <SimpleBottomNavigation />
        </div>
      </div>
    </Router>
  );
}

export default App;
