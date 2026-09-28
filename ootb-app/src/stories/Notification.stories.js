import React, { useState } from "react";
import { fn } from "@storybook/test";
import { Notification as NotificationWrapper } from "../components/Notification";
import { Button } from "../components/Button";

// importing mockData
import {
  mockBadgeLists,
  mockNotificationTabs,
  mockNotificationPanels,
} from "../components/Notification/mockData";

export default {
  title: "Patterns/Notification",
  component: NotificationWrapper,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "The Notification component delivers important messages and updates to users, ensuring effective communication and interaction within the application. It helps users stay informed about important events, changes, or actions that require their attention.",
      },
    },
  },
  argTypes: {
    isOpen: {
      description: "If true, open Notification component.",
      table: {
        defaultValue: { summary: false },
        type: { summary: "boolean" },
      },
    },
    title: {
      description:
        "Title of the Notification Component. <br/>Note:- Please Provide in Capitalize text.",
      table: {
        type: { summary: "string" },
      },
    },
    handleClose: {
      description: "Function to handle the event when Notification closes.",
      table: {
        defaultValue: { summary: "() => {}" },
        type: { summary: "function" },
      },
    },
    setIsOpen: {
      description:
        "Function to handle the event when Notification open/closes.",
      table: {
        defaultValue: { summary: "() => {}" },
        type: { summary: "function" },
      },
    },
    setNotificationPanels: {
      description: "Function to handle the event when Notification updates.",
      table: {
        defaultValue: { summary: "() => {}" },
        type: { summary: "function" },
      },
    },
    anchor: {
      description: "Direction by which Notification will open",
      options: ["left", "right"],
      control: { type: "radio" },
      table: {
        defaultValue: { summary: "right" },
        type: { summary: "string" },
      },
    },
    notificationTabs: {
      description: `It is array object which contains Tab Lists of the Notification. 
      <code>
        <ul class="storybook-order-list">
          <li><strong>label</strong>: Label of the Notification Tab. [string]</li>
          <li><strong>value</strong>: Unique value of the Notification Tab. [string]</li>
        </ul>
        </code>
      `,
      control: {
        type: "array", // Control type (text, boolean, select, etc.)
      },
      table: {
        defaultValue: { summary: "[]" },
        type: { summary: "Array Object" },
      },
    },
    badgesList: {
      description: `It is array object which contains badges List of the Notification Badges.
      <code>
        <ul class="storybook-order-list">
          <li><strong>id?</strong>: Unique Id of the Object. [string | number]</li>
          <li><strong>value</strong>: Unique value of the Object <br/> corresponding with Tab Names. [string]</li>
          <li><strong>notificationList</strong>: Array Object consisting of <br/> Badges details. [Array Object]</li>
          <ul class="storybook-order-child-list">
              <li><strong>label</strong>: Label of the Badges. [string]</li>
              <li><strong>numberOfTypes</strong>: Total number of <br/>Badge's type. [string]</li>
              <li><strong>handleClick?</strong>: Handle onClick function on <br/>the Badge.[(badge) => {}][function]</li>
            </ul>
        </ul>
        </code>
      `,
      control: {
        type: "array", // Control type (text, boolean, select, etc.)
      },
      table: {
        defaultValue: { summary: "[]" },
        type: { summary: "Array Object" },
      },
    },
    notificationPanels: {
      description: `It is array object which contains List of the Notification of different Tab Panels.
      <code>
        <ul class="storybook-order-list">
          <li><strong>id?</strong>: Unique Id of the Object. [string | number]</li>
          <li><strong>value</strong>: Unique value of the Object corresponding with <br/> Tab Names. [string]</li>
          <li><strong>handleSettingClick?</strong>: Handle onClick function on the <br/> Setting Button. [function]</li>
          <li><strong>notificationLists</strong>: Array Object consisting of content <br/> of the Notification.[Array Object]</li>
            <ul class="storybook-order-child-list">
              <li><strong>selected</strong>: If true, selects the <br/> Notification List's Item.[boolean]</li>
              <li><strong>status</strong>: Different state of the Notification <br/> List's Item.[string]["success"|"fail"|"pending"]</li>
              <li><strong>read</strong>: If true, mark notification Read.[boolean]</li>
              <li><strong>label</strong>: Label of the Notification list. <br/>[string]</li>
              <li><strong>date</strong>: Date of the Notification list. <br/>[Moment Object]</li>
              <li><strong>time</strong>: Time of the Notification list. <br/>[Moment Object]</li>
              <li><strong>description</strong>: Description of the Notification list. <br/>[string]</li>
              <li><strong>handleSelectChange</strong>: Handle onChange function <br/> of the Notification list. 
              <br/>[(event, type, notificationPanels, <br/> setNotificationPanels, list) => {}] <br/>[function]</li>
              <li><strong>handleMarkCompleted</strong>: Handle onClick function on the <br/> "Mark as completed" of the Notification list. 
              <br/>[(type, notificationPanels, <br/> setNotificationPanels, list) => {}]<br/>[function]</li>
              <li><strong>handleMoveToPending</strong>: Handle onClick function <br/>on the "Move to pending" of the Notification list. 
              <br/>[(type, notificationPanels, <br/> setNotificationPanels, list) => {}]<br/>[function]</li>
              <li><strong>handleMarkAsRead</strong>: Handle onClick function <br/> on the "Mark as read" of the Notification list.
              <br/>[(type, notificationPanels, <br/> setNotificationPanels, list) => {}]<br/>[function]</li>
              <li><strong>handleBookMark</strong>: Handle onClick function <br/>on the "BookMark Icon" of the Notification list.
              <br/>[(type, notificationPanels, <br/> setNotificationPanels, list) => {}]<br/>[function]</li>
              <li><strong>handleDeleteNotification</strong>: Handle onClick function <br/> on the "Delete Icon" of the Notification list.
              <br/>[(type, notificationPanels, <br/> setNotificationPanels, list) => {}]<br/>[function]</li>
              <li><strong>handleDownloadNotification</strong>: Handle onClick function <br/> on the "Download Icon" of the Notification list.
              <br/>[(type, notificationPanels, <br/> setNotificationPanels, list) => {}]<br/>[function]</li>
            </ul>
          </ul>
        </code>
      `,
      control: {
        type: "array", // Control type (text, boolean, select, etc.)
      },
      table: {
        defaultValue: { summary: "[]" },
        type: { summary: "Array Object" },
      },
    },
    primaryButtonLabel: {
      description:
        "Label of primary button, If not passed does not display primary button.",
      table: {
        defaultValue: { summary: "" },
        type: { summary: "string" },
      },
    },
    secondaryButtonLabel: {
      description:
        "Label of secondary button, If not passed does not display secondary button.",
      table: {
        defaultValue: { summary: "" },
        type: { summary: "string" },
      },
    },
    onPrimaryButtonClick: {
      description: "function to handle when user clicks on primary button",
      table: {
        defaultValue: { summary: "() => {}" },
        type: { summary: "function" },
      },
    },
    onSecondaryButtonClick: {
      description: "function to handle when user clicks on secondary button",
      table: {
        defaultValue: { summary: "() => {}" },
        type: { summary: "function" },
      },
    },
    onSettingButtonClick: {
      description: `function to handle when user clicks on <code>Setting & Help</code>`,
      table: {
        defaultValue: { summary: "() => {}" },
        type: { summary: "function" },
      },
    },
    handleSelectAll: {
      description: `function to handle when user clicks on <code>Select All</code>`,
      table: {
        defaultValue: { summary: "(type, notificationList) => {}" },
        type: { summary: "function" },
      },
    },
    handleMarkReadAll: {
      description: `function to handle when user clicks on <code>Mark all as read</code>`,
      table: {
        defaultValue: { summary: "(type, notificationList) => {}" },
        type: { summary: "function" },
      },
    },
    handleMoveAllPending: {
      description: `function to handle when user clicks on <code>Move to pending</code>`,
      table: {
        defaultValue: { summary: "(type, notificationList) => {}" },
        type: { summary: "function" },
      },
    },
    handleNotificationDeleteAll: {
      description: `function to handle when user clicks on <code>Delete Icon.</code>`,
      table: {
        defaultValue: { summary: "(type, notificationList) => {}" },
        type: { summary: "function" },
      },
    },
    moveToPendingDropdownOptions: {
      description: "Options for the Move to Pending dropdown.",
      table: {
        type: { summary: "array" },
        defaultValue: { summary: null },
      },
      control: {
        type: "object",
        handleTabChange: {
          description: `function to handle when user changes the notification tab`,
          table: {
            defaultValue: { summary: "() => {}" },
            type: { summary: "function" },
          },
        },
        activeNotiTab: {
          description: "holds the value of active notification tab",
          table: {
            type: { summary: "string" },
          },
        },
      },
      args: {
        setIsOpen: fn(),
        setNotificationPanels: fn(),
        handleClose: fn(),
        onPrimaryButtonClick: fn(),
        onSecondaryButtonClick: fn(),
        onSettingButtonClick: fn(),
        handleSelectAll: fn(),
        handleMarkReadAll: fn(),
        handleMoveAllPending: fn(),
        handleNotificationDeleteAll: fn(),
      },
    },
  },
};

const Notification = (args) => {
  const [open, setOpen] = useState(args.isOpen);
  const [notificationPanels, setNotificationPanels] = useState(
    args.notificationPanels,
  );

  return (
    <React.Fragment>
      <Button onClick={() => setOpen(!open)}>Click to open Notification</Button>
      <NotificationWrapper
        {...args}
        notificationPanels={notificationPanels}
        setNotificationPanels={setNotificationPanels}
        isOpen={open}
        setIsOpen={setOpen}
        handleClose={() => setOpen((prevOpen) => !prevOpen)}
        onSettingButtonClick={() =>
          console.log("onSettingButtonClick button clicked")
        }
        handleSelectAll={(type, notificationList) => {
          const updatedRes = notificationList.map((item) => {
            return {
              ...item,
              selected: true,
            };
          });

          const res = notificationPanels.map((item) => {
            if (item.value === type) {
              return {
                ...item,
                notificationList: updatedRes,
              };
            }
            return item;
          });
          setNotificationPanels([...res]);
        }}
        handleMarkReadAll={() =>
          console.log("handleMarkReadAll button clicked")
        }
        handleMoveAllPending={() =>
          console.log("handleMoveAllPending button clicked")
        }
        handleNotificationDelete={() =>
          console.log("handleNotificationDelete button clicked")
        }
      />
    </React.Fragment>
  );
};

export const Default = (args) => <Notification {...args} />;

Default.args = {
  title: "Notification",
  anchor: "right",
  isOpen: false,
  badgesList: mockBadgeLists,
  notificationTabs: mockNotificationTabs,
  notificationPanels: mockNotificationPanels,
  primaryButtonLabel: "Save",
  secondaryButtonLabel: "Clear all",
  moveToPendingDropdownOptions: [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
  ],
  activeNotiTab: "",
};
