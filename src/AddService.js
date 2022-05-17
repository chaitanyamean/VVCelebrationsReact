import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

function AddService({handleAdd}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    let serviceName = e.target[0].value;
    let cost = e.target[1].value;
    let d = JSON.parse(localStorage.getItem("response"));

    let data = {
      serviceName,
      cost,
      changeBy: d.email,
    };

    if (serviceName && cost) {
      axios
        .post("https://lco-backend1.herokuapp.com/addService", data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${d.token}`,
          },
        })
        .then((response) => {
          console.log(response);
          //   if(response.data) {
          //   localStorage.setItem('response', JSON.stringify(response.data))
          //   }
          if (response.status === 200 && response.data) {
            // navigate('/dashboard');
          }
        });
        handleAdd()
    }
  };
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicService">
          <Form.Label>Service Name</Form.Label>
          <Form.Control placeholder="Enter Service name" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCost">
          <Form.Label>Cost</Form.Label>
          <Form.Control type="number" placeholder="Enter Cost" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Service
        </Button>
      </Form>
    </div>
  );
}

export default AddService;
