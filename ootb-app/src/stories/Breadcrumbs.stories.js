import React from "react";
import { Breadcrumbs } from "../components/Breadcrumbs";

export default {
  title: "Components/Breadcrumbs",
  component: Breadcrumbs,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Breadcrumbs are a navigation aid that helps users understand and navigate the hierarchy of a website or application. They typically appear as a horizontal list of links, indicating the user's current location and the path taken to get there. The component supports:\n\n" +
          "- Home icon for the first item\n" +
          "- Collapsible middle items with a menu\n" +
          "- Disabled state for items\n" +
          "- Custom click handlers and navigation URLs\n" +
          "- Responsive design that adapts to different screen sizes\n\n" +
          "When there are more than 4 items, the middle items are collapsed into a menu that can be expanded to show all items.",
      },
    },
  },
  argTypes: {
    list: {
      description:
        "Array of breadcrumb items to display in the navigation path",
      control: {
        type: "array",
      },
      table: {
        type: { summary: "Array<BreadcrumbItem>" },
      },
      type: {
        required: true,
        name: "array",
        value: {
          name: "BreadcrumbItem",
          value: {
            id: {
              name: "string",
              required: false,
              description: "Unique identifier for the breadcrumb item",
            },
            label: {
              name: "string",
              required: true,
              description: "Display text for the breadcrumb item",
            },
            onClick: {
              name: "function",
              required: false,
              description:
                "Callback function called when the breadcrumb is clicked",
            },
            to: {
              name: "string",
              required: false,
              description: "URL to navigate to when the breadcrumb is clicked",
            },
            disabled: {
              name: "boolean",
              required: false,
              description:
                "If true, the breadcrumb will be disabled and non-clickable",
            },
          },
        },
      },
    },
  },
};

const Template = (args) => <Breadcrumbs {...args} />;

export const Default = Template.bind({});
Default.args = {
  list: [
    {
      label: "Home",
      onClick: () => {},
      to: "/",
    },
    {
      label: "label1",
      onClick: () => {},
      to: "/label1",
    },
    {
      label: "label2",
      onClick: () => {},
      to: "/label2",
    },
    {
      label: "label3",
      onClick: () => {},
      to: "/label3",
    },
  ],
};

export const LongWithDisabled = Template.bind({});
LongWithDisabled.args = {
  list: [
    {
      label: "Home",
      onClick: (e) => {
        e.preventDefault();
      },
      to: "https://google.com",
    },
    {
      label: "label1",
      onClick: () => {},
      disabled: true,
      to: "#",
    },
    {
      label: "label2",
      onClick: () => {},
      to: "#",
    },
    {
      label: "label3",
      onClick: () => {},
      to: "#",
    },
    {
      label: "label4",
      disabled: true,
      to: "https://google.com",
    },
    {
      label: "label5",
      onClick: () => {},
      to: "#",
    },
    {
      label: "label6",
      onClick: () => {},
      to: "#",
    },
  ],
};
