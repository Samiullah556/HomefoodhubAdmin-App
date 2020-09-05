import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Avatar, Typography } from "@material-ui/core";
import Settings from "@material-ui/icons/Settings";

const Welcome = () => {
  return (
    <Container style={{ marginLeft: "240px" }}>
      <Row className="mt-5 pt-5">
        <Col className="mt-5 pt-5" xs={12} sm={{ size: 6, offset: 3 }}>
          <Avatar className="mx-auto mb-3">
            <Settings />
          </Avatar>
          <Typography className="text-center my-2" component="h1" variant="h5">
            Welcome to HomeFood hub Dasboard !
          </Typography>
        </Col>
      </Row>
    </Container>
  );
};

export default Welcome;
