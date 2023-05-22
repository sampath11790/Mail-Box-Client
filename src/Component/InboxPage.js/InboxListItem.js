import React from "react";
// import { Col, Container, ListGroup, Row, Badge } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { UpdateList } from "../../Store/Mail-thunk";
import MailIcon from "@mui/icons-material/Mail";
// import Button from "react-bootstrap/Button";

import { DeleteMail } from "../../Store/Mail-thunk";
// import { Link } from "react-router-dom";
import { MailSliceAction } from "../../Store/MailSlice";
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Badge,
  Box,
} from "@mui/material";
// import { useDispatch } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "react-bootstrap";
// import { Button } from "react-bootstrap";
// import { Link } from "react-router-dom";

const InboxListItem = (props) => {
  const Dispatch = useDispatch();

  let Readreceipt;
  if (!props.readreceipt) {
    Readreceipt = "warning";
  }
  const ListItemHandler = () => {
    if (props.readreceipt) {
      Dispatch(MailSliceAction.addMessageViewinfo(props));
      return;
    }
    Dispatch(UpdateList(props));
    Dispatch(MailSliceAction.addMessageViewinfo(props));
  };
  const deleteHandler = () => {
    Dispatch(DeleteMail(props.id));
    // console.log(props.id);
  };
  return (
    <>
      <ListItem button onClick={ListItemHandler}>
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
        >
          <ListItemText>
            {/* <div className="readreceiptbox"> */}
            {Readreceipt && (
              <Badge color="secondary" variant="dot" sx={{ marginRight: 2 }}>
                {Readreceipt && <MailIcon />}
              </Badge>
            )}
            {/* <Badge variant="outlined" color={Readreceipt}>
            
            </Badge> */}
            {/* </div> */}
            <Link to="mailview">{props.From}</Link>
          </ListItemText>
          <ListItemSecondaryAction onClick={deleteHandler}>
            <IconButton edge="end" aria-label="delete">
              <Button>
                <DeleteIcon />
              </Button>
            </IconButton>
          </ListItemSecondaryAction>
        </Box>
      </ListItem>

      {/* <ListGroup.Item
        id={props.id}
        className="m-.3 "
        variant={Readreceipt && "primary"}
        key={props.id}
      >
        <Row>
          <Col className="pb-3">
            <div className="readreceiptbox" onClick={ListItemHandler}>
           
              <Badge pill bg={`${Readreceipt}`}>
                {Readreceipt && "unread"}
              </Badge>
              <Link to="mailview">{props.From}</Link>
            </div>
          </Col>

          <Col md={1} style={{ height: "20px" }}>
            <Button variant="secondary" onClick={deleteHandler}>
              delete
            </Button>
          </Col>
        </Row>
      </ListGroup.Item> */}
    </>
  );
};
export default InboxListItem;
