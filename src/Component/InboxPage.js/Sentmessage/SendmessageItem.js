import React from "react";
// import { Col, Container, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
// import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { MymailSliceAction } from "../../../Store/MymailSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Box,
  Button,
} from "@mui/material";
const SentMessageListItem = (props) => {
  const sentItems = useSelector((state) => state.mymail.sentItem);
  const Dispatch = useDispatch();

  let Readreceipt;
  if (!props.readreceipt) {
    Readreceipt = "readreceipt";
  }
  const ListItemHandler = () => {
    // console.log("sendmeeage page", props);
    Dispatch(MymailSliceAction.addMessageViewinfo(props));
  };
  const deleteHandler = () => {
    console.log("delete");
    let oldarry = sentItems;
    if (oldarry.length !== 1) {
      let sentItem = oldarry.filter((item) => item.id !== props.id);
      Dispatch(MymailSliceAction.updateSendItem(sentItem));
    } else {
      Dispatch(MymailSliceAction.updateSendItem([]));
    }
  };
  return (
    <>
      <ListItem
        button
        id={props.id}
        className="m-.3 "
        key={props.id}
        variant="success"
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            padding: "10px",
            borderRadius: "8px",
            background: Readreceipt ? "lightblue" : "",
          }}
          onClick={ListItemHandler}
        >
          <ListItemText>
            <Link to="sentmailview">{props.email}</Link>
          </ListItemText>
        </Box>

        <Box sx={{ margin: 3 }}>
          <ListItemSecondaryAction onClick={deleteHandler}>
            <IconButton edge="end" aria-label="delete">
              <Button sx={{ marginLeft: "20px" }}>
                <span>
                  <DeleteIcon />
                </span>
              </Button>
            </IconButton>
          </ListItemSecondaryAction>
        </Box>
      </ListItem>
    </>
  );
};
export default SentMessageListItem;
