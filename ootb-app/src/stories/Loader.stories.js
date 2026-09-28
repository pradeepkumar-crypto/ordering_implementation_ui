import React from "react";
import { Loader } from "../components/Loader";

export default {
  title: "Components/Loader",
  component: Loader,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    size: {
      options: ["small", "medium", "large"],
      control: { type: "radio" },
    },
  },
};

const Template = (args) => <Loader {...args} />;

export const Default = Template.bind({});
Default.args = {
  size: "large",
  progress: "50%",
  showSkeleton: false,
  text: "Custom Loading Text",
};

export const WithSkeleton = Template.bind({});
WithSkeleton.args = {
  size: "large",
  showSkeleton: true,
};
