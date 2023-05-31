import { createSlice } from "@reduxjs/toolkit";

const initialval = {
  // sendMail: false,
  // getMail: false,
  items: [],
  count: 0,
  unread: 0,
  messageView: {},
  sentItem: [],
};

const MailSlice = createSlice({
  name: "mail",
  initialState: initialval,
  reducers: {
    setSentData(state, action) {
      state.sendMail = !state.sendMail;
      state.count++;
    },

    addItem(state, action) {
      state.items = action.payload;

      let Unreadmessage = 0;
      state.items.map((item) => {
        if (!item.readreceipt === true) {
          Unreadmessage++;
        }
        return;
      });
      state.unread = Unreadmessage;
    },
    updataItems(state, action) {
      state.count++;
    },
    DeleteItem(state, action) {
      state.count++;
    },
    addMessageViewinfo(state, action) {
      state.messageView = action.payload;
    },
  },
});
export const MailSliceAction = MailSlice.actions;
export default MailSlice;
