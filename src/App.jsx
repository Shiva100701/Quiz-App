// src/App.jsx
import React from "react";
import Quiz from "./assets/components/Quiz";
import Personal from "./assets/components/Personal";

const App = () => {
  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center">
      {/* <Quiz /> */}
      <Personal />
    </div>
  );
};

export default App;
