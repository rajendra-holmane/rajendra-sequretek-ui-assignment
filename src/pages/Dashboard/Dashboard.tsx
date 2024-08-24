import React, { useState } from 'react';
import Aside from '../../components/Aside/Aside';
import Header from '../../components/Header/Header';
import DataTableComponent from '../../components/DataTable/DataTable';
import { Row, Col } from 'react-bootstrap';
import Card from '../../components/Card/Card';
import InfoCard from '../../components/InfoCard/InfoCard';
import ColorBarChart from '../../components/ColorBarChart/ColorBarChart';
import ColorLineChart from '../../components/ColorLineChart/ColorLineChart';
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
          <Row className='custom-row'>
          <Col lg={6} className="custom-col">
            <Card>
            <ColorBarChart/> 
            </Card>
          </Col>
          <Col lg={6} className="custom-col">
            <Card>
            <div id="chart">
            <ColorLineChart /> 
            </div>
            </Card>
          </Col>        
        </Row>
          <Row className='custom-row table-section'>
          <Col lg={12} className="custom-col">
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
            </Col>
          </Row>

          
          
              
        </main>
      </div>
    </>
  );
}

export default Dashboard;
