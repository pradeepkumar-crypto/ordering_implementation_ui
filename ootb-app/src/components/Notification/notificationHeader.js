import React from "react";

export default function NotificationHeader({
  title,
  expand,
  setExpand,
  toggleDrawer,
  anchor,
}) {
  return (
    <div className="impact-notification-header">
      <div className="impact-notification-heading">{title}</div>
      <div className="impact-notification-header-action-btns">
        <button
          className={`impact-notification-header-expand-btn ${
            expand ? "collapse-icon" : "expand-icon"
          }`}
          onClick={() => setExpand(!expand)}
        />
        <span className="impact-notification-separator" />
        <button
          className="impact-notification-header-close-btn"
          onClick={toggleDrawer(anchor, false)}
        />
      </div>
    </div>
  );
}
