import React from "react";
import { Chips as ChipsWrapper } from "../components/Chips";

export default {
  title: "Components/Chips",
  component: ChipsWrapper,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A Chip is a compact element that represents an input, attribute, or action. The component is built on top of Material-UI's Chip component and includes custom styling and functionality.\n\n" +
          "Key features:\n" +
          "- Multiple variants (default, single-select, multi-select)\n" +
          "- Custom styling for different states\n" +
          "- Disabled state support\n" +
          "- Click handling\n" +
          "- Custom icons and indicators\n" +
          "- Responsive design\n\n" +
          "The Chip is commonly used for:\n" +
          "- Input chips\n" +
          "- Choice chips\n" +
          "- Filter chips\n" +
          "- Action chips\n" +
          "- Tags and labels",
      },
    },
  },
  argTypes: {
    label: {
      description: "The text content to display in the chip.",
      control: { type: "text" },
      table: {
        defaultValue: { summary: "Chip" },
        type: { summary: "string" },
      },
    },
    onClick: {
      description: "Callback function fired when the chip is clicked.",
      control: { type: "function" },
      table: {
        defaultValue: { summary: "() => {}" },
        type: { summary: "(event: React.MouseEvent) => void" },
      },
    },
    type: {
      description:
        "The type of chip, which affects its visual style and behavior. 'default' is a basic chip, 'single' shows a radio button indicator, and 'multi' shows a checkbox indicator.",
      options: ["default", "single", "multi"],
      control: { type: "radio" },
      table: {
        defaultValue: { summary: "default" },
        type: { summary: "string" },
      },
    },
    disabled: {
      description:
        "If true, the chip will be disabled and cannot be interacted with.",
      control: { type: "boolean" },
      table: {
        defaultValue: { summary: false },
        type: { summary: "boolean" },
      },
    },
    isActive: {
      description:
        "If true, the chip will be shown in its active/selected state.",
      control: { type: "boolean" },
      table: {
        defaultValue: { summary: false },
        type: { summary: "boolean" },
      },
    },
  },
};

const Chips = (args) => <ChipsWrapper {...args} />;

export const Default = (args) => <Chips {...args} />;
export const SingleSelect = (args) => <Chips {...args} />;
export const MultiSelect = (args) => <Chips {...args} />;

Default.args = {
  label: "Default Chip",
  onClick: () => {},
  type: "default",
  disabled: false,
  isActive: false,
};

SingleSelect.args = {
  label: "Single Select",
  onClick: () => {},
  type: "single",
  disabled: false,
  isActive: true,
};

MultiSelect.args = {
  label: "Multi Select",
  onClick: () => {},
  type: "multi",
  disabled: false,
  isActive: true,
};
