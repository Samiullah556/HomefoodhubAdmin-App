import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col } from "reactstrap";
import { SERVER_URL } from "../utils/formValidation";
import { DualRing } from "react-loading-io";
import { connect } from "react-redux";
import { Table } from "reactstrap";
import sweetAlert from "sweetalert";

const Chef = () => {
  useEffect(() => {
    getAllChefs();
    // console.log("get all chefs");
  }, []);

  const [chef, setChef] = useState([]);
  const getAllChefs = async () => {
    try {
      let res = await axios.get(SERVER_URL + "/auth/getallusers");
      // console.log(res.data);
      let filteredChef = res.data.filter(
        (i) => i.email !== "admin@homefoodhub.com"
      );
      setChef(filteredChef);
    } catch (e) {
      sweetAlert({
        icon: "error",
        title: "Network Error !",
        text: "Fail to fetch data",
      });
    }
  };

  const deleteUser = (id) => {
    try {
      let res = axios.delete(SERVER_URL + "/auth/removeuser?q=" + id);
      let filteredChef = chef.filter((i) => i._id !== id);
      setChef(filteredChef);
      sweetAlert({
        icon: "success",
        title: "Chef Deleted !",
      });
    } catch (e) {
      // console.log(e);
      sweetAlert({
        icon: "error",
        title: "Fail to delete Chef !",
      });
    }
  };

  return (
    <Container style={{ marginLeft: "240px" }}>
      {chef.length === 0 ? (
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
                  <th>Chef Name</th>
                  <th>Chef Email</th>
                  <th>Contact no.</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {chef.map((c, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{c.name}</td>
                      <td>{c.email}</td>
                      <td>{c.phone}</td>
                      <td>
                        <button
                          onClick={() => deleteUser(c._id)}
                          className="float-right btn btn-danger"
                        >
                          <i className="fa fa-trash"></i>
                        </button>
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

export default connect(mapStateToProps, {})(Chef);
