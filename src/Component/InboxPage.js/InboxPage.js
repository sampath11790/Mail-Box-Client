import React from "react";
import "./Inbox.css";
// import { Container, Row, Col, ListGroup, Badge } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import InboxNavbar from "./InboxNavbar";
import { getmailHandler } from "../../Store/Mail-thunk";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MessageView from "./MessageView";
import { Link, Route, Routes } from "react-router-dom";
import SentMessageView from "./Sentmessage/sentMessageView";
import { Container, Grid, List, ListItem, Badge, Box } from "@mui/material";
// import ToggleButton from "./ToggleMenuButton";

const InboxPage = () => {
  const count = useSelector((state) => state.mail.count);
  const unread = useSelector((state) => state.mail.unread);
  const Disptach = useDispatch();

  useEffect(() => {
    Disptach(getmailHandler());
  }, []);

  useEffect(() => {
    if (count > 0) {
      Disptach(getmailHandler());
    }
  }, [count]);

  // calling the backend api every 2 seconds to update inbox

  // useEffect(() => {
  //   const intervelid = setInterval(() => {
  //     console.log("setintervelid", intervelid);
  //     Disptach(getmailHandler());
  //   }, 2000);

  //   return () => {
  //     console.log("clearintervelid", intervelid);
  //     clearInterval(intervelid);
  //   };
  // });

  const sendmailcartHandler = () => {
    Disptach(getmailHandler());
  };

  return (
    <>
      <InboxNavbar></InboxNavbar>

      <Grid container style={{ height: "650px" }}>
        {/* <Box > */}
        <Grid
          item
          xs={2}
          bgcolor=" #007bff"
          sx={{ display: { xs: "none", md: "block" } }}
        >
          <List component="nav">
            <Link to="text-edit" style={{ textDecoration: "none" }}>
              <ListItem style={{ color: "white" }}>Compose</ListItem>
            </Link>
            <Link to="inboxlist" style={{ textDecoration: "none" }}>
              <ListItem button>
                {/* <div className="indbox-cont"> */}
                <p style={{ color: "white" }}>Inbox</p>
                <Badge badgeContent={unread} color="primary">
                  {/* Unread */}
                </Badge>
                {/* </div> */}
              </ListItem>
            </Link>

            <Link to="sentmessage" style={{ textDecoration: "none" }}>
              <ListItem
                button
                onClick={sendmailcartHandler}
                style={{ color: "white" }}
              >
                SentMail
              </ListItem>
            </Link>
          </List>
        </Grid>
        {/* </Box> */}
        <Grid item xs={12} sm={12} md={10}>
          <Routes>
            <Route path="/inboxlist/mailview" element={<MessageView />} />
          </Routes>
          <Routes>
            <Route
              path="/sentmessage/sentmailview"
              element={<SentMessageView />}
            />
          </Routes>
          {/* <ToggleButton></ToggleButton> */}
          <Outlet />
        </Grid>
      </Grid>

      {/* <InboxNavbar></InboxNavbar>
      <Container className=" bk-inbox" fluid>
        <Row style={{ height: "650px" }}>
          <Col xs={2} className=" bg-info" variant="primary">
            <ListGroup className="p-2" as="ul">
              <Link to="text-edit">
                <ListGroup.Item className="m-1 bg-" action>
                  Compose
                </ListGroup.Item>
              </Link>
              <Link to="inboxlist">
                <ListGroup.Item className="m-1 bg-" action>
                  <div className="indbox-cont">
                    <p>inbox</p>

                    <Badge bg="primary">{unread}</Badge>

                 
                  </div>
                </ListGroup.Item>
              </Link>
             
             
              <Link to="sentmessage">
                <ListGroup.Item
                  className="m-1"
                  action
                  onClick={sendmailcartHandler}
                >
                  SentMail
                </ListGroup.Item>
              </Link>
            </ListGroup>
          </Col>

          <Col xs={10} className="">
        
            <Routes>
              <Route path="/inboxlist/mailview" element={<MessageView />} />
            </Routes>
            <Routes>
              <Route
                path="/sentmessage/sentmailview"
                element={<SentMessageView />}
              />
            </Routes>
            
            <Outlet></Outlet>
           
          </Col>
        </Row>
      </Container> */}
    </>
  );
};

export default InboxPage;
