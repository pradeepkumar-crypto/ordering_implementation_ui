import React from "react";
import Drawer from "@mui/material/Drawer";
import PanelSidebar from "./PanelSidebar";
import FilterPanelHeader from "./FilterPanelHeader";
import PanelFooter from "./PanelFooter";
import "./FilterPanel.styles.scss";

export function FilterPanel({
  className,
  title,
  size,
  anchor = "right",
  isOpen,
  setIsOpen,
  active,
  setActive,
  filters,
  handleClose,
  primaryButtonLabel,
  onPrimaryButtonClick,
  secondaryButtonLabel,
  onSecondaryButtonClick,
  tertiaryButtonLabel,
  onTertiaryButtonClick,
  quaternaryButtonLabel,
  onQuaternaryButtonClick,
  primaryButtonProps,
  secondaryButtonProps,
  tertiaryButtonProps,
  quaternaryButtonProps,
  alwaysRender = false,
}) {
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    if (handleClose) {
      handleClose();
    } else {
      setIsOpen(!isOpen);
    }
  };

  const getSize = (size) => {
    switch (size) {
      case "medium":
        return "impact_drawer_filter_container_medium";
      default:
        return "impact_drawer_filter_container_large";
    }
  };

  let children = filters.filter((item) => item.value === active);

  if (!tertiaryButtonLabel && !secondaryButtonLabel && !primaryButtonLabel) {
    return (
      <Drawer
        anchor={anchor}
        open={isOpen}
        onClose={toggleDrawer(anchor, false)}
      >
        <div
          className={`impact_drawer_filter_container ${getSize(
            size
          )} ${className}`}
        >
          <FilterPanelHeader
            title={title}
            toggleDrawer={toggleDrawer(anchor, false)}
          />
          <div className="impact-drawer-filter-main-container">
            <PanelSidebar
              filters={filters}
              active={active}
              setActive={setActive}
            />
            <div className="impact_drawer_filter_container_right_panel">
              <div className="impact_drawer_filter_body impact_drawer_filter_footer_no_buttons">
                {children[0].children}
              </div>
            </div>
          </div>
        </div>
      </Drawer>
    );
  }

  return (
    <Drawer anchor={anchor} open={isOpen} onClose={toggleDrawer(anchor, false)}>
      <div
        className={`impact_drawer_filter_container ${getSize(
          size
        )} ${className}`}
      >
        <FilterPanelHeader
          title={title}
          toggleDrawer={toggleDrawer(anchor, false)}
        />
        <div className="impact-drawer-filter-main-container">
          <PanelSidebar
            filters={filters}
            active={active}
            setActive={setActive}
          />
          <div className="impact_drawer_filter_container_right_panel">
            {alwaysRender ? (
              filters.map((item) => {
                return (
                  <div
                    className="impact_drawer_filter_body"
                    key={item.id}
                    style={{
                      display: item.value === active ? "block" : "none",
                    }}
                  >
                    {item.children}
                  </div>
                );
              })
            ) : (
              <div className="impact_drawer_filter_body">
                {children[0].children}
              </div>
            )}
            <PanelFooter
              quaternaryButtonLabel={quaternaryButtonLabel}
              onQuaternaryButtonClick={onQuaternaryButtonClick}
              tertiaryButtonLabel={tertiaryButtonLabel}
              onTertiaryButtonClick={onTertiaryButtonClick}
              secondaryButtonLabel={secondaryButtonLabel}
              onSecondaryButtonClick={onSecondaryButtonClick}
              primaryButtonLabel={primaryButtonLabel}
              onPrimaryButtonClick={onPrimaryButtonClick}
              primaryButtonProps={primaryButtonProps}
              secondaryButtonProps={secondaryButtonProps}
              tertiaryButtonProps={tertiaryButtonProps}
              quaternaryButtonProps={quaternaryButtonProps}
            />
          </div>
        </div>
      </div>
    </Drawer>
  );
}
