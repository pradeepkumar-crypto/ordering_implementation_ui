import React, { useRef, useEffect, useLayoutEffect } from "react";
import { NavLink, MemoryRouter } from "react-router-dom";
export const ChildMenu = ({
  parent,
  active,
  menu,
  showChild,
  handleRouteChange,
  isMemoryRouter,
}) => {
  const containerRef = useRef(null);

  const updateBeforeHeight = () => {
    const container = containerRef.current;
    if (container) {
      const contentHeight = container.scrollHeight; // Get full scrollable content height
      container.style.setProperty("--before-height", `${contentHeight}px`); // Set custom CSS variable
    }
  };

  useLayoutEffect(() => {
    // Call the function initially
    updateBeforeHeight();

    // Update on window resize
    window.addEventListener("resize", updateBeforeHeight);

    // Cleanup event listener when component unmounts
    return () => {
      window.removeEventListener("resize", updateBeforeHeight);
    };
  }, []); // Empty dependency array ensures this runs once on mount

  useEffect(() => {
    // Update height when menu items change
    updateBeforeHeight();
  }, [menu]); // Dependency array ensures this runs when menu changes

  return (
    <div
      className={`impact-sidebar-routes-list-children ${
        showChild === parent.value && "child-route-visible"
      }`}
      ref={containerRef}
    >
      {menu.map((child) => {
        return isMemoryRouter ? (
          <MemoryRouter>
            <NavLink
              to={child.link}
              className="impact-sidebar-routes-list-item-link"
            >
              <div
                key={child.value}
                className={`impact-sidebar-routes-list-item-children ${
                  child.value === active && "child-route-active"
                } ${child.isDisabled && "child-route-disabled"}`}
                onClick={() => handleRouteChange(parent, child)}
              >
                <div className="impact-sidebar-routes-list-item-child-icon">
                  {child.icon}
                </div>
                <div className="impact-sidebar-routes-list-item-child-label">
                  {child.label}
                </div>
              </div>
            </NavLink>
          </MemoryRouter>
        ) : (
          <div
            key={child.value}
            className={`impact-sidebar-routes-list-item-children ${
              child.value === active && "child-route-active"
            } ${child.isDisabled && "child-route-disabled"}`}
            onClick={() => handleRouteChange(parent, child)}
          >
            <div className="impact-sidebar-routes-list-item-child-icon">
              {child.icon}
            </div>
            <div className="impact-sidebar-routes-list-item-child-label">
              {child.label}
            </div>
          </div>
        );
      })}
    </div>
  );
};
