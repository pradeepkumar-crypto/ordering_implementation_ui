import React, { useState } from "react";
import { fn } from "@storybook/test";
import { EmptyState } from "../components/EmptyState";

// // More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: "Components/EmptyState",
  component: EmptyState,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
    docs: {
      description: {
        component:
          "An empty state is a design pattern used to communicate the absence of content or data in a specific area of an application or website. Empty states often appear when a user first interacts with a new feature, completes all tasks, or encounters an error that results in no data being displayed. The purpose of an empty state is to guide users, provide context, and encourage further interaction.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    heading: {
      description: "Heading Content of the EmptyState",
      table: {
        defaultValue: { summary: "" },
        type: { summary: "string" },
      },
    },
    description: {
      description: "Description Content of the EmptyState",
      table: {
        defaultValue: { summary: "" },
        type: { summary: "string" },
      },
    },
    primaryButtonLabel: {
      description:
        "Label for Primary Button.  Note:- If not passed, does not display Primary Button.",
      table: {
        defaultValue: { summary: "" },
        type: { summary: "string" },
      },
    },
    secondaryButtonLabel: {
      description:
        "Label for Secondary Button. Note:- If not passed, does not display Secondary Button.",
      table: {
        defaultValue: { summary: "" },
        type: { summary: "string" },
      },
    },
    onPrimaryButtonClick: {
      description: "Function to handle click on Primary Button.",
      table: {
        defaultValue: { summary: "() => {}" },
        type: { summary: "function" },
      },
    },
    onSecondaryButtonClick: {
      description: "Function to handle click on Secondary Button.",
      table: {
        defaultValue: { summary: "() => {}" },
        type: { summary: "function" },
      },
    },
    emptyStateIcon: {
      description: "Icon to be displayed in the empty state.",
      table: {
        defaultValue: { summary: "null" },
        type: { summary: "React.ReactNode" },
      },
      control: {
        type: "React.ReactNode",
      },
    },
    emptyStateBottomOptions: {
      description: "pass custom jsx at the bottom of the empty state",
      table: {
        defaultValue: { summary: "null" },
        type: { summary: "React.ReactNode" },
      },
    },
  },
  args: {
    onPrimaryButtonClick: fn(),
    onSecondaryButtonClick: fn(),
  },
};

export const Default = {
  args: {
    heading: "This where you keep your headings",
    description: "You can create your sub content here",
    primaryButtonLabel: "Import Plan",
    secondaryButtonLabel: "Create Plan",
  },
};
