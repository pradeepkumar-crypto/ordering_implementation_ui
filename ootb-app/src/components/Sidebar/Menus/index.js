import React, { useState } from "react";
import { ParentMenu } from "./parentMenu";
import { ChildMenu } from "./childMenu";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";

export default function Menus({
  isOpen,
  setIsOpen,
  routes,
  parentActive,
  handleParentRouteChange,
  childActive,
  handleChildRouteChange,
  isMemoryRouter,
}) {
  const visibleMenu = routes.slice(0, 6);
  const hiddenMenu = routes.slice(6);
  const [showChild, setShowChild] = useState("");
  const [showHiddenMenu, setShowHiddenMenu] = useState(false);
  return (
    <div className="impact-sidebar-routes-list">
      {visibleMenu.map((item) => {
        return (
          <React.Fragment key={item.value}>
            <MenuConfig
              showItem
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              showChild={showChild}
              setShowChild={setShowChild}
              item={item}
              parentActive={parentActive}
              childActive={childActive}
              handleParentRouteChange={handleParentRouteChange}
              handleChildRouteChange={handleChildRouteChange}
              isMemoryRouter={isMemoryRouter}
            />
          </React.Fragment>
        );
      })}
      {hiddenMenu && hiddenMenu.length > 0 ? (
        <React.Fragment>
          <div
            className={`impact-sidebar-routes-hidden-list-icon ${
              showHiddenMenu ? "show-hidden-menu-icon" : ""
            }`}
            onClick={() => setShowHiddenMenu(!showHiddenMenu)}
          >
            <KeyboardArrowDownOutlinedIcon />{" "}
            <span>View {showHiddenMenu ? "Less" : "More"}</span>
          </div>
          {/* <div
            className={`impact-sidebar-routes-hidden-list ${
              showHiddenMenu ? "show-hidden-menu" : ""
            }`}
          ></div> */}
          {hiddenMenu.map((item) => {
            return (
              <React.Fragment key={item.value}>
                <MenuConfig
                  showItem={showHiddenMenu}
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  showChild={showChild}
                  setShowChild={setShowChild}
                  item={item}
                  parentActive={parentActive}
                  childActive={childActive}
                  handleParentRouteChange={handleParentRouteChange}
                  handleChildRouteChange={handleChildRouteChange}
                  isMemoryRouter={isMemoryRouter}
                />
              </React.Fragment>
            );
          })}
        </React.Fragment>
      ) : null}
    </div>
  );
}

const MenuConfig = ({
  showItem,
  isOpen,
  setIsOpen,
  childActive,
  parentActive,
  item,
  showChild,
  setShowChild,
  handleParentRouteChange,
  handleChildRouteChange,
  isMemoryRouter,
}) => {
  if (showItem) {
    return (
      <React.Fragment>
        <ParentMenu
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          active={parentActive}
          item={item}
          showChild={showChild}
          setShowChild={setShowChild}
          handleRouteChange={handleParentRouteChange}
          isMemoryRouter={isMemoryRouter}
        />
        {item.children && item.children.length > 0 ? (
          <ChildMenu
            parent={item}
            active={childActive}
            menu={item.children}
            showChild={showChild}
            handleRouteChange={handleChildRouteChange}
            isMemoryRouter={isMemoryRouter}
          />
        ) : null}
      </React.Fragment>
    );
  }

  return null;
};
