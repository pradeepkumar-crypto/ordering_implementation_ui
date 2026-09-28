import React from "react";
import { Button } from "../components/Button";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import AgSettingIcon from "../assets/ag-setting.svg";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
export default {
  title: "Components/Button",
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
    docs: {
      description: {
        component:
          "A Button is a clickable element that triggers an action or event. The component supports:\n\n" +
          "- Multiple variants (primary, secondary, tertiary, text, url)\n" +
          "- Different sizes (small, medium, large)\n" +
          "- Icon support with configurable placement\n" +
          "- Loading state\n" +
          "- Disabled state\n" +
          "- Destructive type for dangerous actions\n" +
          "- Custom styling through className and sx props\n\n" +
          "The button is built on top of Material-UI's Button component and includes additional styling and functionality.",
      },
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  argTypes: {
    className: {
      description: "Additional CSS class name to apply to the button",
      control: { type: "text" },
      table: {
        defaultValue: { summary: "" },
        type: { summary: "string" },
      },
    },
    variant: {
      description: "The visual style of the button",
      control: { type: "radio" },
      options: ["primary", "secondary", "tertiary", "text", "url"],
      table: {
        defaultValue: { summary: "primary" },
        type: { summary: "string" },
      },
    },
    size: {
      description: "The size of the button",
      control: { type: "radio" },
      options: ["small", "medium", "large"],
      table: {
        defaultValue: { summary: "large" },
        type: { summary: "string" },
      },
    },
    type: {
      description:
        "The type of button, affecting its visual appearance and behavior",
      control: { type: "radio" },
      options: ["default", "destructive"],
      table: {
        defaultValue: { summary: "default" },
        type: { summary: "string" },
      },
    },
    loading: {
      description:
        "If true, shows a loading state. For 'url' variant, displays 'Loading...' text",
      control: { type: "boolean" },
      table: {
        defaultValue: { summary: false },
        type: { summary: "boolean" },
      },
    },
    disabled: {
      description: "If true, the button will be disabled and non-clickable",
      control: { type: "boolean" },
      table: {
        defaultValue: { summary: false },
        type: { summary: "boolean" },
      },
    },
    children: {
      description: "The content of the button. Can be text or React elements",
      control: { type: "text" },
      table: {
        type: { summary: "React.ReactNode" },
      },
    },
    icon: {
      description: "Icon component to display in the button",
      control: { type: "object" },
      table: {
        type: { summary: "React.ReactNode" },
      },
    },
    iconPlacement: {
      description: "Position of the icon relative to the button content",
      control: { type: "radio" },
      options: ["left", "right"],
      table: {
        defaultValue: { summary: "left" },
        type: { summary: "string" },
      },
    },
    onClick: {
      description: "Callback function called when the button is clicked",
      control: { type: "function" },
      table: {
        defaultValue: { summary: "() => {}" },
        type: { summary: "() => void" },
      },
    },
    sx: {
      description: "Additional inline styles to apply to the button",
      control: { type: "object" },
      table: {
        type: { summary: "object" },
      },
    },
    ref: {
      description: "Ref to be forwarded to the underlying button element",
      control: { type: "object" },
      table: {
        type: { summary: "React.Ref<HTMLButtonElement>" },
      },
    },
  },
};

const Template = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  className: "",
  size: "large",
  variant: "primary",
  disabled: false,
  loading: false,
  icon: <DeleteOutlinedIcon fontSize="small" />,
  iconPlacement: "left",
  children: "Button",
  type: "default",
};

export const OnlyLabel = Template.bind({});
OnlyLabel.args = {
  className: "",
  size: "large",
  variant: "primary",
  disabled: false,
  loading: false,
  children: "Button",
  type: "default",
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  className: "",
  size: "medium",
  variant: "primary",
  disabled: false,
  icon: <DeleteOutlinedIcon fontSize="small" />,
  iconPlacement: "left",
  children: "Button",
  type: "default",
};

export const OnlyIcon = Template.bind({});
OnlyIcon.args = {
  className: "",
  size: "medium",
  variant: "primary",
  disabled: false,
  icon: <DeleteOutlinedIcon fontSize="small" />,
  iconPlacement: "left",
  type: "default",
};

export const Link = Template.bind({});
Link.args = {
  className: "",
  size: "medium",
  label: "Button",
  variant: "url",
  disabled: false,
  children: "Button",
  type: "default",
};
