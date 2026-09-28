import React from "react";
import { Tooltip } from "../Tooltip";

export default function PanelSidebar({ filters, active, setActive }) {
  return (
    <div className="impact_drawer_filter_container_left_panel">
      <div className="impact_drawer_filter_left_filters_tabs">
        {filters.map((item, index) => {
          return (
            <SidebarItems
              key={index}
              item={item}
              active={active}
              setActive={setActive}
            />
          );
        })}
      </div>
    </div>
  );
}

const SidebarItems = ({ item, active, setActive }) => {
  if (item.type === "separator") {
    return <div className="impact-drawer-filter-separator" />;
  }

  if (item.title.length > 13) {
    return (
      <Tooltip title={item.title} orientation="left" variant="tertiary">
        <div
          className={`impact_drawer_filter_tab ${
            active == item.value ? "filter_tab_active" : ""
          }`}
          role="button"
          onClick={() => setActive(item.value)}
        >
          <div className="impact_drawer_filter_tab_icon">{item.icon}</div>
          <div className="impact_drawer_filter_tab_label">
            <span>
              {item.title.slice(0, 13)}
              {item.title.length > 13 ? "..." : ""}
            </span>
            {item.required && (
              <span className="impact_drawer_filter_tab_label-required">*</span>
            )}
          </div>
          {typeof item.numberOfFilter === "number" && (
            <div className="impact_drawer_filter_tab_badges">
              {item.numberOfFilter}
            </div>
          )}
        </div>
      </Tooltip>
    );
  }

  return (
    <div
      className={`impact_drawer_filter_tab ${
        active == item.value ? "filter_tab_active" : ""
      }`}
      role="button"
      onClick={() => setActive(item.value)}
    >
      <div className="impact_drawer_filter_tab_icon">{item.icon}</div>
      <div className="impact_drawer_filter_tab_label">
        <span>{item.title}</span>
        {item.required && (
          <span className="impact_drawer_filter_tab_label-required">*</span>
        )}
      </div>
      {typeof item.numberOfFilter === "number" && (
        <div className="impact_drawer_filter_tab_badges">
          {item.numberOfFilter}
        </div>
      )}
    </div>
  );
};
