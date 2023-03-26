import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./index.scss";
import { Weather, GradientCircle, Background } from "./components";
import {} from "react-bootstrap";

function App() {
  return (
    <div className="app px-4">
      <Background>
        <Weather />
      </Background>
    </div>
  );
}

export default App;
