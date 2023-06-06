import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddUser from './pages/AddUser';
import NotFound from './pages/notFound';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AddUser />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
