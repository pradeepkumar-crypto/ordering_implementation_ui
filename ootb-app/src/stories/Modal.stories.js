import React from "react";
import { Modal as ModalWrapper } from "../components/Modal";
import { Button } from "../components/Button";
import { fn } from "@storybook/test";

export default {
  title: "Components/Modal",
  component: ModalWrapper,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    className: {
      description:
        "ClassName props to over-ride filter panel width or styling.",
      table: {
        defaultValue: { summary: "" },
        type: { summary: "string" },
      },
    },
    title: {
      description: "Title of the Modal",
      table: {
        defaultValue: { summary: "" },
        type: { summary: "string" },
      },
    },
    height: {
      description: "You can pass your own height to the Modal",
      table: {
        defaultValue: { summary: "null" },
        type: { summary: "string" },
      },
    },
    width: {
      description: "You can pass your own width to the Modal",
      table: {
        defaultValue: { summary: "null" },
        type: { summary: "string" },
      },
    },
    size: {
      description: "Width options of the Modal",
      options: ["small", "medium", "large"],
      control: { type: "radio" },
      table: {
        defaultValue: { summary: "medium" },
        type: { summary: "string" },
      },
    },
    open: {
      description: "If true, display Modal.",
      table: {
        defaultValue: { summary: false },
        type: { summary: "boolean" },
      },
    },
    children: {
      description: "React elements which get renders in the body of the Modal.",
      table: {
        defaultValue: { summary: "React Node" },
        type: { summary: "object" },
      },
    },
    primaryButtonLabel: {
      description:
        "Label of the Primary button, If not passed does not display primary button.",
      table: {
        defaultValue: { summary: "" },
        type: { summary: "string" },
      },
    },
    primaryButtonProps: {
      description: "You can pass Primary button props.",
      table: {
        defaultValue: { summary: "{}" },
        type: { summary: "object" },
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
    secondaryButtonProps: {
      description: "You can pass Secondary button props.",
      table: {
        defaultValue: { summary: "{}" },
        type: { summary: "object" },
      },
    },
    onClose: {
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
    footerOptions: {
      description: "pass custom jsx at the bottom of the modal",
      table: {
        defaultValue: { summary: "null" },
        type: { summary: "React Node" },
      },
    },
  },
  args: {
    onPrimaryButtonClick: fn(),
    onSecondaryButtonClick: fn(),
    onClose: fn(),
  },
};

const Modal = (args) => {
  const [open, setOpen] = React.useState(args.isOpen);
  return (
    <React.Fragment>
      <Button onClick={() => setOpen(!open)}>Click to display Modal</Button>
      <ModalWrapper {...args} open={open} onClose={() => setOpen(!open)} />
    </React.Fragment>
  );
};

export const Default = (args) => <Modal {...args} />;

Default.args = {
  className: "test-modal",
  title: "title",
  size: "medium",
  open: false,
  children: (
    <>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the
      1500s, when an unknown printer took a galley of type and scrambled it to
      make a type specimen book. It has survived not only five centuries, but
      also the leap into electronic typesetting, remaining essentially
      unchanged.Lorem Ipsum is simply dummy text of the printing and typesetting
      industry. Lorem Ipsum has been the industry's standard dummy text ever
      since the 1500s, when an unknown printer took a galley of type and
      scrambled it to make a type specimen book.
    </>
  ),
  primaryButtonLabel: "Submit",
  primaryButtonProps: {
    disabled: true,
  },
  secondaryButtonLabel: "Cancel",
  footerOptions: <div>Footer Options</div>,
};
