import React from "react";
import { Button, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CalendarIcon from "@mui/icons-material/CalendarTodayRounded";

const MessageView = (props) => {
  let messageView = useSelector((state) => state.mail.messageView);

  const navigate = useNavigate();
  console.log(messageView, " mymailmessageView");
  const replybuttonHandler = () => {
    navigate("/main/text-edit");
  };
  const extractDate = (date) => {
    const currentDate = new Date(date);
    const dateString = currentDate.toDateString();
    const timeString = currentDate.toLocaleTimeString();

    const dateTimeString = dateString + " " + timeString;
    return dateTimeString;
  };
  return (
    <React.Fragment>
      <Card>
        <Card.Header>
          <h3>{messageView.subject}</h3>
        </Card.Header>
        <Card.Body>
          <p className="mb-5">{messageView.text}</p>
        </Card.Body>
        <Card.Footer>
          <h6>{messageView.email}</h6>
          <p style={{ marginTop: "5px" }}>
            <CalendarIcon />
            {extractDate(messageView.createdAt)}
          </p>
          <Button onClick={replybuttonHandler}>Reply</Button>
        </Card.Footer>
      </Card>
    </React.Fragment>
  );
};

export default MessageView;
