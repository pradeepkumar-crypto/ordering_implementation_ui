import React from "react";
import { Prompt as PromptWrapper } from "../components/Prompt";
import { Button } from "../components/Button";
import { fn } from "@storybook/test";

export default {
  title: "Components/Prompt",
  component: PromptWrapper,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    title: {
      description: "Title of the Modal",
      table: {
        defaultValue: { summary: "" },
        type: { summary: "string" },
      },
    },
    variant: {
      description: "Different variant of the Prompt.",
      options: ["success", "info", "warning", "error"],
      control: { type: "radio" },
      table: {
        defaultValue: { summary: "info" },
        type: { summary: "string" },
      },
    },
    isOpen: {
      description: "If true, display Prompt.",
      table: {
        defaultValue: { summary: "" },
        type: { summary: "string" },
      },
    },
    primaryButtonLabel: {
      description:
        "Label of the Primary button of the Prompt, If not passed does not display primary button.",
      table: {
        defaultValue: { summary: "" },
        type: { summary: "string" },
      },
    },
    secondaryButtonLabel: {
      description:
        "Label of the Secondary button of the Prompt, If not passed does not display secondary button.",
      table: {
        defaultValue: { summary: "" },
        type: { summary: "string" },
      },
    },
    handleClose: {
      description: "Function handles the event, when close button is clicked.",
      table: {
        defaultValue: { summary: "() => {}" },
        type: { summary: "function" },
      },
    },
    onPrimaryButtonClick: {
      description:
        "Function handles the event, when primary button is clicked.",
      table: {
        defaultValue: { summary: "() => {}" },
        type: { summary: "function" },
      },
    },
    onSecondaryButtonClick: {
      description:
        "Function handles the event, when secondary button is clicked.",
      table: {
        defaultValue: { summary: "() => {}" },
        type: { summary: "function" },
      },
    },
  },
  args: {
    onPrimaryButtonClick: fn(),
    onSecondaryButtonClick: fn(),
    handleClose: fn(),
  },
};

const Prompt = (args) => {
  const [open, setOpen] = React.useState(args.isOpen);
  return (
    <React.Fragment>
      <Button onClick={() => setOpen(!open)}>Click to display Prompt</Button>
      <PromptWrapper
        {...args}
        isOpen={open}
        handleClose={() => setOpen(!open)}
      />
    </React.Fragment>
  );
};

export const Default = (args) => <Prompt {...args} />;
Default.args = {
  variant: "info",
  title: "title",
  children: "Prompt content",
  primaryButtonLabel: "ok",
  secondaryButtonLabel: "cancel",
  isOpen: false,
};
