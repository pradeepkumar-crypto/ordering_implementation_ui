import React from "react";
import { fn } from "@storybook/test";
import { Badge } from "../components/Badge";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

// // More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: "Components/Badge",
  component: Badge,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
    docs: {
      description: {
        component:
          "A badge is a small UI component that often appears as a label or icon, usually attached to another element like an avatar, button, or notification. Badges can convey various types of information, such as status, counts, or categories. <br/><br/> <u>General Guidelines for Writing Descriptions for Badges</u> <br/><br/><li>Purpose: Clearly state the purpose of the badge (e.g., notification count, status indicator).</li><li>Clarity: Ensure the message is straightforward and unambiguous.</li><li>Relevance: Include relevant details, such as numbers or labels, and explain their significance.</li>",
      },
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    label: {
      description:
        "Text label to display in the badge. Required for label-only and icon-label variants.",
      control: { type: "text" },
      table: {
        type: { summary: "string" },
      },
    },
    color: {
      description: "The color variant of the badge",
      options: ["default", "info", "success", "warning", "error"],
      control: { type: "radio" },
      table: {
        defaultValue: { summary: "default" },
        type: { summary: "string" },
      },
    },
    variant: {
      description: "The visual style of the badge",
      options: ["filled", "stroke", "subtle"],
      control: { type: "radio" },
      table: {
        defaultValue: { summary: "filled" },
        type: { summary: "string" },
      },
    },
    isIcon: {
      description: "If true, enables icon display in the badge",
      control: { type: "boolean" },
      table: {
        defaultValue: { summary: false },
        type: { summary: "boolean" },
      },
    },
    icon: {
      description:
        "Icon component to display in the badge. Required when isIcon is true.",
      control: { type: "object" },
      table: {
        type: { summary: "React.ReactNode" },
      },
    },
    onClick: {
      description: "Callback function fired when the badge is clicked",
      control: { type: "function" },
      table: {
        type: { summary: "() => void" },
      },
    },
    size: {
      description: "Size of the badge",
      control: { type: "radio" },
      options: ["small", "default"],
      table: {
        defaultValue: { summary: "default" },
        type: { summary: "string" },
      },
    },
    disabled: {
      description: "If true, the badge will be disabled",
      control: { type: "boolean" },
      table: {
        defaultValue: { summary: false },
        type: { summary: "boolean" },
      },
    },
    className: {
      description: "Additional CSS class name to apply to the badge",
      control: { type: "text" },
      table: {
        type: { summary: "string" },
      },
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
};

// // More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default = {
  args: {
    label: "Badge",
    variant: "filled",
    color: "default",
    icon: <DeleteOutlineOutlinedIcon />,
    isIcon: false,
    size: "default",
  },
};
