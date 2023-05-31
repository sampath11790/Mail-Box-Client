import React from "react";
import "./Inbox.css";

import { Outlet } from "react-router-dom";
import InboxNavbar from "./InboxNavbar";
import { getDraft, getmailHandler } from "../../Store/Mail-thunk";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MessageView from "./MessageView";
import { Link, Route, Routes } from "react-router-dom";
import SentMessageView from "./Sentmessage/sentMessageView";
import { MailOutline, Send } from "@mui/icons-material";
import { Create, Drafts } from "@mui/icons-material";
import { Grid, List, Badge, IconButton, ListItem } from "@mui/material";

import DraftMessageView from "./DrfatMail/draftMessageView";

const InboxPage = () => {
  const count = useSelector((state) => state.mail.count);
  const unread = useSelector((state) => state.mail.unread);
  const Disptach = useDispatch();
  let token = localStorage.getItem("id");
  useEffect(() => {
    let token = localStorage.getItem("id");
    Disptach(getmailHandler(token));
    Disptach(getDraft(token));
  }, []);

  useEffect(() => {
    let token = localStorage.getItem("id");
    if (count > 0) {
      Disptach(getmailHandler(token));
    }
  }, [count]);

  useEffect(() => {
    const intervelid = setInterval(() => {
      // console.log("setintervelid", intervelid);
      Disptach(getmailHandler(token));
    }, 2000);

    return () => {
      // console.log("clearintervelid", intervelid);
      clearInterval(intervelid);
    };
  });

  const sendmailcartHandler = () => {
    Disptach(getmailHandler());
  };
  const listItems = [
    {
      to: "text-edit",
      label: "Compose",
      icon: <Create />,
    },
    {
      to: "inboxlist",
      label: "Inbox",
      icon:
        unread > 0 ? (
          <Badge badgeContent={unread} color="error">
            <MailOutline />
          </Badge>
        ) : (
          <MailOutline />
        ),
    },
    {
      to: "sentmessage",
      label: "SentMail",
      icon: <Send />,
    },
    {
      to: "draft-mail",
      label: "Draft",
      icon: <Drafts />,
    },
  ];
  const liststyle = {
    color: "white",
    "&:hover": {
      backgroundColor: "gold",
    },
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
            {listItems.map((item, index) => (
              <Link key={index} to={item.to} style={{ textDecoration: "none" }}>
                <ListItem
                  button
                  onClick={
                    item.label === "SentMail" ? sendmailcartHandler : null
                  }
                  sx={liststyle}
                >
                  {item.label}
                  <IconButton
                    size="large"
                    aria-label={`show ${index} new notifications`}
                    color="inherit"
                    style={{ marginLeft: "auto" }}
                  >
                    {item.icon}
                  </IconButton>
                </ListItem>
              </Link>
            ))}
          </List>
        </Grid>

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
          <Routes>
            <Route
              path="/draft-mail/draftmail-view"
              element={<DraftMessageView />}
            />
          </Routes>

          <Outlet />
        </Grid>
      </Grid>
    </>
  );
};

export default InboxPage;
