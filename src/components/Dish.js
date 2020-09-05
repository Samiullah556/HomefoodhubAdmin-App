import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col } from "reactstrap";
import { DualRing } from "react-loading-io";
import { SERVER_URL } from "../utils/formValidation";
import { connect } from "react-redux";
import { Table } from "reactstrap";
import sweetAlert from "sweetalert";

const Dish = () => {
  useEffect(() => {
    getAllChefs();
  }, []);

  const getAllChefs = async () => {
    try {
      let res = await axios.get(SERVER_URL + "/dish/getalldishes");
      // console.log(res.data);
      setDishes(res.data);
    } catch (e) {
      sweetAlert({
        icon: "error",
        title: "Network Error !",
        text: "Fail to fetch data",
      });
    }
  };

  const deleteDish = async (id) => {
    try {
      let res = await axios.delete(SERVER_URL + "/dish/removedish?q=" + id);
      // console.log(res);
      let filteredDish = dishes.filter((i) => i._id !== id);
      setDishes(filteredDish);
      sweetAlert({
        icon: "success",
        title: "Dish Deleted !",
      });
    } catch (e) {
      console.log(e);
      sweetAlert({
        icon: "error",
        title: "Fail to delete Dish !",
      });
    }
  };
  const [dishes, setDishes] = useState([]);

  return (
    <Container style={{ marginLeft: "250px" }}>
      {dishes.length === 0 ? (
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
                  <th>Dish Image</th>
                  <th>Dish Details</th>
                  <th>Price</th>
                  <th>Chef Details</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {dishes.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td className="p-0">
                        <img
                          width="150px"
                          src={"data:image/jpeg;base64," + item.image}
                          alt="Card image cap"
                        />
                      </td>
                      <td>
                        {item.name}
                        <br />
                        {item.description}
                        <br />
                        {item.category}
                      </td>
                      <td>
                        <i>{item.price}</i>
                      </td>
                      <td>{item.chef_name}</td>
                      <td>
                        <button
                          onClick={() => deleteDish(item._id)}
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

export default connect(mapStateToProps, {})(Dish);
