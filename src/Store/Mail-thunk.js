import { MailSliceAction } from "./MailSlice";
import { MymailSliceAction } from "./MymailSlice";

//sending mail
export const sendMailHandler = (mailobj, token) => {
  return async (Disptach) => {
    const sendingmail = async () => {
      const response = await fetch(`http://3.94.210.5:3000/user/sendmail`, {
        method: "POST",
        body: JSON.stringify(mailobj),
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      const data = await response.json();
      if (data.error) {
        throw new Error("faild");
      }
      //   console.log(data);
      return data;
    };
    try {
      await sendingmail();

      Disptach(MailSliceAction.setSentData());
      //   console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };
};

//get all mail
export const getmailHandler = (token) => {
  return async (Disptach) => {
    const gettingMailList = async () => {
      const response = await fetch(`http://3.94.210.5:3000/user/getmail`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      const data = await response.json();

      if (data.error) {
        console.log(data);
        throw new Error("faild");
      }

      return data;
    };
    try {
      const data = await gettingMailList();
      console.log("data", data);
      const inbox = data.inbox;
      let sentItems = data.sentItems;
      if (inbox.length > 0) Disptach(MailSliceAction.addItem(inbox));
      // Disptach(MymailSliceAction.AddSenditemList(sentItem));
      if (sentItems.length > 0) {
        Disptach(MymailSliceAction.AddSenditemList(sentItems));
      }
    } catch (error) {
      // console.log("error message");
      // console.log(data);
    }
  };
};

//Read readreceipt update
export const UpdateList = (id, token) => {
  return async (Dispatch) => {
    // let emailId = localStorage.getItem("mailid").replace(/[&@.]/g, "");

    const UpdateEmailList = async () => {
      const response = await fetch(`http://3.94.210.5:3000/user/update`, {
        method: "PUT",
        body: JSON.stringify({
          id: id,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      const data = await response.json();
      if (data.error) {
        throw new Error("faild");
      }
      return data;
    };
    try {
      const data = await UpdateEmailList();
      // console.log(data);
      Dispatch(MailSliceAction.updataItems());
    } catch (error) {
      console.log(error);
    }
  };
};
//inbox mail delete
export const DeleteMail = (id, token) => {
  return async (Dispatch) => {
    // let emailId = localStorage.getItem("mailid").replace(/[&@.]/g, "");

    const DeletingMail = async () => {
      const response = await fetch(`http://3.94.210.5:3000/user/inbox`, {
        method: "DELETE",
        body: JSON.stringify({ id: id }),
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      const data = await response.json();
      if (data.error) {
        console.log(data);
        // throw new Error("faild");
      }
      return data;
    };
    try {
      const data = await DeletingMail();
      // console.log(data);
      Dispatch(MailSliceAction.DeleteItem());
    } catch (error) {
      console.log(error);
      // Dispatch(MailSliceAction.DeleteItem());
    }
  };
};

export const DeltesentItem = (id, token) => {
  return async (Dispatch) => {
    const DeleteItem = async () => {
      const response = await fetch(`http://3.94.210.5:3000/user/sentmail`, {
        method: "DELETE",
        body: JSON.stringify({ id: id }),
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      const data = await response.json();
      if (data.error) {
        throw new Error("faild");
      }
      return data;
    };
    try {
      const data = await DeleteItem();
      // console.log(data);
      Dispatch(MailSliceAction.DeleteItem());
      // Dispatch(MymailSliceAction.sendItemUpdateTrigge());
    } catch (error) {
      // console.log(error);
    }
  };
};

export const PostDraft = (Obj, token) => {
  return async (Dispatch) => {
    const PostDaftMail = async () => {
      const response = await fetch(`http://3.94.210.5:3000/user/draft`, {
        method: "POST",
        body: JSON.stringify(Obj),
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      const data = await response.json();
      if (data.error) {
        throw new Error("faild");
      }
      return data;
    };
    try {
      const data = await PostDaftMail();
      // console.log(data);

      Dispatch(MymailSliceAction.callgetDraft());
    } catch (error) {
      // console.log(error);
    }
  };
};

export const getDraft = (token) => {
  return async (Dispatch) => {
    const PostDaftMail = async () => {
      const response = await fetch(`http://3.94.210.5:3000/user/getdraft`, {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      const data = await response.json();
      if (data.error) {
        throw new Error("faild");
      }
      return data;
    };
    try {
      const items = await PostDaftMail();
      const transformeddata = [];

      for (const key in items) {
        const Obj = {
          id: key,
          ...items[key],
        };
        transformeddata.push(Obj);
      }
      // console.log("draftdata", transformeddata);
      Dispatch(MymailSliceAction.SetDraftDate(transformeddata));
    } catch (error) {
      console.log(error);
    }
  };
};

export const DeleteDraft = (id, token) => {
  return async (Dispatch) => {
    const PostDaftMail = async () => {
      const response = await fetch(`http://3.94.210.5:3000/user/deletedraft`, {
        method: "DELETE",
        body: JSON.stringify({ id: id }),
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      const data = await response.json();
      if (data.error) {
        throw new Error("faild");
      }
      return data;
    };
    try {
      const data = await PostDaftMail();
      // console.log(data);
      Dispatch(MymailSliceAction.callgetDraft());
    } catch (error) {
      // console.log(error);
    }
  };
};
