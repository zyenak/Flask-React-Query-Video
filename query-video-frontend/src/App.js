import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UploadPage from './pages/UploadPage';
import VideoPlayPage from "./pages/VideoPlayPage"

function App() {
  return (
    <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={< UploadPage/>} />
            <Route path="/query-video" element={< VideoPlayPage/>} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
