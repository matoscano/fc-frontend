import React from "react"
import Rectangle from "../index"

export default {
  title: "UI/Rectangle",
  component: Rectangle,
}

export const defaultRectangle = () => (
  <div style={{ padding: "30px" }}>
    <Rectangle>
      <div>Rectangle content</div>
    </Rectangle>
  </div>
)
