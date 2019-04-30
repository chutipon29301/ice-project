import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import Axios from "axios";
import { connect } from "react-redux";

const confirm = Modal.confirm;

async function showConfirm(accessCode, history) {
  confirm({
    title: "Do you want to have access to your friend's locker?",
    async onOk() {
      try {
        const res = await Axios.post("/share-locker/addUserPermission", {
          accessCode
        });
        history.push("/my-locker");
        console.log(res);
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  });
}
const ShareLockerLanding = ({ history, liffData }) => {
  const [accessCode, setAccessCode] = useState("");
  useEffect(() => {
    const location = window.location.href;
    const indexOfEqual = location.indexOf("=");
    if (indexOfEqual !== -1) {
      const code = location.substring(indexOfEqual + 1);
      setAccessCode(code);
      showConfirm(code, history);
    }
  }, [history]);
  console.log(accessCode, "accessCode");
  return <h1> Sharing Locker ....</h1>;
};

const mapStateToProps = state => ({
  liffData: state.liff.data
});

export default connect(mapStateToProps)(ShareLockerLanding);
