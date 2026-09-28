import React, { useState } from "react";
import { fn } from "@storybook/test";
import { Input as InputWrapper } from "../components/Input";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { isError } from "lodash";

// Dummy function to get an icon (you should replace this with your actual implementation)
const getIcon = (icon) => {
  return <DeleteOutlineOutlinedIcon />; // Example icon
};

// // More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: "Components/Input",
  component: InputWrapper,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
    docs: {
      description: {
        component:
          "A text field is a basic text control that enables the user to type a small amount of text. No matter what app you use, you’re bound to run across some little text field requiring your personal information. Even typing a question into Google is considered filling out a form which has only one text field. This component is mainly used to enter long or short form entries.",
      },
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    id: {
      description: "Id attribute of the input element.",
    },
    name: {
      description: "Name attribute of the input element.",
    },
    label: {
      description: "Label of the input element.",
    },
    placeholder: {
      description: "Placeholder text of the input element.",
    },
    helperText: {
      description: "Helper text of the input element.",
    },
    focusedText: {
      description:
        "Focus text of the input element, text appears when input is on focus state.",
    },
    type: {
      description: "Type of the input element.",
      defaultValue: { summary: "text" },
      type: { summary: "string" },
    },
    inputProps: {
      description: "Attributes applied to the input element.",
    },
    isHelperText: {
      description: "If true, make helperText appears.",
      table: {
        defaultValue: { summary: "true" },
        type: { summary: "boolean" },
      },
    },
    isRequired: {
      description: "If true, Add Required 'asterik' indicator to the label",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
    },
    isError: {
      description: "If true, flags Input is error.",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
    },
    isDisabled: {
      description: "If true, disabled Input element.",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
    },
    value: {
      description: "Value of the input element",
    },
    onChange: {
      description: "Function to handle input value change state",
    },
    leftIconClick: {
      description: "Function to handle on click on left icon",
    },
    rightIconClick: {
      description: "Function to handle on click on right icon",
    },
    leftIcon: {
      description:
        "You can pass your Icon through this props, Icons appears left side of Input element.",
    },
    rightIcon: {
      description:
        "You can pass your Icon through this props, Icons appears right side of Input element.",
    },
    iconClickOnDisabled: {
      description:
        "If true, the icon will be clickable even when the input is disabled",
      table: {
        defaultValue: { summary: "false" },
        type: { summary: "boolean" },
      },
      control: {
        type: "boolean",
      },
    },
  },
  args: {
    onChange: fn(),
    leftIconClick: fn(),
    rightIconClick: fn(),
  },
};

const Input = (args) => {
  const [value, setValue] = useState(args.value);
  return (
    <InputWrapper
      {...args}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export const Default = (args) => <Input {...args} />;

// // More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
Default.args = {
  id: "",
  name: "",
  label: "Enter text here",
  helperText: "helper text",
  isHelperText: true,
  focusedText: "focus text",
  placeholder: "Please enter text",
  value: "",
  type: "text",
  inputProps: {},
  isError: false,
  isDisabled: false,
  isRequired: false,
  leftIcon: <SearchIcon />,
  rightIcon: <VisibilityIcon />,
};
