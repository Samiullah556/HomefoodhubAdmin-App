import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { Container, Row, Col } from "reactstrap";
import { SERVER_URL } from "../utils/formValidation";
import { connect } from "react-redux";
import sweetAlert from "sweetalert";
import { DualRing } from "react-loading-io";
import { Table } from "reactstrap";

const Orders = () => {
  useEffect(() => {
    getAllOrders();
  }, []);

  const getAllOrders = async () => {
    try {
      let res = await axios.get(SERVER_URL + "/order/getallorders");
      // console.log(res.data);
      setOrders(res.data);
    } catch (e) {
      // console.log(e);
      sweetAlert({
        icon: "error",
        title: "Network Error !",
        text: "Fail to fetch data",
      });
    }
  };

  const [orders, setOrders] = useState([]);

  return (
    <Container style={{ marginLeft: "240px" }}>
      {orders.length === 0 ? (
        <div style={{ marginTop: "30vh", marginLeft: "28vw" }}>
          <DualRing size={80} color="#00008b" />
        </div>
      ) : (
        <Row className="mt-5 pt-4">
          <Col xs={12} sm={10}>
            <Table hover bordered>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Customer Name</th>
                  <th>Cart</th>
                  <th>Delivery Address</th>
                  <th>Contact no.</th>
                  <th>Total Bill</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{o.name}</td>
                      <td>
                        {o.cart.map((c, index) => (
                          <Fragment key={index}>
                            <ul>
                              <li>
                                {c.name}
                                <br />
                                {c.description}
                              </li>
                            </ul>
                            <br />
                          </Fragment>
                        ))}
                      </td>
                      <td>{o.cart[0].customeraddress}</td>
                      <td>{o.phone}</td>
                      <td>
                        <i>{o.bill}</i>
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

export default connect(mapStateToProps, {})(Orders);
