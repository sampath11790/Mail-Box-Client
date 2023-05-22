import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
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

  const list = (
    <Box
      sx={{
        width: 250,
        height: "100%",
        backgroundColor: "#fff",
        position: "fixed",
        zIndex: 9999,
      }}
      role="presentation"
      onClick={toggleDrawer("left", false)}
      onKeyDown={toggleDrawer("left", false)}
    >
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <IconButton
        size="large"
        sx={{ mr: 2, color: "white" }}
        onClick={toggleDrawer("left", true)}
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
