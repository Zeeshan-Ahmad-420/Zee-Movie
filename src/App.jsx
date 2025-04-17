import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Movie from './components/Movie';
import Upcoming from './components/Upcoming';
import Toprated from './components/Toprated';
import Register from './components/Register';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie" element={<Movie />} />
          <Route path="/upcoming" element={<Upcoming />} />
          <Route path="/toprated" element={<Toprated />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;