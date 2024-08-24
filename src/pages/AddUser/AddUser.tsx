import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import Card from '../../components/Card/Card';
import FileUpload from '../../components/FileUpload/FileUpload';
import './AddUser.scss';

const AddUser: React.FC = () => {
  const [avatar, setAvatar] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const response = await fetch('https://reqres.in/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName, email, avatar }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('User added:', result);

        setSuccessMessage('User successfully added!');
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      } else {
        throw new Error('Failed to add user');
      }
    } catch (error) {
      console.error('Error adding user:', error);
      setErrorMessage('Error adding user. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setSuccessMessage(null);
    setErrorMessage(null);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <Card>
        <div className='arrow-title'>
          <img className='back-button' src='/Assets/images/back-arrow-icon.svg'  alt="Back" onClick={handleBack} />
          <h2>Add New User</h2>
        </div>
        <Row className="form-container">
      <Col md={6} sm={12}>
        {successMessage && <Alert variant="success">{successMessage}</Alert>}
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        
        <Form onSubmit={handleSubmit} className="form">
          <Row>
            <Col md={4} sm={12}>
              <Form.Group className="form-group" controlId="avatar">
                <Form.Label>Your Profile Picture</Form.Label>
                <FileUpload />
              </Form.Group>
            </Col>

            <Col md={6} sm={12}>
              <Form.Group className="form-group" controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </Form.Group>
              
              <Form.Group className="form-group" controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </Form.Group>
           
              <Form.Group className="form-group" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="form-group">
                <Button variant="primary" type="submit" disabled={loading}>
                  {loading ? 'Adding...' : 'Add User'}
                </Button>
                <span className='reset-button' onClick={handleReset}>
                  Reset
                </span>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
      </Card>
    </>    
  );
};

export default AddUser;
