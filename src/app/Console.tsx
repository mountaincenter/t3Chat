"use client";

import React from "react";
import { useUserMutation } from "./hooks/useUserMutation";

const Console = () => {
  const { user, users } = useUserMutation();
  console.log("user", user);
  console.log("users", users);
  return <div>console test</div>;
};

export default Console;
