import React, { useState } from "react";
import { Switch as SwitchWrapper } from "../components/Switch";
import { fn } from "@storybook/test";

export default {
  title: "Components/Switch",
  component: SwitchWrapper,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    leftLabel: {
      description: "Left label of the Switch component.",
      table: {
        defaultValue: { summary: "" },
        type: { summary: "string" },
      },
    },
    rightLabel: {
      description: "Right label of the Switch component.",
      table: {
        defaultValue: { summary: "" },
        type: { summary: "string" },
      },
    },
    value: {
      description: "If true, enables switch.",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
    },
    disabled: {
      description: "If true, disables the Switch component.",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
    },
    onChange: {
      description: "Handles the change event of the Switch Component.",
      table: {
        defaultValue: { summary: "() => {}" },
        type: { summary: "function" },
      },
    },
  },
  args: {
    onChange: fn(),
  },
};

const Switch = (args) => {
  const [checked, setChecked] = useState(false);
  return (
    <SwitchWrapper
      {...args}
      value={checked}
      onChange={() => setChecked(!checked)}
    />
  );
};

export const Default = (args) => <Switch {...args} />;

Default.args = {
  leftLabel: "Disable something",
  rightLabel: "Enable something",
  value: false,
  disabled: false,
};
