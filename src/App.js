import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import User from './pages/User';
import NotFound from './pages/notFound';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<User />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
