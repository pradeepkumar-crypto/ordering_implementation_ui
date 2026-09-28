import React, { useState } from "react";
import { Alert } from "../components/Alert";
import { fn } from "@storybook/test";

export default {
  title: "Components/Alert",
  component: Alert,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "An alert is a UI component used to notify users of important information, warnings, or errors. Alerts typically appear as banners or pop-ups and often require user acknowledgment.<br/><br/><u>General Guidelines for Writing Descriptions for Alerts</u><ul><li>Brevity: Keep the message short and to the point.</li><li>Clarity: Clearly communicate the purpose of the alert and any required actions.</li><li>Tone: Match the tone to the severity of the message (informational, warning, error, etc.).</li><li>Actionable: If an action is needed, clearly state what the user should do next.</li>",
      },
    },
  },
  argTypes: {
    title: {
      control: { type: "string" },
      description: "Title of the Alert.",
      table: {
        type: { summary: "string" },
      },
    },
    description: {
      control: { type: "string" },
      description: "Description of the Alert.",
      table: {
        type: { summary: "string" },
      },
    },
    severity: {
      description: "Different type of Alert's variant.",
      options: ["success", "info", "warning", "error"],
      control: { type: "radio" },
      table: {
        defaultValue: { summary: "success" },
        type: { summary: "string" },
      },
    },
    onClose: {
      description:
        "Event handler for close button (if missing, will not show close button)",
      table: {
        type: { summary: "() => void" },
      },
    },
    onAction: {
      description:
        "Event handler for action button (if missing, will not show action button)",
      table: {
        type: { summary: "() => void" },
      },
    },
    actionName: {
      description:
        "Action button label available on the alert. (if not passed, will not show action button)",
      control: { type: "string" },
      table: {
        type: { summary: "string" },
      },
    },
    subtleBackground: {
      description:
        "If true, the alert will have a subtle background color. This is useful for alerts that are not as important as others.",
      control: { type: "boolean" },
      table: {
        defaultValue: { summary: false },
        type: { summary: "boolean" },
      },
    },
    actionButtonProps: {
      description: "Additional props to pass to the action button component.",
      control: { type: "object" },
      table: {
        type: { summary: "object" },
      },
    },
    children: {
      description: "Additional content to be rendered inside the alert.",
      table: {
        type: { summary: "React.ReactNode" },
      },
    },
  },
  args: {
    onClose: fn(),
    onAction: fn(),
    subtleBackground: false,
  },
};

export const Default = (args) => <Alert {...args} />;

Default.args = {
  severity: "success",
  title: "This is a title",
  description:
    "Nisi non anim et culpa. Sint magna dolore quis tempor deserunt pariatur id veniam enim ex.",
  actionName: "Undo",
  subtleBackground: false,
};
