import React from 'react';
import Aside from '../../components/Aside/Aside';
import Header from '../../components/Header/Header';
import './Dashboard.scss';
import DataTableComponent from '../../components/DataTable/DataTable';

const Dashboard = () => {
  return (
    <>      
      <Aside />
      <div className='main-wrapper'>
        <Header />
        <main>
          <DataTableComponent />
        </main>
      </div>
    </>
  );
}

export default Dashboard;
