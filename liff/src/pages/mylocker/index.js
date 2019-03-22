import React from "react";
import { WhiteSpace, Modal, NavBar } from "antd-mobile";
import { Card, Icon, Row, Col } from "antd";
import facultyOfEngineering from "../../assets/facultyOfEngineeringSign.jpeg";
import Goku from "../../assets/goku.jpg";

const Alert = Modal.alert;
const MyLocker = () => {
  return (
    <div className="bg-primary">
      <NavBar mode="dark"> My Locker </NavBar>
      <div style={{ backgroundColor: "#2979FF" }}>
        <Row type="flex" align="middle">
          <Col span={8} style={{ padding: 12 }}>
            {" "}
            <img
              src={Goku}
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
              Username:
              <span style={{ fontWeight: "bold" }}> ttaaii13492 </span>
            </p>
            <p style={{ marginBottom: 2 }}>
              Email:
              <span style={{ fontWeight: "bold" }}>
                {" "}
                Tai.t_13492@hotmail.com
              </span>
            </p>
            <p style={{ marginBottom: 2 }}>
              My Lockers: <span style={{ fontWeight: "bold" }}> 2 </span>{" "}
            </p>
          </Col>
        </Row>
      </div>
      <WhiteSpace size="lg" />
      <Card
        style={{ width: "88vw", marginLeft: "6vw", marginRight: "6vw" }}
        cover={<img alt="example" src={facultyOfEngineering} />}
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
            {" "}
            <Icon type="rollback" style={{ marginRight: 4 }} /> Return{" "}
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
          <span style={{ fontWeight: "bold", fontSize: 12 }}> : 1</span>
        </div>
      </Card>
      <WhiteSpace size="lg" />
      <Card
        style={{ width: "88vw", marginLeft: "6vw", marginRight: "6vw" }}
        cover={<img alt="example" src={facultyOfEngineering} />}
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
            {" "}
            <Icon type="rollback" style={{ marginRight: 4 }} /> Return{" "}
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
          <span style={{ fontWeight: "bold", fontSize: 12 }}> : 1</span>
        </div>
      </Card>
      <WhiteSpace size="lg" />
    </div>
  );
};

export default MyLocker;
