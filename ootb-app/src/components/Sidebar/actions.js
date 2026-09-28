import React from "react";
import { Tooltip } from "../Tooltip";
import LogOutIcon from "../../assets/logout-icon.svg";

export default function Actions({ open, handleLogOut }) {
  if (open) {
    return (
      <div
        className="impact-sidebar-actions-list-item logout-container"
        role="button"
        onClick={handleLogOut}
      >
        <img className="logout-container-img" src={LogOutIcon} />
        <div className="impact-sidebar-actions-list-item-label">Logout</div>
      </div>
    );
  }

  return (
    <Tooltip title="Logout" orientation="right" variant="tertiary">
      <div
        className="impact-sidebar-actions-list-item logout-container"
        role="button"
        onClick={handleLogOut}
      >
        <img className="logout-container-img" src={LogOutIcon} />
        <div className="impact-sidebar-actions-list-item-label">Logout</div>
      </div>
    </Tooltip>
  );
}
