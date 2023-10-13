import "./styles.css";
import AdminPage from "./AdminUI";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
export default function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<AdminPage />} />
        </Routes>
      </Router>
    </div>
  );
}
