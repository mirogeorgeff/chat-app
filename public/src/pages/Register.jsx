import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import Logo from '../assets/logo.png';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { registerRoute } from '../utils/APIRoutes';

function Register() {
  const navigate = useNavigate();

  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const toastOptions = {
    position: "top-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark"
  };

  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate('/');
    }
  }, []);

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { username, email, password } = state;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      } else {
        localStorage.setItem(process.env.REACT_APP_LOCALHOST_KEY, JSON.stringify(data.user));
        navigate('/');
      }
    }
  }

  const handleValidation = () => {
    const { username, email, password, confirmPassword } = state;

    if (username.length < 3) {
      toast.error("Username should be longer than 3 characters", toastOptions);
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
    } else if (password.length < 8) {
      toast.error("Password should not be less than 8 characters", toastOptions);
      return false;
    } else if (password !== confirmPassword) {
      toast.error("Password and Confirm Password do not match", toastOptions);
      return false;
    }
    return true;
  }

  return (
    <div className="d-flex justify-content-center" style={{ backgroundColor: "#404f75" }}>
      <Row className="vh-100">
        <Col className="m-auto">
          <Card className="shadow text-center ps-5 pe-5 pb-3 pt-3 rounded-lg" style={{ backgroundColor: "#363940" }}>
            <Card.Img className="m-auto" src={Logo} thumbnail style={{ height: "150px", width: "150px" }} />
            <Form className="mt-4 ps-2 pe-2" onSubmit={handleSubmit}>

              <Form.Group className="mb-4">
                <Form.Control
                  className="bg-dark border-secondary text-light"
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={state.username}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Control
                  className="bg-dark border-secondary text-light"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={state.email}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Control
                  className="bg-dark border-secondary text-light"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={state.password}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Control
                  className="bg-dark border-secondary text-light"
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={state.confirmPassword}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <div className="d-grid gap-2">
                  <Button className="border-0" style={{ backgroundColor: "#5a48e3" }} type="submit">CREATE ACCOUNT</Button>
                </div>
              </Form.Group>

              <Form.Group>
                <Form.Label className="text-light">Already have an account? <Link to="/login" style={{ color: "#5a48e3" }}>Login</Link></Form.Label>
              </Form.Group>
            </Form>
          </Card>
        </Col>
      </Row>
      <ToastContainer />
    </div>
  )
}

export default Register;