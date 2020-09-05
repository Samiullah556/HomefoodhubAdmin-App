import React, { useState } from "react";
import axios from "axios";
import { Container, Row, Col } from "reactstrap";
import { Button, TextField, Avatar, Typography } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { fieldValidate } from "../utils/formValidation";
import { SERVER_URL } from "../utils/formValidation";
import { connect } from "react-redux";
import { setCurrentUser } from "../redux/actions/auth";
import sweetAlert from "sweetalert";

const Login = ({ auth, setCurrentUser }) => {
  const [state, setState] = useState({
    email: "",
    password: "",
    emailError: {
      error: false,
      helperText: "",
    },
    passwordError: {
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
    let { email, password } = state;
    let emailError = fieldValidate(email, "email");
    let passwordError = {};
    if (password === "") {
      passwordError = {
        error: true,
        helperText: "Please Enter password",
      };
    } else {
      passwordError = {
        error: false,
        helperText: "",
      };
    }
    setState({
      ...state,
      emailError,
      passwordError,
    });
    if (emailError.error === false && passwordError.error === false) {
      let data = {
        email,
        password,
      };
      if (email === "admin@homefoodhub.com") {
        try {
          let res = await axios.post(SERVER_URL + "/auth/login?q=chef", data);
          //   console.log(res);
          setCurrentUser(res.data.user);
          sessionStorage.setItem("adminToken", JSON.stringify(res.data.user));
          sweetAlert({
            title: "Admin is Logged In",
            icon: "success",
            closeOnClickOutside: false,
          });
        } catch (e) {
          console.log(e);
          sweetAlert({
            title: "Error signing in",
            icon: "error",
            closeOnClickOutside: false,
          });
        }
      } else {
        sweetAlert({
          title: "Only Admin have access to dashboard !",
          icon: "info",
          closeOnClickOutside: false,
        });
      }
    }
  };
  return (
    <Container>
      <Row className="mt-5 pt-4">
        <Col className="mt-5 pt-4" xs={12} sm={{ size: 6, offset: 3 }}>
          <Avatar className="mx-auto">
            <LockOutlinedIcon />
          </Avatar>
          <Typography className="text-center my-2" component="h1" variant="h5">
            Sign in
          </Typography>
          <TextField
            name="email"
            label="Email"
            type="text"
            defaultValue={state.email}
            variant="outlined"
            fullWidth
            onChange={(e) => handleChange(e)}
            size="small"
            margin="normal"
            error={state.emailError.error}
            helperText={state.emailError.helperText}
          />
          <TextField
            name="password"
            label="Password"
            type="password"
            defaultValue={state.password}
            variant="outlined"
            fullWidth
            onChange={(e) => handleChange(e)}
            size="small"
            margin="normal"
            error={state.passwordError.error}
            helperText={state.passwordError.helperText}
          />
          <Button
            className="mt-3"
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => handleSubmit()}
          >
            Login
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  auth: state.user,
});

export default connect(mapStateToProps, { setCurrentUser })(Login);
