import React from "react";
import InboxListItem from "./InboxListItem";
import { List } from "@mui/material";
import { useSelector } from "react-redux";

const InboxList = () => {
  const Items = useSelector((state) => state.mail.items);

  return (
    <>
      <List>
        {Items.map((item) => (
          <InboxListItem
            key={item.id}
            email={item.email}
            subject={item.subject}
            text={item.text}
            id={item.id}
            From={item.From}
            readreceipt={item.readreceipt}
          ></InboxListItem>
        ))}
      </List>
    </>
  );
};
export default InboxList;
