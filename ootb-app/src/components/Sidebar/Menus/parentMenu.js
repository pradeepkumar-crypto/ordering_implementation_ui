import React from "react";
import { Tooltip } from "../../Tooltip";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { NavLink, MemoryRouter } from "react-router-dom";

export const ParentMenu = ({
  isOpen,
  setIsOpen,
  active,
  item,
  showChild,
  setShowChild,
  handleRouteChange,
  isMemoryRouter,
}) => {
  const handleClickOnRoute = (item) => {
    if (item.children && item.children.length > 0) {
      if (!isOpen) {
        setIsOpen(true);
      }
      if (showChild === item.value) {
        setShowChild(null);
      } else {
        setShowChild(item.value);
      }
    } else {
      handleRouteChange(item);
    }
  };

  if (isOpen) {
    return isMemoryRouter ? (
      <MemoryRouter>
        <NavLink
          to={item.link}
          className="impact-sidebar-routes-list-item-link"
        >
          <div
            key={item.value}
            className={`impact-sidebar-routes-list-item ${
              item.value === active && "route-active"
            } ${item.isDisabled && "route-disabled"}`}
            onClick={() => handleClickOnRoute(item)}
          >
            <div className="impact-sidebar-routes-list-item-icon">
              {item.icon}
            </div>
            <div className="impact-sidebar-routes-list-item-label">
              <span className="impact-sidebar-routes-list-item-label-text">
                {item.label}
              </span>
              {item.children && item.children.length > 0 ? (
                <div
                  className={`impact-sidebar-routes-list-item-children-indicator-horizontal ${
                    isOpen && showChild === item.value && "indicator-turn-up"
                  }`}
                  role="button"
                  //onClick={() => setDisplayChild(!displayChild)}
                >
                  <KeyboardArrowRightOutlinedIcon />
                </div>
              ) : null}
            </div>
          </div>
        </NavLink>
      </MemoryRouter>
    ) : (
      <div
        key={item.value}
        className={`impact-sidebar-routes-list-item ${
          item.value === active && "route-active"
        } ${item.isDisabled && "route-disabled"}`}
        onClick={() => handleClickOnRoute(item)}
      >
        <div className="impact-sidebar-routes-list-item-icon">{item.icon}</div>
        <div className="impact-sidebar-routes-list-item-label">
          <span className="impact-sidebar-routes-list-item-label-text">
            {item.label}
          </span>
          {item.children && item.children.length > 0 ? (
            <div
              className={`impact-sidebar-routes-list-item-children-indicator-horizontal ${
                isOpen && showChild === item.value && "indicator-turn-up"
              }`}
              role="button"
              //onClick={() => setDisplayChild(!displayChild)}
            >
              <KeyboardArrowRightOutlinedIcon />
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  return isMemoryRouter ? (
    <MemoryRouter>
      <Tooltip
        title={
          item.tooltip && item.tooltip.length > 0 ? item.tooltip : item.label
        }
        orientation="right"
        variant="tertiary"
      >
        <NavLink
          to={item.link}
          className="impact-sidebar-routes-list-item-link"
        >
          <div
            key={item.value}
            className={`impact-sidebar-routes-list-item ${
              item.value === active && "route-active"
            } ${item.isDisabled && "route-disabled"}`}
            onClick={() => handleClickOnRoute(item)}
          >
            <div className="impact-sidebar-routes-list-item-icon">
              {item.icon}
            </div>
            {item.children && item.children.length > 0 ? (
              <div
                className={`impact-sidebar-routes-list-item-children-indicator-horizontal ${
                  isOpen && showChild === item.value && "indicator-turn-up"
                }`}
                role="button"
                //onClick={() => setDisplayChild(!displayChild)}
              >
                <KeyboardArrowRightOutlinedIcon />
              </div>
            ) : null}
            <div className="impact-sidebar-routes-list-item-label">
              {item.label}
            </div>
          </div>
        </NavLink>
      </Tooltip>
    </MemoryRouter>
  ) : (
    <Tooltip
      title={
        item.tooltip && item.tooltip.length > 0 ? item.tooltip : item.label
      }
      orientation="right"
      variant="tertiary"
    >
      <div
        key={item.value}
        className={`impact-sidebar-routes-list-item ${
          item.value === active && "route-active"
        } ${item.isDisabled && "route-disabled"}`}
        onClick={() => handleClickOnRoute(item)}
      >
        <div className="impact-sidebar-routes-list-item-icon">{item.icon}</div>
        {item.children && item.children.length > 0 ? (
          <div
            className={`impact-sidebar-routes-list-item-children-indicator-horizontal ${
              isOpen && showChild === item.value && "indicator-turn-up"
            }`}
            role="button"
            //onClick={() => setDisplayChild(!displayChild)}
          >
            <KeyboardArrowRightOutlinedIcon />
          </div>
        ) : null}
        <div className="impact-sidebar-routes-list-item-label">
          {item.label}
        </div>
      </div>
    </Tooltip>
  );
};
