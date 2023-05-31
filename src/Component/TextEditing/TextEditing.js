import React, { createRef } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./TextEditing.css";
import { useDispatch } from "react-redux";
import { PostDraft, sendMailHandler } from "../../Store/Mail-thunk";
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
  let token = localStorage.getItem("id");
  const FormsubmitHandler = (event) => {
    event.preventDefault();

    // let uid = Date.now().toString(36) + Math.random().toString(36).substr(2);
    const mailData = {
      To: Enteredemail.current.value,
      subject: Enteredsubject.current.value,
      text: Enteredtext.current.value,
      // From: localStorage.getItem("mailid"),
      readreceipt: false,
    };
    if (mailData.To === "") {
      return;
    }

    Disptach(sendMailHandler(mailData, token));

    Enteredemail.current.value = null;
    Enteredsubject.current.value = null;
    Enteredtext.current.value = null;
  };
  const DraftHandler = () => {
    const mailData = {
      To: Enteredemail.current.value,
      subject: Enteredsubject.current.value,
      text: Enteredtext.current.value,
      // From: localStorage.getItem("mailid"),
      readreceipt: false,
    };
    Disptach(PostDraft(mailData, token));
    Enteredemail.current.value = null;
    Enteredsubject.current.value = null;
    Enteredtext.current.value = null;
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
                      <InputLabel htmlFor="from">From</InputLabel>
                      <OutlinedInput
                        sx={{ background: "white" }}
                        id="from"
                        type="email"
                        placeholder="From"
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
                  <Box
                    mt={3}
                    ml={3}
                    display="flex"
                    justifyContent="flex-end"
                    onClick={DraftHandler}
                  >
                    <Button variant="contained" color="primary" type="submit">
                      Save
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
