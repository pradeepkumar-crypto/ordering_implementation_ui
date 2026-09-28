import React, { useState, useCallback, useEffect } from "react";
import { Button } from "../../../Button";
import { Checkbox } from "../../../Checkbox";
import moment from "moment";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import NotificationBookmark from "../../../../assets/notification-bookmark.svg";
import NotificationRead from "../../../../assets/notification-read.svg";
import { Select } from "../../../Select";
import { Badge } from "../../../Badge";
import { ReactComponent as FilledBookmark } from "../../../../assets/bookMarkedFill.svg";
import { Loader } from "../../../Loader";
export default function NotificationList({
  expand,
  title,
  type,
  notificationList,
  notificationPanels,
  setNotificationPanels,
  handleSelectAll,
  handleMarkReadAll,
  handleMoveAllPending,
  handleNotificationDeleteAll,
  moveToPendingDropdownOptions,
  showNotificationListLoader,
  showBadgeLoader,
}) {
  const [open, setOpen] = useState(false);
  const [currentOptions, setCurrentOptions] = useState(
    moveToPendingDropdownOptions,
  );
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    setCurrentOptions(moveToPendingDropdownOptions);
  }, [moveToPendingDropdownOptions]);

  return (
    <div className="impact-notification-list-container">
      <div className="impact-notification-list-header">
        {showBadgeLoader ? (
          <div className="impact-notification-list-title-loader">
            <Loader showSkeleton={true} size="small" />
          </div>
        ) : (
          <div className="impact-notification-list-title">{title}</div>
        )}
        {showNotificationListLoader ? (
          <div className="impact-notification-list-action-btns-loader">
            <Loader showSkeleton={true} size="small" />
          </div>
        ) : (
          <div className="impact-notification-list-action-btns">
            {handleSelectAll && (
              <Button
                onClick={() => handleSelectAll(type, notificationList)}
                size="small"
                variant="url"
              >
                Select All
                {/* {notificationList.filter((item) => item.selected === false)
                .length > 0
                ? ""
                : "Deselect All"} */}
              </Button>
            )}
            {handleMarkReadAll && (
              <React.Fragment>
                <span className="impact-notification-separator" />
                <Button
                  onClick={() => handleMarkReadAll(type, notificationList)}
                  size="small"
                  variant="url"
                >
                  Mark all as read
                </Button>
              </React.Fragment>
            )}
            {handleMoveAllPending && (
              <React.Fragment>
                <span className="impact-notification-separator" />
                {moveToPendingDropdownOptions ? (
                  <React.Fragment>
                    <p style={{ fontSize: "12px" }}>Move to</p>
                    <Select
                      name="name"
                      isClearable
                      isOpen={open}
                      setIsOpen={setOpen}
                      currentOptions={currentOptions}
                      setCurrentOptions={setCurrentOptions}
                      initialOptions={moveToPendingDropdownOptions}
                      setSelectedOptions={setSelectedOptions}
                      handleChange={(selectedOption) =>
                        handleMoveAllPending(
                          type,
                          notificationList.filter((item) => item.selected),
                          selectedOption,
                        )
                      }
                      minWidth={"140px"}
                      isDisabled={
                        notificationList.filter((item) => item.selected)
                          .length === 0
                      }
                    />
                  </React.Fragment>
                ) : (
                  <Button
                    onClick={() =>
                      handleMoveAllPending(
                        type,
                        notificationList.filter((item) => item.selected),
                      )
                    }
                    size="small"
                    variant="url"
                    disabled={
                      notificationList.filter((item) => item.selected)
                        .length === 0
                    }
                  >
                    Move to pending
                  </Button>
                )}
              </React.Fragment>
            )}
            {handleNotificationDeleteAll && (
              <React.Fragment>
                <span className="impact-notification-separator" />
                <Button
                  onClick={() =>
                    handleNotificationDeleteAll(
                      type,
                      notificationList.filter((item) => item.selected),
                    )
                  }
                  size="medium"
                  variant="text"
                  icon={<DeleteOutlineOutlinedIcon />}
                  disabled={
                    notificationList.filter((item) => item.selected).length ===
                    0
                  }
                />
              </React.Fragment>
            )}
          </div>
        )}
      </div>
      {showNotificationListLoader ? (
        <div className="impact-notification-list-loader-container">
          <Loader showSkeleton={true} size="large" />
        </div>
      ) : (
        <div
          className="impact-notification-list-items-container"
          style={{
            height: expand ? "calc(100% - 230px)" : "calc(100% - 280px)",
          }}
        >
          {notificationList.map((list, index) => {
            return (
              <NotificationListItem
                key={list.id || index}
                list={list}
                type={type}
                notificationPanels={notificationPanels}
                setNotificationPanels={setNotificationPanels}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

const NotificationListItem = ({
  list,
  type,
  notificationPanels,
  setNotificationPanels,
}) => {
  const [showMore, setShowMore] = useState(false);

  const getStatus = (status) => {
    switch (status) {
      case "success":
        return "status-success";
      case "fail":
        return "status-fail";
      case "pending":
        return "status-pending";
      default:
        return "status-success";
    }
  };

  const handleSelectChange = useCallback(
    (e) => {
      e.stopPropagation();
      e.preventDefault();
      list.handleSelectChange(
        type,
        notificationPanels,
        setNotificationPanels,
        list,
      );
    },
    [type, notificationPanels, setNotificationPanels, list],
  );

  return (
    <div
      className={`impact-notification-list-item ${
        list.selected ? "list-item-selected" : ""
      } ${!list.read ? "list-item-read" : ""}`}
      onClick={(e) => {
        // Define interactive elements that should not trigger selection
        const interactiveElements = [
          "a", // anchor tags
          "button", // buttons
          "input", // input fields
          '[role="button"]', // elements with button role
          ".nav-link", // NavLink components
          "[data-clickable]", // custom clickable elements
        ];

        const isInteractive = interactiveElements.some(
          (selector) =>
            e.target.matches(selector) || e.target.closest(selector),
        );

        if (
          !e.target.closest(".impact-notification-list-item-checkbox") &&
          !isInteractive
        ) {
          handleSelectChange(e);
        }
      }}
    >
      {list.checkBoxClick && (
        <div className="impact-notification-list-item-checkbox">
          <Checkbox
            checked={list.selected}
            onChange={(e) => {
              e.stopPropagation();
              list.checkBoxClick(
                type,
                notificationPanels,
                setNotificationPanels,
                list,
              );
            }}
            variant="default"
          />
        </div>
      )}
      <div
        className={`impact-notification-list-item-icon ${getStatus(
          list.status,
        )}`}
      >
        <div className="impact-notification-list-item-icon-line" />
      </div>
      <div className="impact-notification-list-item-container">
        <div className="impact-notification-list-item-header">
          <div className="impact-notification-list-item-header-left">
            <div className="impact-notification-list-item-title">
              {list.label}
            </div>
            {(list?.showOverdueIcon || list?.showFastApproachingIcon) && (
              <span className="impact-notification-separator" />
            )}
            {list?.showNOverdueIcon && (
              <img src={NotificationRead} alt="notification-read" />
            )}
            {list?.showFastApproachingIcon && (
              <img src={NotificationBookmark} alt="notification-bookmark" />
            )}
          </div>
          <div className="impact-notification-list-item-header-right">
            {list.handleDeleteNotification && (
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  list.handleDeleteNotification(
                    type,
                    notificationPanels,
                    setNotificationPanels,
                    list,
                  );
                }}
                size="small"
                variant="text"
                icon={<DeleteOutlineOutlinedIcon />}
              />
            )}
            {(list.handleBookMark || list.showBookMark) && (
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  list.handleBookMark(
                    type,
                    notificationPanels,
                    setNotificationPanels,
                    list,
                  );
                }}
                size="small"
                variant="text"
                icon={
                  list.bookMarked ? (
                    <FilledBookmark />
                  ) : (
                    <BookmarkBorderOutlinedIcon />
                  )
                }
                disabled={list.showBookMark}
                className={`${
                  list.bookMarked
                    ? "impact-notification-list-item-bookmark-btn"
                    : ""
                }`}
              />
            )}
            {list.handleDownloadNotification && (
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  list.handleDownloadNotification(
                    type,
                    notificationPanels,
                    setNotificationPanels,
                    list,
                  );
                }}
                size="small"
                variant="text"
                icon={<FileDownloadOutlinedIcon />}
              />
            )}
          </div>
        </div>
        <div className="impact-notification-list-item-schedule">
          <div className="impact-notification-list-item-date">
            {moment(list.date).format("DD/MM/YYYY")}
          </div>
          <div className="impact-notification-list-item-separator">-</div>
          <div className="impact-notification-list-item-date">
            {moment(list.time).format("h:mm:ss a")}
          </div>
          {list.bookMarked && (
            <Badge
              icon={<BookmarkBorderOutlinedIcon />}
              isIcon={true}
              label={"Bookmarked"}
              variant="subtle"
              color="info"
              size="small"
            />
          )}
        </div>
        {list.description.length > 150 ? (
          <div className="impact-notification-list-item-description">
            <div
              dangerouslySetInnerHTML={{
                __html: list.description.slice(0, 150),
              }}
            />
            {list.description.length > 150 && showMore ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: list.description.slice(150),
                }}
              />
            ) : null}
            {"... "}
            <span role="button" onClick={() => setShowMore((prev) => !prev)}>
              {showMore ? "Read Less" : "Read More"}
            </span>
          </div>
        ) : (
          <div
            className="impact-notification-list-item-description"
            dangerouslySetInnerHTML={{ __html: list.description }}
          />
        )}
        <div className="impact-notification-list-item-action-btns">
          {list.handleMarkCompleted && (
            <Button
              variant="secondary"
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                list.handleMarkCompleted(
                  type,
                  notificationPanels,
                  setNotificationPanels,
                  list,
                );
              }}
            >
              Mark as completed
            </Button>
          )}
          {list.handleMoveToPending && (
            <Button
              variant="text"
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                list.handleMoveToPending(
                  type,
                  notificationPanels,
                  setNotificationPanels,
                  list,
                );
              }}
            >
              {list.moveToPendingText
                ? list.moveToPendingText
                : "Move to pending"}
            </Button>
          )}
          {list.handleMarkAsRead && (
            <Button
              variant="url"
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                list.handleMarkAsRead(
                  type,
                  notificationPanels,
                  setNotificationPanels,
                  list,
                );
              }}
            >
              {!list.read ? "Mark as read" : "Mark as unread"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
