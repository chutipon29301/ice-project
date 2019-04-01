import React, { useState } from "react";
import { NavBar, InputItem, WhiteSpace } from "antd-mobile";
import Swarm from "../../assets/swarm.png";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Axios from "axios";

const Registration = ({ idToken }) => {
  const [nationalID, setNationalID] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  if (idToken === "") {
    return <Redirect to="/" />;
  }
  const onSubmit = async function() {
    const res = await Axios.post("/user/register", {
      nationalID,
      firstName,
      lastName,
      phone,
      authenticationID: idToken
    });
    console.log(res);
  };
  return (
    <div className="bg-primary" style={{ height: "100vh" }}>
      <NavBar mode="dark"> Registration </NavBar>
      <WhiteSpace />
      <img
        src={Swarm}
        alt="eiei"
        style={{
          width: "50%",
          margin: "auto",
          display: "block",
          marginBottom: 12
        }}
      />
      <InputItem
        placeholder="National ID"
        value={nationalID}
        onChange={e => setNationalID(e)}
      >
        National ID
      </InputItem>
      <WhiteSpace />
      <InputItem
        placeholder="First Name"
        value={firstName}
        onChange={e => setFirstName(e)}
      >
        First Name
      </InputItem>
      <WhiteSpace />
      <InputItem
        placeholder="Last Name"
        value={lastName}
        onChange={e => setLastName(e)}
      >
        Last Name
      </InputItem>
      <WhiteSpace />
      <InputItem placeholder="Phone" value={phone} onChange={e => setPhone(e)}>
        Phone
      </InputItem>
      <div
        style={{
          display: "flex",
          justifyContent: "center"
        }}
      >
        <button
          className="button default bg-success"
          style={{ marginTop: 24 }}
          onClick={() => onSubmit()}
        >
          Register
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  idToken: state.authentication.idToken
});
export default connect(mapStateToProps)(Registration);
