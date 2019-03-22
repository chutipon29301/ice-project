import React, { useState, useEffect } from "react";
import Axios from "axios";
import openedLocker from "@/assets/open-locker.png";
import closedLocker from "@/assets/close-locker.png";
import mockedQR from "@/assets/mock-qrcode.png";
import { Button } from "antd";
const MockLocker = () => {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(function() {
    setInterval(() => {
      Axios.get("/locker-status").then(res => setIsOpen(res.data.status));
    }, 2000);
  });
  return (
    <div
      style={{
        margin: "auto",
        maxWidth: 1100,
        backgroundColor: "white",
        padding: 12,
        marginTop: 12
      }}
    >
      <img
        src={mockedQR}
        alt="QRCode"
        style={{ margin: "auto", display: "block", marginTop: 24 }}
      />
      {isOpen ? (
        <img
          src={openedLocker}
          alt="open locker"
          style={{ margin: "auto", display: "block", marginTop: 24 }}
        />
      ) : (
        <img
          src={closedLocker}
          alt="close locker"
          style={{ margin: "auto", display: "block", marginTop: 24 }}
        />
      )}
      <div
        style={{
          display: "flex",
          marginTop: 24,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Button
          type="danger"
          onClick={() => {
            Axios.post("/close-locker").then(() => setIsOpen(false));
          }}
        >
          {" "}
          Close{" "}
        </Button>
      </div>
    </div>
  );
};

export default MockLocker;
