import React, { useState, useEffect } from "react";
import QrReader from "react-qr-reader";
import { Modal } from "antd";
import { NavBar } from "antd-mobile";
import Axios from "axios";

const Deposit = () => {
  const [{ result, delay }, setQRCode] = useState({ result: "", delay: 300 });
  const [showModal, setModal] = useState(false);

  useEffect(() => {
    document.body.style.backgroundColor = "rgba(0,0,0,0.5)";
    return function cleanup() {
      document.body.style.backgroundColor = "";
    };
  });

  const afterScan = function(data) {
    if (data === null) return;
    setQRCode({ result: data, delay: 300 });
    setModal(true);
  };
  return (
    <div>
      <NavBar mode="dark">Open Locker</NavBar>
      <Modal
        visible={showModal}
        maskClosable={true}
        centered={true}
        onCancel={() => {
          setModal(false);
        }}
        onOk={() => {
          Axios.post("/open-locker").then(() => {
            setModal(false);
            window.location.replace("https://line.me/R/ti/p/f4TRdbATay");
          });
        }}
      >
        {result}
      </Modal>
      <div style={{ height: "15vh" }} />
      <QrReader
        delay={delay}
        onError={err => console.log(err)}
        onScan={data => {
          afterScan(data);
        }}
      />
      <p
        style={{
          marginTop: 24,
          color: "white",
          padding: 24,
          fontSize: "1.1em",
          marginLeft: "auto",
          marginRight: "auto"
        }}
      >
        Line up the QR code to scan it with your device's camera.
      </p>
    </div>
  );
};

export default Deposit;
