import React from "react";
import { Stepper } from "../components/Stepper";
import { fn } from "@storybook/test";

export default {
  title: "Components/Stepper",
  component: Stepper,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      options: ["mui", "classic", "progress"],
      control: { type: "radio" },
    },
    orientation: {
      options: ["horizontal", "vertical"],
      control: { type: "radio" },
    },
  },
  //   argTypes: {
  //     variant: {
  //       options: ["success", "info", "warning", "error"],
  //       control: { type: "radio" },
  //     },
  //     iaFallback: {
  //       options: ["v3", "v2", "mui"],
  //       control: { type: "radio" },
  //     },
  //   },
  //   args: {
  //     onClose: fn(),
  //     onAction: fn(),
  //   },
};

export const Default = {
  args: {
    activeStep: 3,
    steps: [
      {
        label: "Select campaign settings",
        description: "Step 1 description",
      },
      {
        label: "Create an ad group 1",
        description: "create an ad group 1",
      },
      {
        label: "Create an ad group 2",
        description: "create an ad group 2",
      },
      {
        label: "Create an ad group 3",
        description: "create an ad group 3",
      },
      {
        label: "Create an ad 4",
        description: "4",
      },
    ],
    orientation: "horizontal",
    variant: "mui",
    handleStep: () => {},
  },
};

export const VerticalStepper = {
  args: {
    activeStep: 3,
    steps: [
      {
        label: "Select campaign settings",
        description: "Step 1 description",
      },
      {
        label: "Create an ad group1",
        description: "",
      },
      {
        label: "Create an ad group2",
        description: "create an ad group2",
      },
      {
        label: "Create an ad group3",
        description: "create an ad group3",
      },
      {
        label: "Create an ad",
        description: "",
      },
    ],
    orientation: "vertical",
    variant: "mui",
    handleStep: () => {},
  },
};

// export const V2 = {
//   args: {
//     variant: "success",
//     title: "This is a title",
//     iaFallback: "v2",
//   },
// };

// export const Mui = {
//   args: {
//     variant: "success",
//     children: <AlertTitle>Body using AlertTitle from Mui</AlertTitle>,
//     actionName: "",
//     iaFallback: "mui",
//     actionButtonProps: {},
//   },
// };
