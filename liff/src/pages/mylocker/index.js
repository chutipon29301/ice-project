import React, { useEffect, useState } from "react";
import { WhiteSpace, NavBar } from "antd-mobile";
import { Row, Col } from "antd";
import LockerCard from "./components/LockerCard";
import { connect } from "react-redux";
import {
  fetchMyLockers,
  fetchSharedLockers,
  fetchUserProfile,
  removeLockerByID
} from "./ducks";
import Axios from "axios";

// const Alert = Modal.alert;
const MyLocker = ({
  history,
  fetchMyLockers,
  myLockersInstances,
  fetchSharedLockers,
  sharedLockersInstances,
  fetchUserProfile,
  userProfile,
  removeLockerByID
}) => {
  const [userCredit, setUserCredit] = useState(0);
  const fetchUserCreditUsage = async () => {
    try {
      const res = await Axios.get("/credit-usage/myCredit");
      setUserCredit(res.data.totalCredit);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  useEffect(() => {
    fetchUserProfile();
    fetchMyLockers();
    fetchSharedLockers();
    fetchUserCreditUsage();
    document.body.style.backgroundColor = "#EEF4FB";
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, [fetchMyLockers, fetchSharedLockers, fetchUserProfile]);
  return (
    <div className="bg-primary">
      <NavBar mode="dark"> Accessible Lockers</NavBar>
      <div style={{ backgroundColor: "#2979FF" }}>
        <Row type="flex" align="middle">
          <Col span={8} style={{ padding: 12 }}>
            <img
              src={userProfile.profileImage}
              alt="profile"
              style={{
                borderRadius: 100,
                width: "20vw",
                margin: "auto",
                display: "block"
              }}
            />
          </Col>
          <Col span={16} style={{ padding: 12, color: "white", fontSize: 14 }}>
            <p style={{ marginBottom: 2 }}>
              Full name:
              <span style={{ fontWeight: "bold" }}>
                {" "}
                {userProfile.firstName} {userProfile.lastName}{" "}
              </span>
            </p>
            <p style={{ marginBottom: 2 }}>
              Accessible lockers:{" "}
              <span style={{ fontWeight: "bold" }}>
                {" "}
                {myLockersInstances.length + sharedLockersInstances.length}{" "}
              </span>{" "}
            </p>
            <p style={{ marginBottom: 2 }}>
              Credits: {userCredit === null ? 0 : userCredit}
            </p>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                className="bg-success"
                style={{
                  marginTop: 2,
                  borderRadius: 4,
                  borderWidth: 0,
                  borderColor: "transparent",
                  display: "absolute",
                  right: 12
                }}
                onClick={() => history.push("/my-credit-history")}
              >
                {" "}
                Credit History{" "}
              </button>
            </div>
          </Col>
        </Row>
      </div>
      <WhiteSpace size="lg" />
      <div className="locker-container">
        <p> My Lockers </p>
        {myLockersInstances.length === 0 && (
          <p style={{ fontWeight: "normal" }}>
            {" "}
            There is no locker in your posession yet.
          </p>
        )}
      </div>
      {myLockersInstances.map(
        ({ canAccesses, lockerID, startTime, locker }) => (
          <React.Fragment key={lockerID}>
            <LockerCard
              navigateToLockerDetails={() =>
                history.push(`/my-locker/${lockerID}`)
              }
              lockerID={lockerID}
              location_description={locker.location.description}
              amountOfAccessibleUsers={canAccesses.length}
              imageURL={locker.location.imageURL}
              startTime={startTime}
              number={locker.number}
              isMine={true}
              removeLockerByID={removeLockerByID}
              fetchUserCreditUsage={fetchUserCreditUsage}
            />
            <WhiteSpace size="lg" />
          </React.Fragment>
        )
      )}

      <div className="locker-container">
        <p> Shared with me </p>
        {sharedLockersInstances.length === 0 && (
          <p style={{ fontWeight: "normal" }}>
            {" "}
            There is no locker shared with you yet.
          </p>
        )}
      </div>

      {sharedLockersInstances.map(
        ({ ownerUser, lockerID, startTime, locker }) => (
          <React.Fragment key={lockerID}>
            <LockerCard
              navigateToLockerDetails={() =>
                history.push(`/my-locker/${lockerID}`)
              }
              lockerID={lockerID}
              location_description={locker.location.description}
              amountOfAccessibleUsers={
                ownerUser.firstName + " " + ownerUser.lastName
              }
              profileImage={ownerUser.profileImage}
              number={locker.number}
              imageURL={locker.location.imageURL}
              startTime={startTime}
              isMine={false}
            />
            <WhiteSpace size="lg" />
          </React.Fragment>
        )
      )}
      <WhiteSpace size="lg" />
    </div>
  );
};

const mapStateToProps = state => ({
  myLockersInstances: state.lockerInstances.myLockersInstances,
  sharedLockersInstances: state.lockerInstances.sharedLockersInstances,
  userProfile: state.lockerInstances.userProfile
});

export default connect(
  mapStateToProps,
  { fetchMyLockers, fetchSharedLockers, fetchUserProfile, removeLockerByID }
)(MyLocker);
