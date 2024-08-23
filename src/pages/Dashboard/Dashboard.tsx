import React from 'react';
import Aside from '../../components/Aside/Aside';
import Header from '../../components/Header/Header';
import './Dashboard.scss';

const Dashboard = () => {
  return (
    <>      
      <Aside />
      <div className='main-wrapper'>
        <Header />
        <main>
        
        </main>
      </div>
    </>
  );
}

export default Dashboard;
