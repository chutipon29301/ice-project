import React, { useState, useEffect } from "react";
import Axios from "axios";
import { NavBar, Card, WingBlank, WhiteSpace, Icon } from "antd-mobile";
import filterArrayFromString from "@/utils/filterArrayFromString";
import { geolocated } from "react-geolocated";

const Lockers = ({ isGeolocationAvailable, isGeolocationEnabled, coords }) => {
  const [searchValue, setSearchValue] = useState("");
  const [locations, setLocations] = useState([]);
  useEffect(() => {
    let lat = null;
    let lng = null;
    if (isGeolocationAvailable && isGeolocationEnabled && coords) {
      lat = coords.latitude;
      lng = coords.longitude;
      Axios.get(`/location/emptyLockerCount?lat=${lat}&lng=${lng}`).then(
        res => {
          setLocations(res.data.locations);
        }
      );
    } else {
      Axios.get(`/location/emptyLockerCount`).then(res => {
        setLocations(res.data.locations);
      });
    }
    document.body.style.backgroundColor = "#EEF4FB";
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, [coords, isGeolocationAvailable, isGeolocationEnabled]);
  return (
    <div className="bg-primary">
      <NavBar mode="dark"> Find Lockers </NavBar>
      <WingBlank size="lg">
        <WhiteSpace size="lg" />
        <div className="search-bar-container">
          <Icon type="search" color="#C2B9B9" />
          <input
            type="text"
            className="input"
            placeholder="Search"
            style={{ marginLeft: 2 }}
            onChange={e => setSearchValue(e.target.value)}
          />
        </div>
        <WhiteSpace size="lg" />
        {locations.length === 0 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <div className="lds-roller">
              <div />
              <div />
              <div />
              <div />
              <div />
              <div />
              <div />
              <div />
            </div>
          </div>
        )}
        {filterArrayFromString(locations, searchValue).map(
          ({ description, totalLocker, inUsedLocker }, idx) => {
            return (
              <React.Fragment key={idx}>
                <Card>
                  <Card.Header title={description} />
                  <Card.Body>
                    <div className="location-content">
                      <div>
                        Available:{" "}
                        {parseInt(totalLocker) - parseInt(inUsedLocker)}
                      </div>
                    </div>
                  </Card.Body>
                </Card>
                <WhiteSpace size="lg" />
              </React.Fragment>
            );
          }
        )}
      </WingBlank>
    </div>
  );
};

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false
  },
  userDecisionTimeout: 10000
})(Lockers);
