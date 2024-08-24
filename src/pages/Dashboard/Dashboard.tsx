import React, { useState } from 'react';
import Aside from '../../components/Aside/Aside';
import Header from '../../components/Header/Header';
import DataTableComponent from '../../components/DataTable/DataTable';
import InfoCard from '../../components/InfoCard/InfoCard';
import './Dashboard.scss';

const Dashboard: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(6);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePerPageChange = (perPage: number) => {
    setPerPage(perPage);
  };

  return (
    <>      
      <Aside />
      <div className='main-wrapper'>
        <Header />
        <main>
          <div className='info-section'>
            <InfoCard
              page={currentPage}
              perPage={perPage}
              totalUsers={totalUsers}
              totalPages={totalPages}
            />
          </div>
          <div className='section-spacing table-section'>
            <h2>Users List</h2>
            <DataTableComponent
              perPage={perPage} 
              currentPage={currentPage}
              onPageChange={handlePageChange}
              onPerPageChange={handlePerPageChange}
              setTotalUsers={setTotalUsers}
              setTotalPages={setTotalPages}
              totalUsers={totalUsers}
            />
          </div>          
        </main>
      </div>
    </>
  );
}

export default Dashboard;
