import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import ComplaintForm from "./pages/ComplaintForm";
import ComplaintList from "./pages/ComplaintList";
import ComplaintDetails from "./pages/ComplaintDetails";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/submit"
            element={<ComplaintForm />}
          />

          <Route
            path="/complaints"
            element={<ComplaintList />}
          />

          <Route
            path="/complaints/:id"
            element={<ComplaintDetails />}
          />

          <Route
            path="*"
            element={<NotFound />}
          />
        </Routes>
      </main>

      <footer className="footer">
        <p>
          © 2026 CampusCare - Student Complaint Management System
        </p>
      </footer>
    </>
  );
}

export default App;