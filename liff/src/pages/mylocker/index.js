import React, { useEffect } from "react";
import { WhiteSpace, NavBar } from "antd-mobile";
import { Row, Col } from "antd";
import LockerCard from "./components/LockerCard";
import { connect } from "react-redux";
import { fetchMyLockers, fetchSharedLockers, fetchUserProfile } from "./ducks";

// const Alert = Modal.alert;
const MyLocker = ({
  history,
  fetchMyLockers,
  myLockersInstances,
  fetchSharedLockers,
  sharedLockersInstances,
  fetchUserProfile,
  userProfile
}) => {
  useEffect(() => {
    fetchUserProfile();
    fetchMyLockers();
    fetchSharedLockers();
    document.body.style.backgroundColor = "#EEF4FB";
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);
  return (
    <div className="bg-primary">
      <NavBar mode="dark"> Accessible Lockers </NavBar>
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
  { fetchMyLockers, fetchSharedLockers, fetchUserProfile }
)(MyLocker);
