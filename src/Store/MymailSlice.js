import { createSlice } from "@reduxjs/toolkit";

const initialmystate = {
  sentItem: [],
  messageView: {},
  Draft: [],
  sendcount: 0,
  DarftMessage: {},
  calldraft: 0,
};

const MymailSlice = createSlice({
  name: "mymail",
  initialState: initialmystate,
  reducers: {
    AddSenditemList(state, action) {
      state.sentItem = action.payload;
      // state.sentItem.push(newItem);
    },
    addMessageViewinfo(state, action) {
      state.messageView = action.payload;
    },
    updateSendItem(state, action) {
      // state.sentItem = action.payload;
      // console.log(action.payload.length === 0);
      state.loadingspinner = !state.loadingspinner;
      // state.sendcount++;
      if (action.payload.length === 0) {
        state.sentItem = [];
        state.sendcount++;
      } else {
        state.sentItem = action.payload;
        state.sendcount++;
      }
    },
    SetDraftDate(state, action) {
      state.Draft = action.payload;
    },
    Viewdarft(state, action) {
      state.DarftMessage = action.payload;
    },
    callgetDraft(state, action) {
      state.calldraft++;
    },
  },
});
export const MymailSliceAction = MymailSlice.actions;
export default MymailSlice;
