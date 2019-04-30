import React, { useState, useEffect } from "react";
import { Icon, NavBar } from "antd-mobile";
import { Timeline } from "antd";
import Axios from "axios";

const CreditHistory = ({ history }) => {
  const [creditHistory, setCreditHistory] = useState([]);
  useEffect(() => {
    const fetchCreditHistory = async () => {
      try {
        const res = await Axios.get("/user/creditHistory");
        setCreditHistory(res.data.creditUsages);
      } catch (error) {
        console.log(error);
        throw error;
      }
    };
    fetchCreditHistory();
  }, []);
  return (
    <div className="locker-details">
      <NavBar
        mode="dark"
        icon={<Icon type="left" onClick={() => history.push("/my-locker")} />}
      >
        Credit History
      </NavBar>
      {creditHistory.length === 0 && (
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
      <div
        style={{
          marginTop: 24,
          padding: "0px 12px",
          fontSize: 14,
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Timeline>
          {creditHistory.length > 10
            ? creditHistory
                .slice(Math.max(creditHistory.length - 10, 1))
                .map(({ date, amount }, idx) => {
                  const strDate = "" + new Date(Date.parse(date));
                  const prettierDate = strDate.substring(
                    0,
                    strDate.indexOf("GMT")
                  );
                  return (
                    <Timeline.Item key={idx}>
                      <span className="is-bold">
                        {amount} at {prettierDate}
                      </span>
                    </Timeline.Item>
                  );
                })
            : creditHistory.map(({ date, amount }, idx) => {
                const strDate = "" + new Date(Date.parse(date));
                const prettierDate = strDate.substring(
                  0,
                  strDate.indexOf("GMT")
                );
                return (
                  <Timeline.Item key={idx}>
                    <span className="is-bold">
                      {amount} at {prettierDate}
                    </span>
                  </Timeline.Item>
                );
              })}
        </Timeline>
      </div>
    </div>
  );
};

export default CreditHistory;
