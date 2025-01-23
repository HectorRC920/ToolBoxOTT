import React from "react";
import TableComponent from "./components/TableComponent";
import "./App.css"; 

const App = () => {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>ToolBoxOTT Dashboard</h1>
      </header>
      <main className="app-content">
        <TableComponent />
      </main>
      <footer className="app-footer">
        <p> Made with ❤️ by Hector Rubio.</p>
      </footer>
    </div>
  );
};

export default App;
