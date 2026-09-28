import React, { useState } from "react";
import { Menu as MenuComponent } from "../components/Menu";
import { Button } from "../components/Button";
import { fn } from "@storybook/test";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { StarOutlineOutlined } from "@mui/icons-material";

export default {
  title: "Components/Menu",
  component: MenuComponent,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `You can anchor the menu component to the button like this: 'onClick={(e) => setAnchorEl(e.currentTarget)}'.
          <br>In the menu component, each of the options have their own 'onClick' definitions.`,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    open: {
      description: "If true, open dropdown.",
      control: { type: "bool" },
      table: {
        defaultValue: { summary: false },
        type: { summary: "boolean" },
      },
    },
    selected: {
      description:
        "Unique Value of the option, which you want to show highlighted",
      control: { type: "" },
      table: {
        defaultValue: { summary: "" },
        type: { summary: "string" },
      },
    },
    anchorEl: {
      description:
        "An HTML element, or a function that returns one. It's used to set the position of the menu.",
      control: { type: "" },
      table: {
        defaultValue: { summary: "null" },
        type: { summary: "React" },
      },
    },
    iconPlacement: {
      description:
        "Provides different Orientation you can keep icon around children",
      options: ["left", "right"],
      control: { type: "radio" },
      table: {
        defaultValue: { summary: "left" },
        type: { summary: "string" },
      },
    },
    options: {
      description: `Array object containing options. 
        <code>
          <ul class="storybook-order-list">
            <li><strong>label</strong>: Label of the Option. [string]</li>
            <li><strong>value</strong>: Unique value of the Option. [string]</li>
            <li><strong>icon</strong>:You can pass your Icon. [React Children | Img]</li>
            <li><strong>onClick</strong>: Function that handles onclick event on the Option. [function]</li>
            <li><strong>disabled?</strong>: If true, disables the Option. [function]</li>
          </ul>
        </code>`,
      control: {
        type: "Array object", // Control type (text, boolean, select, etc.)
      },
      table: {
        defaultValue: { summary: "[]" },
        type: { summary: "Array object" },
      },
    },
    onClose: {
      description: `Function called when onClose event occurs. (by resetting anchorEl)`,
      table: {
        defaultValue: { summary: "() => {}" },
        type: { summary: "function" },
      },
    },
  },
  args: {
    onClose: fn(),
  },
};

const Menu = ({ ...args }) => {
  const [anchorEl, setAnchorEl] = useState(args.anchorEl);
  const isOpen = anchorEl;

  const onClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button onClick={(e) => setAnchorEl(e.currentTarget)} label="Open Menu">
        Open Menu
      </Button>
      <MenuComponent
        {...args}
        open={isOpen}
        anchorEl={anchorEl}
        onClose={onClose}
      />
    </>
  );
};

const Template = ({ ...args }) => <Menu {...args} />;
export const Default = Template.bind({});

Default.args = {
  open: true,
  anchorEl: null,
  selected: "opt1",
  iconPlacement: "left",
  onClose: () => {},
  options: [
    {
      label: "Option 1",
      value: "opt1",
      onClick: () => {
        console.log("Option 1");
      },
      icon: <StarOutlineOutlined />,
    },
    {
      label: "Option 2",
      value: "opt2",
      onClick: () => {},
      disabled: true,
    },
    {
      label: "Option 3",
      value: "opt3",
      onClick: () => {},
    },
  ],
  withCheckbox: true,
  withActionButtons: true,
};

export const WithSubmenu = Template.bind({});
WithSubmenu.args = {
  open: true,
  anchorEl: null,
  selected: "opt1",
  iconPlacement: "left",
  onClose: () => {},
  options: [
    {
      label: "Option 1",
      value: "opt1",
      onClick: () => {
        console.log("Option 1");
      },
      icon: <StarBorderIcon />,
    },
    {
      label: "Option 2",
      value: "opt2",
      onClick: () => {},
      disabled: true,
    },
    {
      label: "More Options",
      value: "more",
      children: [
        {
          label: "Sub Option 1",
          onClick: () => console.log("Clicked Sub Option 1"),
          value: "subOpt1",
        },
        {
          label: "Sub Option 2",
          value: "subOpt2",
          children: [
            {
              label: "Sub-Sub Option 1",
              onClick: () => console.log("Clicked Sub-Sub Option 1"),
              value: "subSubOpt1",
            },
            {
              label: "Sub-Sub Option 2",
              onClick: () => console.log("Clicked Sub-Sub Option 2"),
              value: "subSubOpt2",
            },
          ],
        },
      ],
    },
  ],
  withCheckbox: true,
  withActionButtons: true,
};

export const withSections = Template.bind({});
withSections.args = {
  open: true,
  anchorEl: null,
  // selected: "opt1",
  iconPlacement: "left",
  onClose: () => {},
  options: [
    {
      section: "Section 1",
      // icon: <StarOutlineOutlined />,
      value: "sec1",
    },
    {
      label: "options1",
      icon: <StarOutlineOutlined />,
      value: "opt1",
      children: [
        {
          label: "Opt 1",
          value: "option1",
          onClick: () => console.log("Option 1 clicked"),
        },
        {
          label: "Option 2",
          value: "option2",
          onClick: () => console.log("Option 2 clicked"),
        },
      ],
    },
    {
      section: "Section 2",
      // icon: <StarOutlineOutlined />,
      value: "sec2",
    },
    {
      label: "Opt 2",
      value: "opt2",
      children: [
        {
          label: "Option 3",
          value: "option3",
          children: [
            {
              label: "Sub Option 1",
              value: "subOption1",
              onClick: () => console.log("Sub Option 1 clicked"),
            },
            {
              label: "Sub Option 2",
              value: "subOption2",
              onClick: () => console.log("Sub Option 2 clicked"),
            },
          ],
        },
      ],
    },
  ],
  withCheckbox: true,
  withActionButtons: true,
};

export const withSubLabel = Template.bind({});
withSubLabel.args = {
  open: true,
  anchorEl: null,
  selected: "opt1",
  iconPlacement: "left",
  onClose: () => {},
  options: [
    {
      // disabled: true,
      label: "Option 1",
      subLabel: "sublabelasdfasdfsdfasdfsafd dsfasdfadsfasd",
      onClick: () => {},
      value: "opt1",
    },
    {
      // disabled: true,
      label: "Option 2",
      subLabel: "sublabelasdfasdfsdfasdfsafd dsfasdfadsfasd",
      onClick: () => {},
      value: "opt2",
    },
    {
      label: "Option 3",
      subLabel: "sublabelasdfasdfsdfasdfsafd dsfasdfadsfasd",
      onClick: () => {},
      value: "opt3",
    },
  ],
  withCheckbox: true,
  withActionButtons: true,
};
