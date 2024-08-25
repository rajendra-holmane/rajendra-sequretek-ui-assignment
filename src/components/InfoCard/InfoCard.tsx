import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Card from '../Card/Card';
import './InfoCard.scss';


interface InfoCardProps {
  page: number;
  perPage: number;
  totalUsers: number;
  totalPages: number;
}

const InfoCard: React.FC<InfoCardProps> = ({ page, perPage, totalUsers, totalPages }) => {
  return (
    <>
      <Row className='g-0 mt-0 custom-row'>
        <Col lg={3} md={6} xs={6} className="custom-col">
          <Card>
            <div className='info-cards'>
              <h3>Total Users</h3>
              <div className="number">{totalUsers}</div>
            </div>
          </Card>
        </Col>
        <Col lg={3} md={6} xs={6}  className="custom-col">
          <Card>
            <div className='info-cards'>
              <h3>Total Pages</h3>
              <div className="number">{totalPages}</div>
            </div>
          </Card>
        </Col>
        <Col lg={3} md={6} xs={6} className="custom-col">
          <Card>
            <div className='info-cards'>
              <h3>Current Page</h3>
              <div className="number">{page}</div>
            </div>
          </Card>
        </Col>
        <Col lg={3}  md={6} xs={6} className="custom-col">
          <Card>
            <div className='info-cards'>
              <h3>Per Page</h3>
              <div className="number">{perPage}</div>
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default InfoCard;
