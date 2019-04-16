import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import Axios from "axios";

const confirm = Modal.confirm;

async function showConfirm(accessCode, history) {
  confirm({
    title: "Do you want to have access to your friend's locker?",
    async onOk() {
      try {
        await Axios.post("/share-locker/addUserPermission", { accessCode });
        history.push("/");
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  });
}
const ShareLockerLanding = ({ history }) => {
  const [accessCode, setAccessCode] = useState("");
  useEffect(() => {
    const location = window.location.href;
    const indexOfEqual = location.indexOf("=");
    if (indexOfEqual !== -1) {
      const code = location.substring(indexOfEqual + 1);
      setAccessCode(code);
      showConfirm(accessCode, history);
    }
  });

  return <h1> Loading ...</h1>;
};

export default ShareLockerLanding;
