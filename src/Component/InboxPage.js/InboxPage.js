import React from "react";
import "./Inbox.css";

import { Outlet } from "react-router-dom";
import InboxNavbar from "./InboxNavbar";
import { getmailHandler } from "../../Store/Mail-thunk";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MessageView from "./MessageView";
import { Link, Route, Routes } from "react-router-dom";
import SentMessageView from "./Sentmessage/sentMessageView";
import { MailOutline, Send } from "@mui/icons-material";
import { Create, Drafts } from "@mui/icons-material";
import { Grid, List, Badge, IconButton, ListItem } from "@mui/material";

import NotificationsIcon from "@mui/icons-material/Notifications";

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

  useEffect(() => {
    const intervelid = setInterval(() => {
      // console.log("setintervelid", intervelid);
      Disptach(getmailHandler());
    }, 2000);

    return () => {
      // console.log("clearintervelid", intervelid);
      clearInterval(intervelid);
    };
  });

  const sendmailcartHandler = () => {
    Disptach(getmailHandler());
  };
  const liststyle = { background: "gold", borderRadius: 3, marginTop: 3 };
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
              <ListItem button sx={liststyle}>
                Compose
                <IconButton
                  size="large"
                  aria-label="show 17 new notifications"
                  color="inherit"
                  style={{ marginLeft: "auto" }}
                >
                  <Create></Create>
                </IconButton>
              </ListItem>
            </Link>
            <Link to="inboxlist" style={{ textDecoration: "none" }}>
              <ListItem button sx={liststyle}>
                Inbox
                <IconButton
                  size="large"
                  aria-label="show 17 new notifications"
                  color="inherit"
                  style={{ marginLeft: "auto" }}
                >
                  {unread > 0 ? (
                    <Badge badgeContent={unread} color="error">
                      <NotificationsIcon />
                    </Badge>
                  ) : (
                    <MailOutline></MailOutline>
                  )}
                </IconButton>
              </ListItem>
            </Link>

            <Link to="sentmessage" style={{ textDecoration: "none" }}>
              <ListItem button onClick={sendmailcartHandler} sx={liststyle}>
                SentMail
                <IconButton
                  size="large"
                  aria-label="show 17 new notifications"
                  color="inherit"
                  style={{ marginLeft: "auto" }}
                >
                  <Send></Send>
                </IconButton>
              </ListItem>
            </Link>
            <Link to="#" style={{ textDecoration: "none" }}>
              <ListItem button sx={liststyle}>
                Draft
                <IconButton
                  size="large"
                  aria-label="show 17 new notifications"
                  color="inherit"
                  style={{ marginLeft: "auto" }}
                >
                  <Drafts></Drafts>
                </IconButton>
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

          <Outlet />
        </Grid>
      </Grid>
    </>
  );
};

export default InboxPage;
