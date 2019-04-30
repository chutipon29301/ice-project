import React, { useState, useEffect } from "react";
import { Icon, Timeline } from "antd";
import { NavBar, Modal } from "antd-mobile";
import { connect } from "react-redux";
import Axios from "axios";
const prompt = Modal.prompt;

const LockerDetails = ({
  match,
  history,
  myLockersInstances,
  sharedLockersInstances
}) => {
  const [lockerDetails, setLockerDetails] = useState({});
  const [lockerHistory, setLockerHistory] = useState([]);

  useEffect(() => {
    const getLockerInstanceHistory = async () => {
      const res = await Axios.get(
        "/locker-instance/history/" + match.params.id
      );
      setLockerHistory(res.data.lockerUsages);
    };
    const index = myLockersInstances.findIndex(lockerInstance => {
      return parseInt(match.params.id) === parseInt(lockerInstance.lockerID);
    });
    if (index === -1) {
      const indexOfSharedLocker = sharedLockersInstances.findIndex(
        lockerInstance => {
          return (
            parseInt(match.params.id) === parseInt(lockerInstance.lockerID)
          );
        }
      );
      setLockerDetails(sharedLockersInstances[indexOfSharedLocker]);
    } else {
      setLockerDetails(myLockersInstances[index]);
    }

    getLockerInstanceHistory();
    document.body.style.backgroundColor = "#E1EDFF";
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, [match.params.id, myLockersInstances, sharedLockersInstances]);
  const reportProblem = () => {
    prompt("Report Problem", "Please input your problem", [
      { text: "Cancel" },
      {
        text: "Submit",
        onPress: async value => {
          const res = await Axios.post("/report", {
            message: value,
            lockerID: match.params.id
          });
          console.log(res, "Submitted");
        }
      }
    ]);
  };
  return (
    <div className="locker-details">
      <NavBar
        mode="dark"
        icon={<Icon type="left" onClick={() => history.push("/my-locker")} />}
      >
        Find Lockers
      </NavBar>
      <div style={{ position: "relative" }}>
        <img
          src={lockerDetails.locker && lockerDetails.locker.location.imageURL}
          style={{ width: "100vw" }}
          alt="faculty"
        />
      </div>
      <p className="bg-dark-primary p-12 is-white is-bold text-center mb-0">
        {lockerDetails.locker && lockerDetails.locker.location.description}
      </p>
      <div
        style={{
          position: "relative",
          padding: 16,
          height: "100%"
        }}
      >
        {/* <div style={{ position: "absolute", top: 16, right: 16 }}>
          <Icon type="phone" style={{ color: "black" }} />
        </div> */}
        <p>
          Deposited Since:{" "}
          <span className="is-bold"> {lockerDetails.startTime} </span>
        </p>
        <p> Accessible by: </p>
        {lockerDetails.canAccesses &&
          lockerDetails.canAccesses.map((user, index) => (
            <p key={index}>
              <span className="is-bold">
                {user.accessibleUser.firstName} {user.accessibleUser.lastName}
              </span>
            </p>
          ))}
        <p> History: </p>
        <div style={{ padding: "0px 12px", fontSize: 14 }}>
          <Timeline>
            {lockerHistory.map(
              ({ timeStamp, user, actionType }, idx) =>
                actionType === "OPEN" && (
                  <Timeline.Item key={idx}>
                    <span className="is-bold">
                      {timeStamp} Opened by {user.firstName}
                    </span>
                  </Timeline.Item>
                )
            )}
            {/* <Timeline.Item>
              {" "}
              <span className="is-bold"> 12:23: Opened by Tai </span>
            </Timeline.Item>
            <Timeline.Item>
              {" "}
              <span className="is-bold"> 10:40: Opened by Jatuwat </span>
            </Timeline.Item> */}
          </Timeline>
        </div>
        <div className="center-only-child">
          <button className="report" onClick={() => reportProblem()}>
            Report Problems
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  myLockersInstances: state.lockerInstances.myLockersInstances,
  sharedLockersInstances: state.lockerInstances.sharedLockersInstances
});

export default connect(mapStateToProps)(LockerDetails);
