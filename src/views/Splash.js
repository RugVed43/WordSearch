import React, { useState, useEffect } from "react";
import Home from "./Home";

// Importing loader
import PropagateLoader from "react-spinners/PropagateLoader";
// import ClockLoader from "react-spinners/ClockLoader";

const Spalsh = () => {
  // Loading state
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Wait for 3 seconds
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  // Custom css for loader
  const override = `
    margin: 0 auto;
    border-color: red;
  `;
  return isLoading ? (
    // If page is still loading then splash screen
    <div
      style={{
        display: "block",
        margin: "100px 0",
        textAlign: "center",
      }}
    >
      <PropagateLoader
        color={"#36D7B7"}
        isLoading={isLoading}
        css={override}
        size={20}
      />
    </div>
  ) : (
    <Home />
  );
};

export default Spalsh;
