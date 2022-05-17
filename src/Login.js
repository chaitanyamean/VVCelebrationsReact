import React from "react";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  let navigate = useNavigate();


const handleSubmit = (e) => {
    console.log('eee', e.target[0].value);
    let email = e.target[0].value;
    let password = e.target[1].value
    e.preventDefault()

    let data = {
        email,
        password
    }
    
    axios.post("https://lco-backend1.herokuapp.com/login", data, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => {
      console.log(response)
      if(response.data) {
          localStorage.setItem('response', JSON.stringify(response.data))
      }
      if(response.status === 200 && response.data) {
        navigate('/dashboard');
      }
    })
}

  return (
    <div>
        <Container>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
       
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      </Container>

    </div>
  );
};

export default Login;
