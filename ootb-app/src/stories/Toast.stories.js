import React, { useState } from "react";
import { Toast as ToastComponent } from "../components/Toast";
import { Button } from "../components/Button";
import { fn } from "@storybook/test";

export default {
  title: "Components/Toast",
  component: ToastComponent,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    isOpen: {
      description: "If true, display Toast.",
      table: {
        defaultValue: { summary: false },
        type: { summary: "boolean" },
      },
    },
    message: {
      description: "Message you want to display in the toast.",
      table: {
        defaultValue: { summary: "This is a toast" },
        type: { summary: "string" },
      },
    },
    position: {
      description:
        "Different position of the screen you want to display your toast.",
      options: [
        "top-left",
        "top-center",
        "top-right",
        "bottom-left",
        "bottom-center",
        "bottom-right",
      ],
      control: { type: "radio" },
      table: {
        defaultValue: { summary: "top-right" },
        type: { summary: "string" },
      },
    },
    variant: {
      description: "Different variant of the toast.",
      options: ["success", "info", "warning", "error"],
      control: { type: "radio" },
      table: {
        defaultValue: { summary: "success" },
        type: { summary: "string" },
      },
    },
    onClose: {
      description:
        "It is called when you click outside the toast as well as when autoHideDuration is over.",
      table: {
        defaultValue: { summary: "() => {}" },
        type: { summary: "function" },
      },
    },
    autoHideDuration: {
      description: "Auto hide duration in milliseconds.",
      table: {
        defaultValue: { summary: 5000 },
        type: { summary: "number" },
      },
    },
  },
  args: {
    onClose: fn(),
  },
};

const Toast = (args) => {
  const [isOpen, setIsOpen] = useState(args.isOpen);

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)} label="Show Toast">
        Show Toast
      </Button>
      <Button
        sx={{ marginLeft: "8px" }}
        onClick={() => setIsOpen(false)}
        variant="secondary"
        label="Hide Toast"
      >
        Hide Toast
      </Button>
      <ToastComponent {...args} isOpen={isOpen} onClose={onClose} />
    </>
  );
};
export const Default = (args) => <Toast {...args} />;
Default.args = {
  message: "This is a toast",
  position: "top-right",
  variant: "success",
  isOpen: false,
  autoHideDuration: 5000,
};
