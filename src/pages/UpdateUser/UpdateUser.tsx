import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import Card from '../../components/Card/Card';
import FileUpload from '../../components/FileUpload/FileUpload';

import { updateUser, fetchUserById } from '../../services/api';

const UpdateUser: React.FC = () => {
  const [avatar, setAvatar] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const response = await fetchUserById(Number(userId));
        if (response.status === 200) {
          const { data } = response.data;

          setFirstName(data.first_name);
          setLastName(data.last_name);
          setEmail(data.email);
          setAvatar(data.avatar);

        } else {
          throw new Error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setErrorMessage('Error fetching user data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const response = await updateUser({
        id: Number(userId),
        first_name: firstName,
        last_name: lastName,
        email,
        avatar
      });

      if (response.status === 200) {
        const result = response.data;
        console.log('User updated:', result);

        setSuccessMessage('User successfully updated!');
        setTimeout(() => {
          navigate('/dashboard');
        }, 5000); 
      } else {
        throw new Error('Failed to update user');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      setErrorMessage('Error updating user. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setAvatar('');
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
          <img className='back-button' src='/Assets/images/back-arrow-icon.svg' alt="Back" onClick={handleBack} />
          <h2>Update User</h2>
        </div>
        <Row className="g-0 form-container">
          <Col xl={6} lg={9} md={12}>
            <Form onSubmit={handleSubmit} className="form">
              {successMessage && <Alert variant="success">{successMessage}</Alert>}
              {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
              <Row>
                <Col md={4} sm={12}>
                  <Form.Group className="form-group profile-pic" controlId="avatar">
                    <Form.Label>Your Profile Picture</Form.Label>
                    <FileUpload
                      avatar={avatar}
                      onAvatarChange={(newAvatar) => setAvatar(newAvatar)}
                    />
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
                      {loading ? 'Updating...' : 'Update User'}
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

export default UpdateUser;
