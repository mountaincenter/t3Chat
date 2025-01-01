"use client";
import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { ja } from "date-fns/locale";

const Today = () => {
  const [today, setToday] = useState<string>("");
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const formattedDate = format(now, "yyyy年MM月dd日(EEE)", { locale: ja });
      setToday(formattedDate);
    }, 1000);
    return () => clearInterval(interval);
  });

  return <div className="text-6xl">{today}</div>;
};

export default Today;
