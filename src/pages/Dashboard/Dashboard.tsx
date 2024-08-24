import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import DataTableComponent from '../../components/DataTable/DataTable';
import { Row, Col, Button } from 'react-bootstrap';
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

  const navigate = useNavigate();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePerPageChange = (perPage: number) => {
    setPerPage(perPage);
  };

  const handleAddUser = () => {
    navigate('/add-user');
  };

  return (
    <>      
      <div className='main-wrapper'>
       
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
            <div className='title-section'>
            <h2>Color Bar Chart</h2>
                <Button>Add Color</Button>
              </div>
            <Card>
            <ColorBarChart/> 
            </Card>
          </Col>
          <Col lg={6} className="custom-col">          
          <div className='title-section'>
              <h2>Color Line Chart</h2>
              <Button>Add Color</Button>
            </div>
            <Card>
            <div id="chart">
            <ColorLineChart /> 
            </div>
            </Card>
          </Col>        
        </Row>
          <Row className='custom-row table-section'>
          <Col lg={12} className="custom-col">
            <div className='title-section'>
              <h2>Users List</h2>
              <Button onClick={handleAddUser}>
                Add User
              </Button>
            </div>            
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
