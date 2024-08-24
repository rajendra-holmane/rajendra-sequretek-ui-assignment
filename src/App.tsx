import React from 'react';
import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import Aside from './components/Aside/Aside';
import Header from './components/Header/Header';
import Dashboard from './pages/Dashboard/Dashboard';
import AddUser from './pages/AddUser/AddUser';
import UpdateUser from './pages/UpdateUser/UpdateUser';
import './App.scss';

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Aside />
        <Header />
        <div className='main-wrapper'>
          <main>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/add-user" element={<AddUser />} />
              <Route path="/update-user/:userId" element={<UpdateUser />} />
          </Routes>
          </main>
        </div>        
      </BrowserRouter>
    </>    
  );
}

export default App;
