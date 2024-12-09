"use client";
import React from "react";
import { Button } from "@/components/ui/button";

const ButtonComponent = () => {
  return (
    <div>
      <Button variant="outline" onClick={() => console.log("clicked Button!")}>
        click me shadcn/ui
      </Button>
    </div>
  );
};

export default ButtonComponent;
