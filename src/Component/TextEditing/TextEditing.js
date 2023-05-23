import React, { createRef } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./TextEditing.css";
import { useDispatch } from "react-redux";
import { sendMailHandler } from "../../Store/Mail-thunk";
import { MymailSliceAction } from "../../Store/MymailSlice";
import { useSelector } from "react-redux";
import {
  Box,
  Button,
  Card,
  Container,
  FormControl,
  Grid,
  InputLabel,
  OutlinedInput,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { Mail } from "@mui/icons-material";
const TextEditing = () => {
  const Disptach = useDispatch();
  const Enteredemail = createRef(null);
  const Enteredsubject = createRef(null);
  const Enteredtext = createRef(null);
  const sentItemlist = useSelector((state) => state.mymail.sentItem);
  let usermail = localStorage.getItem("mailid");

  const FormsubmitHandler = (event) => {
    event.preventDefault();

    let uid = Date.now().toString(36) + Math.random().toString(36).substr(2);
    const mailData = {
      email: Enteredemail.current.value,
      subject: Enteredsubject.current.value,
      text: Enteredtext.current.value,
      From: localStorage.getItem("mailid"),
      readreceipt: false,
    };
    if (mailData.email === "") {
      return;
    }
    // Disptach(sendMailHandler(mailData));
    if (sentItemlist.length > 0) {
      let oldlist = sentItemlist;
      let sentItem = [{ ...mailData, id: uid }, ...oldlist];

      // console.log("sentItem in text editor", sentItem);
      Disptach(MymailSliceAction.updateSendItem(sentItem));
      Disptach(sendMailHandler(mailData));
    } else {
      // console.log("sentItem in text editor");
      Disptach(sendMailHandler(mailData));
      Disptach(MymailSliceAction.updateSendItem([{ ...mailData, id: uid }]));
    }
    Enteredemail.current.value = null;
    Enteredsubject.current.value = null;
    Enteredtext.current.value = null;
    console.log(mailData, "TextEditing-FormsubmitHandler");
  };
  return (
    <React.Fragment>
      <Container maxWidth="md">
        <Box mt={3}>
          <Card>
            <Box p={2} sx={{ background: "lightgreen", borderRadius: 5 }}>
              <Typography variant="h5" component="h2" mb={2}>
                Compose Email
                <Mail style={{ marginRight: "8px" }} />
              </Typography>

              <form onSubmit={FormsubmitHandler}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={12}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="form">Form</InputLabel>
                      <OutlinedInput
                        sx={{ background: "white" }}
                        id="form"
                        type="email"
                        placeholder="Form"
                        value={usermail}
                        label="Email Address"
                        disabled={true}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="email">Email Address</InputLabel>
                      <OutlinedInput
                        id="email"
                        type="email"
                        inputRef={Enteredemail}
                        label="Email Address"
                        sx={{ background: "white" }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="subject">Subject</InputLabel>
                      <OutlinedInput
                        id="subject"
                        type="text"
                        inputRef={Enteredsubject}
                        label="Subject"
                        sx={{ background: "white" }}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <InputLabel htmlFor="message">Message</InputLabel>
                    <FormControl fullWidth>
                      <TextareaAutosize
                        id="message"
                        rows={5}
                        minRows={3}
                        // placeholder="Enter message"
                        ref={Enteredtext}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <Editor
                      // editorState={editorState}
                      toolbarClassName="toolbarClassName"
                      wrapperClassName="wrapperClassName"
                      editorClassName="editorClassName"
                      // onEditorStateChange={updateTextDescription}
                    />
                  </Grid>
                  <Box mt={3} ml={3} display="flex" justifyContent="flex-end">
                    <Button variant="contained" color="primary" type="submit">
                      Send
                    </Button>
                  </Box>
                </Grid>
              </form>
            </Box>
          </Card>
        </Box>
      </Container>
    </React.Fragment>
  );
};
export default TextEditing;
