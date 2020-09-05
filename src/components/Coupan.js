import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col } from "reactstrap";
import { Button, TextField, Avatar, Typography } from "@material-ui/core";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";
import { SERVER_URL } from "../utils/formValidation";
import { connect } from "react-redux";
import sweetAlert from "sweetalert";
import InputAdornment from "@material-ui/core/InputAdornment";

const Coupan = () => {
  const [state, setState] = useState({
    expiry_date: "",
    coupon_no: "HF-" + Math.floor(Math.random() * 999),
    discount: "",

    discountError: {
      error: false,
      helperText: "",
    },
    dateError: {
      error: false,
      helperText: "",
    },
  });

  const [show, setShow] = useState(true);

  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    getAllCoupons();
  }, []);

  const getAllCoupons = async () => {
    try {
      let res = await axios.get(SERVER_URL + "/coupon/getall");
      console.log(res.data);
      setCoupons(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    let { coupon_no, discount, expiry_date } = state;
    let currentDate = new Date();

    let discountError, dateError;
    if (Number(discount) <= 0 || Number(discount) > 99) {
      discountError = {
        error: true,
        helperText: "Please enter b/w 1 - 99 %",
      };
    } else {
      discountError = {
        error: false,
        helperText: "",
      };
    }
    if (expiry_date === "") {
      dateError = {
        error: true,
        helperText: "Please select expiry date",
      };
    } else {
      dateError = {
        error: false,
        helperText: "",
      };
    }
    setState({
      ...state,
      discountError,
      dateError,
    });
    let data = {
      expiry_date,
      coupon_no,
      discount,
    };
    console.log(data, currentDate.toLocaleDateString());
    if (discountError.error === false && dateError.error === false) {
      try {
        let res = await axios.post(SERVER_URL + "/coupon/addnew", data);
        console.log(res.data);
        setState({
          ...state,
          coupon_no: "HF-" + Math.floor(Math.random() * 999),
          discount: 0,
          expiry_date: "",
        });
        sweetAlert({
          title: "New Discount Coupon Created",
          icon: "success",
          closeOnClickOutside: false,
        });
      } catch (e) {
        sweetAlert({
          title: "Can't Create Discount Coupon",
          icon: "error",
          closeOnClickOutside: false,
        });
        // console.log(e);
      }
    }
  };
  return (
    <Container style={{ marginLeft: "240px" }}>
      <Row className="mt-5 pt-4">
        <Col className="mt-5 pt-4" xs={12} sm={{ size: 6, offset: 3 }}>
          {show ? (
            <>
              <Typography
                className="text-center my-3"
                component="h1"
                variant="h5"
              >
                List of Coupons
              </Typography>
              {coupons.length === 0 ? (
                <h6 className="text-secondary my-5 text-center">
                  No Coupons Availble
                </h6>
              ) : null}
              {coupons.map((item, index) => {
                return (
                  <Card className="my-2" key={index}>
                    <CardBody>
                      <h6>
                        Coupon No. : <strong>{item.coupon_no}</strong>
                      </h6>
                      <h6>
                        Expiry Date : <strong>{item.expiry_date}</strong>
                      </h6>
                      <h6>
                        Discount : <strong>{item.discount} %</strong>
                      </h6>
                    </CardBody>
                  </Card>
                );
              })}
              <Button
                className="mt-3"
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => setShow(!show)}
              >
                Add New Coupon
              </Button>
            </>
          ) : (
            <>
              <Button
                className="my-3"
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => {
                  setShow(!show);
                  getAllCoupons();
                }}
              >
                View List of Coupons
              </Button>
              <Avatar className="mx-auto">
                <LocalOfferIcon />
              </Avatar>
              <Typography
                className="text-center my-3"
                component="h1"
                variant="h5"
              >
                Create New Coupon
              </Typography>

              <TextField
                id="date"
                label="Expiry date"
                name="expiry_date"
                type="date"
                fullWidth
                variant="outlined"
                onChange={(e) => handleChange(e)}
                error={state.dateError.error}
                helperText={state.dateError.helperText}
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                name="coupon_no"
                label="Coupon No."
                disabled={true}
                value={state.coupon_no}
                variant="outlined"
                fullWidth
                size="small"
                margin="normal"
              />
              <TextField
                name="discount"
                label="Discount %"
                type="number"
                value={state.discount}
                variant="outlined"
                fullWidth
                onChange={(e) => handleChange(e)}
                size="small"
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">%</InputAdornment>
                  ),
                }}
                error={state.discountError.error}
                helperText={state.discountError.helperText}
              />
              <Button
                className="mt-3"
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => handleSubmit()}
              >
                Confirm
              </Button>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(Coupan);
