import React from "react";
import Card from "../index";

export default {
  title: "UI/Card",
  component: Card,
};

export const defaultCard = () => (
  <div style={{ padding: "30px" }}>
    <Card>
      <div>Card content</div>
    </Card>
  </div>
);
