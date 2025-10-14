import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Portfolio from './components/Portfolio';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import Navigation from './components/Navigation'; // Add this import

function App() {
  // Scroll handler for Navigation
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navigation scrollToSection={scrollToSection} />
              <Portfolio />
            </>
          }
        />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;