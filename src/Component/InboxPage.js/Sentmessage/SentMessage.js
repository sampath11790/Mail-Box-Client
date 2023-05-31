import React, { useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import SentMessageListItem from "./SendmessageItem";
import { List } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
// import { getmailHandler } from "../../../Store/Mail-thunk";
const SentMessage = () => {
  const sentItem = useSelector((state) => state.mymail.sentItem);
  // console.log(sentItem);
  // const Disptach = useDispatch();
  // useEffect(() => {
  //   Disptach(getmailHandler());
  // }, []);
  return (
    <>
      <List>
        {sentItem.map((item) => (
          <SentMessageListItem
            key={item.id}
            To={item.To}
            subject={item.subject}
            text={item.text}
            id={item.id}
            createdAt={item.createdAt}
          ></SentMessageListItem>
        ))}
      </List>
    </>
  );
};
export default SentMessage;
