import React, { useState } from "react";
import { Avatar } from "../Avatar";
import { Menu } from "../Menu";
// import ImpactLogo from "../../assets/impact-logo.png";
// import ImpactLogoHD from "../../assets/IA logo-19.svg";
import ImpactLogoHD2 from "../../assets/logoHD.svg";
import MessageIcon from "../../assets/message-icon.svg";
import HelpIcon from "../../assets/help-icon.svg";
import NotificationIcon from "../../assets/bell.svg";
import NotificationDNDIcon from "../../assets/notification-dnd.svg";
import ChatBotIcon from "../../assets/chatbot-icon.svg";
// import DndIcon from "../../assets/dnd.svg";
import MessageIconDisabled from "../../assets/message-icon-disabled.svg";
import "./Header.styles.scss";

export function Header({
  title,
  userName,
  handleLogoClick,
  showNotificationIcon = true,
  notificationIndicator = true,
  handleNotificationClick,
  showHelpIcon = true,
  handleHelpClick,
  showMessageIcon = true,
  handleMessageClick,
  showChatBotIcon = true,
  handleChatBotClick,
  isMessageIconDisabled = false,
  isNotificationDnd = false,
  dropMenuOptions = [
    {
      label: userName,
      onClick: () => {},
    },
  ],
  isChatBotDisabled = false,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  return (
    <div className="impact-header-container">
      <div className="impact-header-container-left-side">
        <div
          className="impact-header-logo"
          role="button"
          onClick={handleLogoClick}
        >
          <img src={ImpactLogoHD2} width="100%" height="100%" />
        </div>
        <div className="impact-header-separator" />
        <div className="impact-header-title">{title}</div>
      </div>
      <div className="impact-header-container-right-side">
        {showHelpIcon ? (
          <div
            className="impact-header-help-container"
            role="button"
            onClick={handleHelpClick}
          >
            <img src={HelpIcon} width="100%" height="100%" />
          </div>
        ) : null}
        {isMessageIconDisabled ? (
          showMessageIcon ? (
            <div
              className="impact-header-message-container"
              role="button"
              //onClick={handleMessageClick}
            >
              <img src={MessageIconDisabled} width="100%" height="100%" />
            </div>
          ) : null
        ) : showMessageIcon ? (
          <div
            className="impact-header-message-container"
            role="button"
            onClick={handleMessageClick}
          >
            <img src={MessageIcon} width="100%" height="100%" />
          </div>
        ) : null}
        {isNotificationDnd ? (
          showNotificationIcon ? (
            <div
              className="impact-header-notification-container"
              role="button"
              onClick={handleNotificationClick}
            >
              <img src={NotificationDNDIcon} width="100%" height="100%" />
            </div>
          ) : null
        ) : showNotificationIcon ? (
          <div
            className="impact-header-notification-container"
            role="button"
            onClick={handleNotificationClick}
          >
            <img src={NotificationIcon} width="100%" height="100%" />
            {notificationIndicator && (
              <div className="impact-header-notification-indicator-container">
                <div className="impact-header-notification-indicator-outer-circle" />
                <div className="impact-header-notification-indicator-inner-circle" />
              </div>
            )}
          </div>
        ) : null}
        {showChatBotIcon ? (
          <div
            className={`impact-header-bot-container ${
              isChatBotDisabled ? "impact-header-bot-container-disabled" : ""
            }`}
            role="button"
            onClick={handleChatBotClick}
            disabled={isChatBotDisabled}
          >
            <span className="impact-header-bot-container-text">Ask Alan</span>
          </div>
        ) : null}
        <div
          className="impact-header-avatar"
          onClick={(event) => setAnchorEl(event.currentTarget)}
        >
          <Avatar label={userName} size="small" type="withoutPicture" />
        </div>
        {dropMenuOptions && dropMenuOptions.length > 0 && (
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={() => setAnchorEl(null)}
            options={dropMenuOptions}
          />
        )}
      </div>
    </div>
  );
}
