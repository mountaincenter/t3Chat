import React from "react";
import Clock from "./Clock";
import Today from "./Today";

const TimeDisplay: React.FC = () => {
  return (
    <div className="flex w-full flex-col items-center justify-between">
      <div className="flex flex-grow flex-col items-center justify-center">
        <Today />
        <Clock />
      </div>
    </div>
  );
};

export default TimeDisplay;
