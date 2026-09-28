import React, { useState } from "react";
import { Tabs } from "../../Tabs";
import { Button } from "../../Button";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import NotificationPanels from "./NotificationPanels";
import NotificationInfoList from "./NotificationInfoList";

export default function NotificationBody({
  expand,
  badgesList,
  notificationTabs,
  notificationPanels,
  setNotificationPanels,
  onSettingButtonClick,
  handleSelectAll,
  handleMarkReadAll,
  handleMoveAllPending,
  handleNotificationDeleteAll,
  handleTabChange,
  moveToPendingDropdownOptions,
  activeNotiTab,
  activeBadge,
  showBadgeLoader,
  showNotificationListLoader,
}) {
  const [activeTab, setActiveTab] = useState(notificationTabs[0].value);
  const panels = notificationPanels.map((item) => {
    return (
      <NotificationPanels
        key={item.value}
        expand={expand}
        type={item.value}
        listTypes={
          badgesList?.filter((list) => list?.value === item?.value)[0]?.lists ||
          []
        }
        notificationPanels={notificationPanels}
        setNotificationPanels={setNotificationPanels}
        notificationList={item.notificationList}
        handleSettingClick={item.handleSettingClick}
        filterChip={item.filterChip}
        selectedFilterChip={item.selectedFilterChip}
        handleSelectAll={handleSelectAll}
        handleMarkReadAll={handleMarkReadAll}
        handleMoveAllPending={handleMoveAllPending}
        moveToPendingDropdownOptions={moveToPendingDropdownOptions}
        handleNotificationDeleteAll={handleNotificationDeleteAll}
        activeBadge={activeBadge}
        handleApplyFilter={item.handleApplyFilter}
        isMultiSelectFilter={item.isMultiSelectFilter}
        showBadgeLoader={showBadgeLoader}
        showNotificationListLoader={showNotificationListLoader}
      />
    );
  });

  const onChangeTab = (event, val) => {
    handleTabChange(val);
    setActiveTab(val);
  };

  return (
    <div
      className={`impact-notification-body-container ${
        expand ? "notification-body-container-full" : ""
      }`}
    >
      <div
        className={`impact-notification-body-header-container ${
          expand ? "body-header-container-full" : ""
        }`}
      >
        <Tabs
          value={activeNotiTab || activeTab}
          onChange={onChangeTab}
          tabNames={notificationTabs}
          tabPanels={panels}
        />
        {onSettingButtonClick && (
          <React.Fragment>
            <span className="impact-notification-separator" />
            <Button
              variant="text"
              size="medium"
              icon={<SettingsOutlinedIcon />}
              onClick={onSettingButtonClick}
            >
              Setting & Help
            </Button>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}
