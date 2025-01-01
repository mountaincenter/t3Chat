"use client";

import React, { useState, useEffect } from "react";
import { format } from "date-fns";

const Clock = () => {
  const [time, setTime] = useState("");
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const formattedTime = format(now, "HH:mm:ss");

      setTime(formattedTime);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return <div className="text-9xl">{time}</div>;
};

export default Clock;
