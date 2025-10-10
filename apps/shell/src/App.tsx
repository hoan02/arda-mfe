import React from "react";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Shell App</h1>
        <p>Welcome to the micro-frontend shell application!</p>
        <div className="features">
          <div className="feature-card">
            <h3>🚀 Rspack</h3>
            <p>Fast build tool powered by Rust</p>
          </div>
          <div className="feature-card">
            <h3>⚛️ React 19</h3>
            <p>Latest React with modern features</p>
          </div>
          <div className="feature-card">
            <h3>🔄 Fast Refresh</h3>
            <p>Instant hot reload for development</p>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
