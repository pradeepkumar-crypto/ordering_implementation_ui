import React, { useEffect, useRef } from "react";
import Menus from "./Menus";
import Actions from "./actions";
import HamburgerOpen from "../../assets/hamburger-close.svg"; //
import HamburgerClose from "../../assets/collapse-icon.svg";
import "./Sidebar.styles.scss";

export const Sidebar = ({
  isOpen,
  setIsOpen,
  handleClose,
  routes,
  actionRoutes,
  parentActive,
  handleParentRouteChange,
  childActive,
  handleChildRouteChange,
  handleLogOut,
  isCloseWhenClickOutside = true,
  isMemoryRouter = true,
}) => {
  const sidebarRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        isCloseWhenClickOutside
      ) {
        if (isOpen) {
          handleClose();
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, isCloseWhenClickOutside, handleClose, setIsOpen, isOpen]);
  return (
    <nav
      ref={sidebarRef}
      className={`impact-sidebar-container ${isOpen ? "sidebar-open" : ""}`}
    >
      <div
        className="impact-sidebar-toggle-btns"
        role="button"
        onClick={handleClose}
      >
        <img src={isOpen ? HamburgerClose : HamburgerOpen} />
      </div>
      <Menus
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        routes={routes}
        parentActive={parentActive}
        handleParentRouteChange={handleParentRouteChange}
        childActive={childActive}
        handleChildRouteChange={handleChildRouteChange}
        isMemoryRouter={isMemoryRouter}
      />
      <div className="impact-sidebar-actions-container">
        {actionRoutes && actionRoutes.length > 0 ? (
          <Menus
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            routes={actionRoutes}
            parentActive={parentActive}
            handleParentRouteChange={handleParentRouteChange}
            childActive={childActive}
            handleChildRouteChange={handleChildRouteChange}
            isMemoryRouter={isMemoryRouter}
          />
        ) : null}
        <Actions open={isOpen} handleLogOut={handleLogOut} />
      </div>
    </nav>
  );
};
