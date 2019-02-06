import React, { useState } from "react";
import QrReader from "react-qr-reader";

const Deposit = () => {
  const [{ result, delay }, setQRCode] = useState({ result: "", delay: 300 });
  return (
    <div>
      <h1> This is deposit </h1>{" "}
      <div style={{ width: 250, height: 250 }}>
        <QrReader
          delay={delay}
          onError={err => console.log(err)}
          onScan={data => {
            setQRCode({ result: data, delay: 300 });
          }}
        />
      </div>
      <p> {result}</p>
    </div>
  );
};

export default Deposit;
