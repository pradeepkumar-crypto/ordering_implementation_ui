import React from "react";
import { fn } from "@storybook/test";
import { Tag } from "../components/Tag";
import MoreVertIcon from "@mui/icons-material/MoreVert";

// // More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: "Components/Tag",
  component: Tag,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
    docs: {
      description: {
        component:
          "Tags allow users to enter information, make selections, filter content, or trigger actions. While included here as a standalone component, the most common use will be in some form of input, so some of the behavior demonstrated here is not shown in context.",
      },
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    label: {
      description: "Label of the tag element.",
      table: {
        defaultValue: { summary: "" },
        type: { summary: "string" },
      },
    },
    variant: {
      description: "Different variant option of the tag element.",
      options: ["filled", "stroke", "solid"],
      control: { type: "radio" },
      table: {
        defaultValue: { summary: "filled" },
        type: { summary: "string" },
      },
    },
    size: {
      description: "Different size option of the tag element.",
      options: ["large", "medium", "small"],
      control: { type: "radio" },
      table: {
        defaultValue: { summary: "large" },
        type: { summary: "string" },
      },
    },
    isRemovable: {
      description:
        "If true, disabled close icon by default or icon provided by user. Note:- To display Icon, also pass onDelete function.",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
    },
    icon: {
      description:
        "You can pass your own icon to display at the right side of tag label, By default it display close icon.  Note:- To display Icon, also pass onDelete function.",
    },
    onClick: {
      description: "Function to handle on click on tag element.",
      table: {
        defaultValue: { summary: "() => {}" },
        type: { summary: "function" },
      },
    },
    onDelete: {
      description:
        "Function to handle on click on close or icon provided by user.",
      table: {
        defaultValue: { summary: "() => {}" },
        type: { summary: "function" },
      },
    },
  },
  args: {
    onClick: fn(),
    onDelete: fn(),
  },
};

// // More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default = {
  args: {
    label: "Tag",
    size: "large",
    variant: "filled",
    isRemovable: false,
    icon: <MoreVertIcon />,
  },
};
