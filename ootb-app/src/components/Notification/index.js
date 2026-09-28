import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import NotificationHeader from "./notificationHeader";
import NotificationBody from "./NotificationBody";
import NotificationFooter from "./notificationFooter";
import "./Notification.styles.scss";

// importing mockData
import {
  mockBadgeLists,
  mockNotificationTabs,
  mockNotificationPanels,
} from "./mockData";

export const Notification = ({
  title,
  anchor = "right",
  isOpen,
  setIsOpen,
  className,
  handleClose,
  secondaryButtonLabel,
  onSecondaryButtonClick,
  primaryButtonLabel,
  onPrimaryButtonClick,
  onSettingButtonClick,
  // taskListBadges,
  // taskNotificationList,
  // infoListBadges,
  // infoNotificationList,
  handleSelectAll,
  handleMarkReadAll,
  handleMoveAllPending,
  handleNotificationDeleteAll,
  badgesList,
  notificationTabs = mockNotificationTabs,
  notificationPanels = mockNotificationPanels,
  setNotificationPanels,
  handleTabChange = () => {},
  moveToPendingDropdownOptions,
  activeNotiTab,
  activeBadge,
  showBadgeLoader,
  showNotificationListLoader,
}) => {
  const [expand, setExpand] = useState(false);
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
  return (
    <Drawer anchor={anchor} open={isOpen} onClose={toggleDrawer(anchor, false)}>
      <div
        className={`impact-notification-container ${
          expand && "impact-notification-container-expand"
        } ${className}`}
      >
        <NotificationHeader
          title={title}
          expand={expand}
          setExpand={setExpand}
          toggleDrawer={toggleDrawer}
          anchor={anchor}
          showBadgeLoader={showBadgeLoader}
        />
        <NotificationBody
          expand={!primaryButtonLabel && !secondaryButtonLabel}
          onSettingButtonClick={onSettingButtonClick}
          badgesList={badgesList}
          notificationTabs={notificationTabs}
          notificationPanels={notificationPanels}
          setNotificationPanels={setNotificationPanels}
          // taskListBadges={taskListBadges}
          // taskNotificationList={taskNotificationList}
          // infoListBadges={infoListBadges}
          // infoNotificationList={infoNotificationList}
          handleSelectAll={handleSelectAll}
          handleMarkReadAll={handleMarkReadAll}
          handleMoveAllPending={handleMoveAllPending}
          handleNotificationDeleteAll={handleNotificationDeleteAll}
          handleTabChange={handleTabChange}
          moveToPendingDropdownOptions={moveToPendingDropdownOptions}
          activeNotiTab={activeNotiTab}
          activeBadge={activeBadge}
          showBadgeLoader={showBadgeLoader}
          showNotificationListLoader={showNotificationListLoader}
        />
        <NotificationFooter
          secondaryButtonLabel={secondaryButtonLabel}
          onSecondaryButtonClick={onSecondaryButtonClick}
          primaryButtonLabel={primaryButtonLabel}
          onPrimaryButtonClick={onPrimaryButtonClick}
        />
      </div>
    </Drawer>
  );
};
