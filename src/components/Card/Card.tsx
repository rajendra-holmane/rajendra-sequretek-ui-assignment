import React from 'react';
import { Link } from 'react-router-dom';
import './Card.scss';

interface CardProps {
  children: React.ReactNode;
}

const Card: React.FC<CardProps > = ({children}) => {
  return (
    <>
      <div className='custom-card'>
        {children}
      </div>
    </>
  );
}

export default Card;
