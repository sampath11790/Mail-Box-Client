import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { UpdateList } from "../../Store/Mail-thunk";
import MailIcon from "@mui/icons-material/Mail";
import { DeleteMail } from "../../Store/Mail-thunk";
import { MailSliceAction } from "../../Store/MailSlice";
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Badge,
  Box,
  Button,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

const mailview = {
  fontSize: 10,
  display: "flex",
  textAlign: "end",
  width: "100%",
  flexDirection: "column",
};
const InboxListItem = (props) => {
  const Dispatch = useDispatch();
  let token = localStorage.getItem("id");
  let Readreceipt;
  if (!props.readreceipt) {
    Readreceipt = "warning";
  }
  const ListItemHandler = () => {
    if (props.readreceipt) {
      Dispatch(MailSliceAction.addMessageViewinfo(props));
      return;
    }
    Dispatch(UpdateList(props.id, token));
    Dispatch(MailSliceAction.addMessageViewinfo(props));
  };
  const deleteHandler = () => {
    Dispatch(DeleteMail(props.id, token));
    // console.log(props.id);
  };
  const ExtractTime = (date) => {
    const currentDate = new Date(date);
    const dateString = currentDate.toDateString();
    const timeString = currentDate.toLocaleTimeString();

    const dateTimeString = dateString + " " + timeString;
    return dateTimeString;
  };
  const boxstyle = {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    boxShadow: "0px 2px 4px lightgreen",
    padding: "10px",
    borderRadius: "8px",
    background: Readreceipt ? "lightblue" : "",
  };
  return (
    <>
      <ListItem button>
        <Box sx={boxstyle} onClick={ListItemHandler}>
          <ListItemText>
            {Readreceipt && (
              <Badge color="secondary" variant="dot" sx={{ marginRight: 2 }}>
                {Readreceipt && <MailIcon />}
              </Badge>
            )}

            <Link to="mailview">
              {props.From}
              <Box sx={mailview}>
                {/* <CalendarIcon /> */}
                {ExtractTime(props.createdAt)}
              </Box>
            </Link>
          </ListItemText>
        </Box>
        <Box sx={{ margin: 3 }}>
          <ListItemSecondaryAction onClick={deleteHandler}>
            <IconButton edge="end" aria-label="delete">
              <Button>
                <DeleteIcon />
              </Button>
            </IconButton>
          </ListItemSecondaryAction>
        </Box>
      </ListItem>
    </>
  );
};
export default InboxListItem;
