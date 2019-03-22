import React, { useState } from "react";
import { NavBar, Card, WingBlank, WhiteSpace, Icon } from "antd-mobile";
import filterArrayFromString from "@/utils/filterArrayFromString";
const lockers = [
  {
    faculty: "Faculty of Engineering",
    imgSrc:
      "https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg",
    available: 12
  },
  {
    faculty: "Faculty of Arts",
    imgSrc:
      "https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg",
    available: 8
  },
  {
    faculty: "Faculty of Architecture",
    imgSrc:
      "https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg",
    available: 4
  },
  {
    faculty: "Faculty of Economy",
    imgSrc:
      "https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg",
    available: 24
  },
  {
    faculty: "Faculty of Arts",
    imgSrc:
      "https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg",
    available: 8
  },
  {
    faculty: "Faculty of Architecture",
    imgSrc:
      "https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg",
    available: 4
  },
  {
    faculty: "Faculty of Economy",
    imgSrc:
      "https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg",
    available: 24
  }
];

const Lockers = () => {
  const [searchValue, setSearchValue] = useState("");
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
        {filterArrayFromString(lockers, searchValue).map(
          ({ faculty, imgSrc, available }) => {
            return (
              <React.Fragment>
                <Card>
                  <Card.Header title={faculty} thumb={imgSrc} />
                  <Card.Body>
                    <div className="location-content">
                      <div> Building 2</div>
                      <div>Available: {available}</div>
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

export default Lockers;
