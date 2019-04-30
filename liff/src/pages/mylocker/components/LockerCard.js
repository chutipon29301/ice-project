import React from "react";
import { Card, Icon } from "antd";
import { Modal } from "antd-mobile";
import Axios from "axios";

const Alert = Modal.alert;

const LockerCard = ({
  navigateToLockerDetails,
  location_description,
  lockerID,
  amountOfAccessibleUsers,
  imageURL,
  startTime,
  isMine,
  number,
  fetchUserCreditUsage,
  profileImage,
  removeLockerByID
}) => (
  <Card
    key={lockerID}
    style={{ width: "88vw", marginLeft: "6vw", marginRight: "6vw" }}
    actions={
      isMine
        ? [
            <button
              className="button default bg-danger"
              onClick={() =>
                Alert(
                  "Return Locker",
                  "Are you going to return " + location_description + " ?",
                  [
                    { text: "Cancel", onPress: () => console.log("cancel") },
                    {
                      text: "Ok",
                      onPress: async () => {
                        await Axios.post("/locker-instance/returnByID", {
                          lockerID
                        });
                        removeLockerByID(lockerID);
                        fetchUserCreditUsage();
                      }
                    }
                  ]
                )
              }
            >
              <Icon type="rollback" style={{ marginRight: 4 }} /> Return
            </button>,
            <button
              className="button default bg-success"
              onClick={async () =>
                Alert(
                  "Share Locker",
                  "Are you going to share " + location_description + " ?",
                  [
                    { text: "Cancel", onPress: () => console.log("cancel") },
                    {
                      text: "Ok",
                      onPress: async () => {
                        try {
                          const res = await Axios.get(
                            "/share-locker/generateLink/" + lockerID
                          );
                          window.location.href =
                            "line://msg/text/?" + res.data.link;
                        } catch (error) {
                          console.log(error);
                          throw error;
                        }
                      }
                    }
                  ]
                )
              }
            >
              {" "}
              <Icon type="usergroup-add" style={{ marginRight: 4 }} />
              Share
            </button>
          ]
        : null
    }
    cover={
      <div style={{ position: "relative" }}>
        <div className="card-tab-right" onClick={navigateToLockerDetails}>
          <Icon type="right" style={{ color: "white" }} />
        </div>
        <img
          src={imageURL}
          alt="example"
          style={{ maxHeight: "20vh", display: "block", margin: "auto" }}
        />
      </div>
    }
  >
    <div>
      <p className="card-titletext">
        <span className="is-bold"> {number}: </span>
        {location_description}
      </p>
      <p className="card-descriptiontext">{startTime}</p>
      {profileImage ? (
        <img
          src={profileImage}
          alt="profile"
          style={{ maxWidth: "8vw", borderRadius: 100 }}
        />
      ) : (
        <Icon type="user" style={{ color: "black", height: 4 }} />
      )}

      <span style={{ fontWeight: "bold", fontSize: 12 }}>
        {" "}
        : {amountOfAccessibleUsers}
      </span>
    </div>
  </Card>
);

export default LockerCard;

/* <Card
style={{ width: "88vw", marginLeft: "6vw", marginRight: "6vw" }}
cover={
  <div style={{ position: "relative" }}>
    <div
      className="card-tab-right"
      onClick={() => history.push("/my-locker/1")}
    >
      <Icon type="right" style={{ color: "white" }} />
    </div>
    <img
      alt="example"
      src={facultyOfEngineering}
      style={{ width: "100%" }}
    />
  </div>
}
actions={[
  <button
    className="button default bg-danger"
    onClick={() =>
      Alert(
        "Return Locker",
        "Are you going to return Locker 1, Building 2, Faculty of Engineering?",
        [
          { text: "Cancel", onPress: () => console.log("cancel") },
          { text: "Ok", onPress: () => console.log("Ok") }
        ]
      )
    }
  >
    <Icon type="rollback" style={{ marginRight: 4 }} /> Return
  </button>,
  <button
    className="button default bg-success"
    onClick={() =>
      Alert(
        "Share Locker",
        "Are you going to share Locker 1, Building 2, Faculty of Engineering?",
        [
          { text: "Cancel", onPress: () => console.log("cancel") },
          { text: "Ok", onPress: () => console.log("Ok") }
        ]
      )
    }
  >
    {" "}
    <Icon type="usergroup-add" style={{ marginRight: 4 }} />
    Share
  </button>
]}
>
<div>
  <p className="card-titletext">
    Locker 1, Building 2, Faculty of Engineering
  </p>
  <p className="card-descriptiontext">Deposited Since Feb 22, 10.01</p>
  <Icon type="user" style={{ color: "black", height: 4 }} />{" "}
  <span style={{ fontWeight: "bold", fontSize: 12 }}> : 2</span>
</div>
</Card> */
