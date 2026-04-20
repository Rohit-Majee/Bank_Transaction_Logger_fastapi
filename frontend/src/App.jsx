import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Search from "./pages/Search";
import Edit from "./pages/Edit";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <h1 className="title">💳 Bank Transaction Logger</h1>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/search" element={<Search />} />
          <Route path="/edit/:id" element={<Edit />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
