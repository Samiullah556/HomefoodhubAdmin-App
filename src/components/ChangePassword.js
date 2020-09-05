import React, { useState } from "react";
import axios from "axios";
import { Container, Row, Col } from "reactstrap";
import { Button, TextField, Avatar, Typography } from "@material-ui/core";
import VpnKey from "@material-ui/icons/VpnKey";
import { fieldValidate } from "../utils/formValidation";
import { SERVER_URL } from "../utils/formValidation";
import { connect } from "react-redux";
import sweetAlert from "sweetalert";

const ChangePassword = () => {
  const [state, setState] = useState({
    oldpassword: "",
    newpassword: "",
    oldpasswordError: {
      error: false,
      helperText: "",
    },
    newpasswordError: {
      error: false,
      helperText: "",
    },
  });

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    let { oldpassword, newpassword } = state;
    let oldpasswordError = fieldValidate(oldpassword, "password");
    let newpasswordError = fieldValidate(newpassword, "password");
    setState({
      ...state,
      oldpasswordError,
      newpasswordError,
    });
    let data = {
      email: "admin@homefoodhub.com",
      oldpassword,
      newpassword,
    };
    if (oldpasswordError.error === false && newpasswordError.error === false) {
      try {
        let res = await axios.put(
          SERVER_URL + "/auth/updatepassword?q=chef",
          data
        );
        // console.log(res.data);
        setState({
          ...state,
          oldpassword: "",
          newpassword: "",
        });
        sweetAlert({
          title: "Admin Password Changed",
          icon: "success",
          closeOnClickOutside: false,
        });
      } catch (e) {
        sweetAlert({
          title: "Can't Change Admin Password",
          text: "Invalid Old Password !",
          icon: "error",
          closeOnClickOutside: false,
        });
        console.log(e);
      }
    }
  };
  return (
    <Container style={{ marginLeft: "240px" }}>
      <Row className="mt-5 pt-4">
        <Col className="mt-5 pt-4" xs={12} sm={{ size: 6, offset: 3 }}>
          <Avatar className="mx-auto">
            <VpnKey />
          </Avatar>
          <Typography className="text-center my-2" component="h1" variant="h5">
            Change Password
          </Typography>
          <TextField
            name="oldpassword"
            label="Old Password"
            type="password"
            value={state.oldpassword}
            variant="outlined"
            fullWidth
            onChange={(e) => handleChange(e)}
            size="small"
            margin="normal"
            error={state.oldpasswordError.error}
            helperText={state.oldpasswordError.helperText}
          />
          <TextField
            name="newpassword"
            label="New Password"
            type="password"
            value={state.newpassword}
            variant="outlined"
            fullWidth
            onChange={(e) => handleChange(e)}
            size="small"
            margin="normal"
            error={state.newpasswordError.error}
            helperText={state.newpasswordError.helperText}
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
        </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(ChangePassword);
