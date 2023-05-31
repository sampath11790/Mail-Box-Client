import React, { useEffect } from "react";

import { List } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import DraftItem from "./DraftItem";
import { getDraft } from "../../../Store/Mail-thunk";

const DraftMessage = () => {
  const { Draft, calldraft } = useSelector((state) => state.mymail);
  const Disptach = useDispatch();
  useEffect(() => {
    let token = localStorage.getItem("id");
    // console.log("calling");
    if (calldraft > 0) {
      Disptach(getDraft(token));
    }
  }, [calldraft]);

  return (
    <>
      <List>
        {Draft.map((item) => (
          <DraftItem
            key={item.id}
            To={item.To}
            subject={item.subject}
            text={item.text}
            id={item.id}
            createdAt={item.createdAt}
          ></DraftItem>
        ))}
      </List>
    </>
  );
};
export default DraftMessage;
