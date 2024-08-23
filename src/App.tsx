import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.scss';

import Dashboard from './pages/Dashboard/Dashboard';

const App = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
    </Router>
  );
}

export default App;
