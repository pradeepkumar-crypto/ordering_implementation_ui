import React from "react";

export default function FilterPanelHeader({ title, toggleDrawer }) {
  return (
    <div className="impact_drawer_filter_header">
      <div className="impact_drawer_filter_left_header">
        <span className="impact_drawer_filter_left_heading_icon"></span>
        <div className="impact_drawer_filter_left_heading">{title}</div>
      </div>
      <span
        role="button"
        className="close_icon"
        onClick={toggleDrawer}
        aria-label="Close filter panel"
      />
    </div>
  );
}
