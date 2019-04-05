import React, { useEffect } from "react";
import facultyOfEngineering from "../../assets/facultyOfEngineeringSign.jpeg";
import { Icon, Timeline } from "antd";
import { Modal } from "antd-mobile";
const prompt = Modal.prompt;

const LockerDetails = ({ history }) => {
  useEffect(() => {
    document.body.style.backgroundColor = "#E1EDFF";
    return () => {
      document.body.style.backgroundColor = "";
    };
  });
  const reportProblem = () => {
    prompt("Report Problem", "Please input your problem", [
      { text: "Cancel" },
      {
        text: "Submit",
        onPress: value =>
          new Promise(resolve => {
            console.log(value);
            resolve();
          })
      }
    ]);
  };
  return (
    <div className="locker-details">
      <div style={{ position: "relative" }}>
        <div className="card-tab-left" onClick={() => history.push("/")}>
          <Icon type="left" style={{ color: "white" }} />
        </div>
        <img
          src={facultyOfEngineering}
          style={{ width: "100vw" }}
          alt="faculty"
        />
      </div>
      <p className="bg-dark-primary p-12 is-white is-bold text-center mb-0">
        {" "}
        Locker 1, Building 2, Faculty of Engineering{" "}
      </p>
      <div
        style={{
          position: "relative",
          padding: 16,
          height: "100%"
        }}
      >
        <div style={{ position: "absolute", top: 16, right: 16 }}>
          <Icon type="phone" style={{ color: "black" }} />
        </div>
        <p>
          <Icon type="user" /> : 2
        </p>
        <p>
          Deposited Since: <span className="is-bold"> Feb 22, 10:01 </span>
        </p>
        <p>
          Last opened: <span className="is-bold"> Feb 22, 12:23 </span>
        </p>
        <p>
          {" "}
          Overdue Charging: <span className="is-bold"> 0 Baht </span>{" "}
        </p>
        <p> History: </p>
        <div style={{ padding: "0px 12px", fontSize: 14 }}>
          <Timeline>
            <Timeline.Item>12:23: Opened by Tai</Timeline.Item>
            <Timeline.Item>11:20: Share Access by Tai</Timeline.Item>
            <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
            <Timeline.Item>10:40: Opened by owner</Timeline.Item>
          </Timeline>
        </div>
        <div className="center-only-child">
          <button className="report" onClick={() => reportProblem()}>
            {" "}
            Report Problems{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LockerDetails;
