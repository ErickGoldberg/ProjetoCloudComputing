import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import User from './pages/User';
import NotFound from './pages/notFound';
import Home from './pages/Home';
import Events from './pages/Events'
import Cashiers from './pages/Cashiers'
import Chamados from './pages/Chamados'


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<User />} />
        <Route path="/events" element={<Events />} />
        <Route path="/cashiers" element={<Cashiers />} />
        <Route path="/chamados" element={<Chamados />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
