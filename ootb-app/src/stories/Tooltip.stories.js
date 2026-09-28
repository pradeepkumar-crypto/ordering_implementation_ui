import React from "react";
import { Tooltip as TooltipWrapper } from "../components/Tooltip";
import { Button } from "../components/Button";
import { options } from "mock";

export default {
  title: "Components/Tooltip",
  component: TooltipWrapper,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
    docs: {
      description: {
        component:
          "Tooltip display informative text when users hover over, focus on, or tap an element.",
      },
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    title: {
      description: "Content of the tooltip element.",
    },
    variant: {
      description: "Different variant of the tooltip element.",
      options: ["primary", "secondary", "tertiary"],
      control: { type: "radio" },
    },
    // trigger: {
    //   description: "Different types of events that cause a tooltip to show",
    //   options: ["click", "hover"],
    //   control: { type: "radio" },
    // },
    orientation: {
      description: "Tooltip placement.",
      // options: [
      //   "top-start",
      //   "top",
      //   "top-end",
      //   "right-start",
      //   "right",
      //   "right-end",
      //   "bottom-start",
      //   "bottom",
      //   "bottom-end",
      //   "left-start",
      //   "left",
      //   "left-end",
      // ],
      options: ["top", "left", "bottom", "right"],
      control: { type: "radio" },
    },
    children: {
      description: "Tooltip reference element.",
    },
    className: {
      description: "Custom class name for the tooltip.",
    },
  },
};

const Tooltip = (args) => {
  console.log("args", args);
  return (
    <TooltipWrapper
      {...args}
      label={args.label}
      orientation={args.orientation}
      variant={args.variant}
      onClose={() => setIsOpen(false)}
    >
      <Button label={args.orientation}>Hover me</Button>
    </TooltipWrapper>
  );
};

export const Default = (args) => <Tooltip {...args} />;
// // More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
Default.args = {
  title: "Tooltip Label",
  variant: "primary",
  orientation: "top",
  children: <></>,
};
