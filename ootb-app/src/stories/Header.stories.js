import React from "react";
import { fn } from "@storybook/test";
import { Header } from "../components/Header";

export default {
  title: "Patterns/Header",
  component: Header,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A header component is a section that typically includes the product's title, logo, or name. It can also include other information, such as a description of the product's purpose, contact information, or the name of the organization that created it.",
      },
    },
  },
  argTypes: {
    title: {
      description:
        "Title or product name. Note:- Please Provide in Capitalize text.",
      table: {
        type: { summary: "string" },
      },
    },
    userName: {
      description: "Log In user name",
      table: {
        type: { summary: "string" },
      },
    },
    showNotificationIcon: {
      description: "If true, display a Notification Icon.",
      table: {
        defaultValue: { summary: true },
        type: { summary: "boolean" },
      },
    },
    notificationIndicator: {
      description: "If true, display a indicator on Notification Icon.",
      table: {
        defaultValue: { summary: true },
        type: { summary: "boolean" },
      },
    },
    isNotificationDnd: {
      description: "If true, display a dnd icon on Notification Icon.",
      table: {
        defaultValue: { summary: false },
        type: { summary: "boolean" },
      },
    },
    showHelpIcon: {
      description: "If true, display a Help Icon.",
      table: {
        defaultValue: { summary: true },
        type: { summary: "boolean" },
      },
    },
    showMessageIcon: {
      description: "If true, display a Message Icon.",
      table: {
        defaultValue: { summary: true },
        type: { summary: "boolean" },
      },
    },
    showChatBotIcon: {
      description: "If true, display a ChatBot Icon.",
      table: {
        defaultValue: { summary: true },
        type: { summary: "boolean" },
      },
    },
    isMessageIconDisabled: {
      description: "If true, disables Message Icon.",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
    },
    isChatBotDisabled: {
      description: "If true, disables ChatBot Icon.",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
    },
    // userImage: {
    //   description:
    //     "If provided, display User Image Avatar instead of Log In user name.",
    //   table: {
    //     type: { summary: "string" },
    //   },
    // },
    handleLogoClick: {
      description: "Function handle event when clicked on Logo icon.",
      table: {
        defaultValue: { summary: "() => {}" },
        type: { summary: "function" },
      },
    },
    handleNotificationClick: {
      description: "Function handle event when clicked on Notification icon.",
      table: {
        defaultValue: { summary: "() => {}" },
        type: { summary: "function" },
      },
    },
    handleHelpClick: {
      description: "Function handle event when clicked on Help icon.",
      table: {
        defaultValue: { summary: "() => {}" },
        type: { summary: "function" },
      },
    },
    handleMessageClick: {
      description: "Function handle event when clicked on Message icon.",
      table: {
        defaultValue: { summary: "() => {}" },
        type: { summary: "function" },
      },
    },
    handleChatBotClick: {
      description: "Function handle event when clicked on ChatBot icon.",
      table: {
        defaultValue: { summary: "() => {}" },
        type: { summary: "function" },
      },
    },
    // dropMenuOptions: {
    //   description: `It is array object which contains Menu when user clicks on User avatar.
    //   <code>
    //   <ul>
    //     <li>label: Option label of the menu [string]</li>
    //     <li>onClick: handles event when clicked on option [function]</li>
    //     </ul>
    //     </code>`,
    //   control: {
    //     type: "array",
    //   },
    // },
  },
  args: {
    handleLogoClick: fn(),
    handleHelpClick: fn(),
    handleMessageClick: fn(),
    handleNotificationClick: fn(),
    handleChatBotClick: fn(),
  },
};

export const Default = {
  args: {
    title: "Product Name",
    userName: "User Name",
    showNotificationIcon: true,
    notificationIndicator: true,
    showHelpIcon: true,
    showMessageIcon: true,
    showChatBotIcon: true,
    isMessageIconDisabled: false,
    isNotificationDnd: false,
  },
};
