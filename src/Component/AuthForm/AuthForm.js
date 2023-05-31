// import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useEffect } from "react";
import { Col, Row, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { sendsignup, Sendlogin } from "../../Store/Action-thunk";
import { UisliceAction } from "../../Store/Uivisible";
import {
  LocalActivityOutlined,
  LockPersonRounded,
  VpnLockOutlined,
} from "@mui/icons-material";
import { Box, Button, IconButton, Typography } from "@mui/material";
import nature from "../../Assets/nature.jpeg";
const AuthForm = () => {
  const Disptach = useDispatch();
  const islogin = useSelector((state) => state.uiauth.islogin);
  const Enteredemail = React.createRef(null);
  const EnteredPassword = React.createRef(null);
  const EnteredConfirmPassword = React.createRef(null);
  const onsubmitHandler = (event) => {
    event.preventDefault();

    const obj = {
      email: Enteredemail.current.value,
      password: EnteredPassword.current.value,
    };

    if (obj.email === "" && obj.password === "") {
      return;
    }
    if (islogin) {
      console.log("obj", obj);
      Disptach(Sendlogin(obj));
    }
    if (!islogin && obj.password === EnteredConfirmPassword.current.value) {
      Disptach(sendsignup(obj));
    }

    // console.log(obj);
  };
  const buttonToggle = () => {
    Disptach(UisliceAction.setisLogin());
  };
  return (
    <Container className="pt-2 ">
      <Box
        sx={{
          width: "100%",
          margin: "0 auto",
          // backgroundColor: "#f5f5f5",
          padding: "3px",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography variant="h1">
          <span className="g-letter">G</span>
          <span className="mail-letter">Mail</span>
        </Typography>
        <Typography variant="h5">
          A place to connect, communicate, and stay organized. Join{" "}
          <span style={{ color: "green", fontSize: 30 }}>G</span>
          <span style={{ color: "gold", fontSize: 20 }}>Mail</span>
          today!
        </Typography>
      </Box>
      <Row className="justify-content-md-center ">
        <Col xs={12} md={5}>
          <Form
            className="shadow p-3 mt-5 bg-green rounded"
            onSubmit={onsubmitHandler}
            style={{ background: "lightgreen" }}
          >
            <h3>
              {islogin ? "Login" : "SignUp"}
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
                style={{ marginLeft: "auto" }}
              >
                <LockPersonRounded />
              </IconButton>
            </h3>
            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                ref={Enteredemail}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                autoComplete="off"
                ref={EnteredPassword}
              ></Form.Control>
            </Form.Group>
            {!islogin && (
              <Form.Group controlId="Confirm Password">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  ref={EnteredConfirmPassword}
                ></Form.Control>
              </Form.Group>
            )}
            <Box sx={{ marginTop: 6 }}>
              <Button
                variant="contained"
                type="submit"
                sx={{
                  borderRadius: 2,
                  fontWeight: "bold",
                  fontSize: { sx: 14, md: 17 },
                  marginRight: 3,
                  background: "green",
                }}
              >
                {islogin ? "Login" : "SignUp"}
              </Button>

              <Button
                variant="contained"
                onClick={buttonToggle}
                sx={{
                  marginRight: 2,
                  borderRadius: 2,
                  // fontWeight: "bold",
                  padding: "0 5",
                  background: "gold",
                  fontSize: { sx: 14, md: 17 },
                  color: "black",
                }}
              >
                {islogin ? "SignUp" : "Login  account"}
              </Button>
            </Box>
          </Form>
          <p>TestLogin id =demo@gmail.com</p>
          <p>TestLogin password =123456</p>
        </Col>
        <Col xs={12} md={6}>
          <Typography
            variant="h5"
            sx={{
              width: "100%",
              margin: "0 auto",
              // backgroundColor: "lightgreen",
              padding: "1px",
              borderRadius: "8px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              marginTop: 7,
              height: { sx: "100%", md: "70%" },
              // boxShadow: "3px 1px 20px lightgreen",
              position: "relative",
              // color: "white",
              // fontWeight: "bold",
              fontSize: 17,
            }}
          >
            <span className="formpage-image">
              <img src={nature}></img>
            </span>
            <span className="formpage-p">
              Our application provides a secure and safe environment for all
              your communication needs. With our advanced features and
              user-friendly interface, you can easily manage your emails and
              stay organized. Join us today and experience hassle-free email
              management!
            </span>
          </Typography>
        </Col>
      </Row>
    </Container>
  );
};

export default AuthForm;
