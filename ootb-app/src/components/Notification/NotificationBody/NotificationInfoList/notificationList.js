import React, { useState } from "react";
import { Button } from "../../../Button";
import { Checkbox } from "../../../Checkbox";
import moment from "moment";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import NotificationBookmark from "../../../../assets/notification-bookmark.svg";
import NotificationRead from "../../../../assets/notification-read.svg";

export default function NotificationList({
  expand,
  title,
  notificationList,
  handleSelectAll,
  handleMarkReadAll,
  handleMoveAllPending,
  handleNotificationDeleteAll,
}) {
  return (
    <div className="impact-notification-list-container">
      <div className="impact-notification-list-header">
        <div className="impact-notification-list-title">{title}</div>
        <div className="impact-notification-list-action-btns">
          <Button
            onClick={() => handleSelectAll("info-list", listItem)}
            size="small"
            variant="url"
          >
            Select All
          </Button>
          <span className="impact-notification-separator" />
          <Button
            onClick={() => handleMarkReadAll("info-list", listItem)}
            size="small"
            variant="url"
          >
            Mark all as read
          </Button>
          <span className="impact-notification-separator" />
          <Button
            onClick={() => handleMoveAllPending("info-list", listItem)}
            size="small"
            variant="url"
          >
            Move to pending
          </Button>
          <span className="impact-notification-separator" />
          <Button
            onClick={() => handleNotificationDeleteAll("info-list", listItem)}
            size="medium"
            variant="text"
            icon={<DeleteOutlineOutlinedIcon />}
          />
        </div>
      </div>
      <div
        className="impact-notification-list-items-container"
        style={{
          height: expand ? "calc(100% - 230px)" : "calc(100% - 280px)",
        }}
      >
        {notificationList.map((list, index) => {
          return <NotificationListItem key={index} list={list} />;
        })}
      </div>
    </div>
  );
}

const NotificationListItem = ({ list }) => {
  const [showMore, setShowMore] = useState(false);
  return (
    <div
      className={`impact-notification-list-item ${
        list.selected ? "list-item-selected" : ""
      }`}
    >
      <div className="impact-notification-list-item-checkbox">
        <Checkbox
          checked={list.selected}
          onChange={(event) => list.handleSelectChange(event, list)}
          variant="default"
        />
      </div>
      <div className="impact-notification-list-item-icon">
        <div className="impact-notification-list-item-icon-line" />
      </div>
      <div className="impact-notification-list-item-container">
        <div className="impact-notification-list-item-header">
          <div className="impact-notification-list-item-header-left">
            <div className="impact-notification-list-item-title">
              {list.label}
            </div>
            <span className="impact-notification-separator" />
            <img src={NotificationRead} alt="notification-read" />
            <img src={NotificationBookmark} alt="notification-bookmark" />
          </div>
          <div className="impact-notification-list-item-header-right">
            <Button
              onClick={() => list.handleDeleteNotification(list)}
              size="medium"
              variant="text"
              icon={<DeleteOutlineOutlinedIcon />}
            />
            <Button
              onClick={() => list.handleBookMark(list)}
              size="medium"
              variant="text"
              icon={<BookmarkBorderOutlinedIcon />}
            />
            <Button
              onClick={() => list.handleDownloadNotification(list)}
              size="medium"
              variant="text"
              icon={<FileDownloadOutlinedIcon />}
            />
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
        </div>
        <div className="impact-notification-list-item-description">
          {list.description.slice(0, 150)}
          {list.description.length > 150 && showMore
            ? list.description.slice(150)
            : ""}
          {"..."}
          <span role="button" onClick={() => setShowMore((prev) => !prev)}>
            {showMore ? "Read Less" : "Read More"}
          </span>{" "}
        </div>
        <div className="impact-notification-list-item-action-btns">
          <Button
            variant="secondary"
            size="small"
            onClick={() => list.handleMarkCompleted(list)}
          >
            Mark as completed
          </Button>
          <Button
            variant="text"
            size="small"
            onClick={() => list.handleMoveToPending(list)}
          >
            Move to pending
          </Button>
          <Button
            variant="url"
            size="small"
            onClick={() => list.handleMarkAsRead(list)}
          >
            Mark as read
          </Button>
        </div>
      </div>
    </div>
  );
};
