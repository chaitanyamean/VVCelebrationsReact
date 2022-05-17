import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Container, Button } from "react-bootstrap";
// import Container from "react-bootstrap/Container";
import AddService from './AddService';

function Dashboard() {
  let d = JSON.parse(localStorage.getItem("response"));
  const [data, setData] = useState(d);
  const [res, setRes] = useState([]);
  const [isAddShown, setisAddShown] = useState(false)
  useEffect(() => {
    getServiceList();
  }, [isAddShown]);

  const handleAdd = () => {
        setisAddShown(!isAddShown)
  }

  const handleDelete = (e) => {
    console.log(e)
        // e.preventDefault()
        let obj = {
            serviceId: e.serviceId,
        }
        axios.post("https://lco-backend1.herokuapp.com/deleteService", obj, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${data.token}`,
        }
    })
    .then(response => {
      console.log(response)
    //   if(response.data) {
        //   localStorage.setItem('response', JSON.stringify(response.data))
    //   }
      if(response.status === 200 && response.data) {
        // navigate('/dashboard');
        getServiceList();
      }
    })
  }

  const getServiceList = () => {
    axios
      .get("https://lco-backend1.herokuapp.com/getServiceList", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data.token}`,
        },
      })
      .then((response) => {
        console.log(response);

        if (response.status === 200) {
          if (response.data && response.data.length > 0) {
        }
        setRes(response.data);
        }
      });
  };

  return (
    <div>
      <p>Hi {data.firstName}</p>
      
      {isAddShown ? <Container>
        <AddService handleAdd={handleAdd}/>
      </Container>
      : 
      <Container>
          <Button variant="success"
            style={{float: 'right', marginBottom: '10px'}}
            onClick={handleAdd}>Add</Button>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Service Name</th>
              <th>Price</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {/* <tr>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr> */}

            {res && res.length > 0 && res.map((item, index) => {
                return(
                    <tr key={index}>
                        <td>{item.serviceName}</td>
                        <td>{item.cost}</td>
                        <td>
                            {/* <Button onClick={handleEdit}>Edit</Button> */}
                            <Button 
                            variant="info"
                            onClick={() => handleDelete(item)}>Delete</Button>
                        </td>
                    </tr>
                    )
                })}
            
          </tbody>
        </Table>
      </Container>
    }
    </div>
  );
}

export default Dashboard;
