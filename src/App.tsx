import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.scss';

import Dashboard from './pages/Dashboard/Dashboard';

const App = () => {
  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
