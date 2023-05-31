import { AuthsliceAction } from "./Auth";

const loginURL = "http://3.94.210.5:3000/auth/login";
// "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBHfDdJCB5KGcrwcnmpsK7V5Q8haFmqDGM";
const signupUrl = "http://3.94.210.5:3000/auth/signup";

export const sendsignup = (obj) => {
  return async (dispatch) => {
    const sendingAuth = async () => {
      const response = await fetch(signupUrl, {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (data.error) {
        alert(data.error.message);
        throw new Error(data.error.message);
      }
      alert("Signup successfull now login your account");
      return data;
    };
    try {
      const data = await sendingAuth();
      dispatch(AuthsliceAction.Login(data));
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const Sendlogin = (obj) => {
  return async (dispatch) => {
    const sendingloginAuth = async () => {
      const response = await fetch(loginURL, {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
          "Content-Type": "application/json",
        },
      });
      // console.log("send login testing");
      const data = await response.json();
      if (data.error) {
        alert(data.error.message);
        throw new Error(data.error.message);
      }

      return data;
    };
    try {
      const data = await sendingloginAuth();
      const id = await data.Token;

      localStorage.setItem("id", data.Token);
      localStorage.setItem("islogin", "true");
      localStorage.setItem("mailid", obj.email);

      //  console.log(id);
      dispatch(AuthsliceAction.Login(id));
    } catch (error) {
      console.log(error);
    }
  };
};
