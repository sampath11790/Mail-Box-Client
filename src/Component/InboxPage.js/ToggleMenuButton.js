import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { MailOutline, Send } from "@mui/icons-material";
import { Create, Drafts } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function ToggleButtonElement() {
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    console.log("function invoke");
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const obj = [
    { name: "Compose", icon: <Create />, path: "/main/text-edit" },
    { name: "Inbox", icon: <MailOutline />, path: "/main/inboxlist" },
    {
      name: "Sent Mail",
      icon: <MailIcon></MailIcon>,
      path: "/main/sentmessage",
    },
    { name: "Drafts", icon: <Drafts />, path: "/main/draft-mail" },
  ];
  const list = (
    <Box
      sx={{
        width: 250,
        height: "100%",
        backgroundColor: " #007bff",
        position: "fixed",
        color: "inhert",
        // zIndex: 9999,
      }}
      role="presentation"
      onClick={toggleDrawer("left", false)}
      onKeyDown={toggleDrawer("left", false)}
    >
      <List>
        {obj.map(({ name, icon, path }) => (
          <Link to={path} key={name} style={{ color: "white" }}>
            <ListItem key={name} disablePadding>
              <ListItemButton>
                <ListItemIcon style={{ color: "white" }}>{icon}</ListItemIcon>
                <ListItemText primary={name} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <IconButton
        size="large"
        // sx={{ mr: 2, color: "white" }}
        onClick={toggleDrawer("left", true)}
        sx={{ display: { xs: "block", md: "none", mr: 2, color: "white" } }}
      >
        <MenuIcon />
      </IconButton>

      <SwipeableDrawer
        anchor="left"
        open={state.left}
        onClose={toggleDrawer("left", false)}
        onOpen={toggleDrawer("left", true)}
        ModalProps={{
          keepMounted: true,
          BackdropProps: {
            invisible: true,
          },
        }}
      >
        {list}
      </SwipeableDrawer>
    </>
  );
}
