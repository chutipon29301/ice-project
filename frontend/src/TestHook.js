import React, { useState } from "react";
import { Button } from "antd-mobile";

const TestHook = () => {
  const [count, setCount] = useState(0);
  return (
    <React.Fragment>
      <p> Count: {count} </p>
      <Button onClick={() => setCount(count + 1)}> Increment </Button>
    </React.Fragment>
  );
};

export default TestHook;
