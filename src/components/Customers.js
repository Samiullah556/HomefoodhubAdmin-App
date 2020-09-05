import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col } from "reactstrap";
import { DualRing } from "react-loading-io";
import { SERVER_URL } from "../utils/formValidation";
import { connect } from "react-redux";
import { Table } from "reactstrap";
import sweetAlert from "sweetalert";

const Customers = () => {
  useEffect(() => {
    getAllCustomers();
  }, []);

  const getAllCustomers = async () => {
    try {
      let res = await axios.get(SERVER_URL + "/auth/getallcustomers");
      //   console.log(res.data);
      setCustomers(res.data);
    } catch (e) {
      sweetAlert({
        icon: "error",
        title: "Network Error !",
        text: "Fail to fetch data",
      });
    }
  };

  const [customers, setCustomers] = useState([]);

  return (
    <Container style={{ marginLeft: "250px" }}>
      {customers.length === 0 ? (
        <div style={{ marginTop: "30vh", marginLeft: "28vw" }}>
          <DualRing size={80} color="#00008b" />
        </div>
      ) : (
        <Row className="mt-5 pt-4">
          <Col xs={12} sm={10} className="px-0">
            <Table hover bordered>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>No. of Orders</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.phone}</td>
                      <td>
                        <i>{item.orderHistory.length}</i>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
      )}
    </Container>
  );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(Customers);
