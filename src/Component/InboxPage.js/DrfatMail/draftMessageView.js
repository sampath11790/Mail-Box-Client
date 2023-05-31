import React from "react";
import { Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DeleteDraft, sendMailHandler } from "../../../Store/Mail-thunk";

const DraftMessageView = (props) => {
  const mymailmessageView = useSelector((state) => state.mymail.DarftMessage);
  const navigate = useNavigate();
  const Dispatch = useDispatch();
  console.log(mymailmessageView, " mymailmessageView");
  const replybuttonHandler = () => {
    let token = localStorage.getItem("id");
    const mailData = {
      To: mymailmessageView.To,
      subject: mymailmessageView.subject,
      text: mymailmessageView.text,

      readreceipt: false,
    };

    Dispatch(sendMailHandler(mailData, token));
    Dispatch(DeleteDraft(mymailmessageView.id, token));
    navigate("/main/draft-mail");
  };
  return (
    <React.Fragment>
      <Card className="mt-3">
        <Card.Header>
          <h3>{mymailmessageView.subject}</h3>
        </Card.Header>
        <Card.Body>
          <p className="mb-5">{mymailmessageView.text}</p>
        </Card.Body>
        <Card.Footer>
          <h6>{mymailmessageView.email}</h6>
          <p style={{ marginTop: "5px" }}>{mymailmessageView.createdAt}</p>
          <Button onClick={replybuttonHandler}>send</Button>
        </Card.Footer>
      </Card>
    </React.Fragment>
  );
};

export default DraftMessageView;
