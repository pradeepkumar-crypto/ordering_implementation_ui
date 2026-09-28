import React from "react";
import { Card } from "../components/Card";

export default {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A Card is a versatile UI component used to group related information in a visually distinct container. The component is built on top of Material-UI's Card component and includes custom styling and functionality.\n\n" +
          "Key features:\n" +
          "- Multiple size variants with different shadow depths\n" +
          "- Consistent padding and dimensions\n" +
          "- Hover and focus states with border color changes\n" +
          "- Responsive width with max-width constraint\n" +
          "- Minimum height for content consistency\n\n" +
          "The Card is commonly used for:\n" +
          "- Content containers\n" +
          "- Dashboard widgets\n" +
          "- Product displays\n" +
          "- Information panels\n" +
          "- Form containers",
      },
    },
  },
  argTypes: {
    size: {
      description:
        "The size variant of the card, which affects its shadow depth and visual prominence.",
      options: [
        "extraSmall",
        "small",
        "medium",
        "large",
        "extraLarge",
        "extraLarge-3x",
      ],
      control: { type: "radio" },
      table: {
        defaultValue: { summary: "small" },
        type: { summary: "string" },
      },
    },
    children: {
      description: "The content to be rendered inside the card.",
      table: {
        type: { summary: "React.ReactNode" },
      },
    },
    sx: {
      description:
        "Additional Material-UI system props to be applied to the card.",
      table: {
        type: { summary: "object" },
      },
    },
  },
};

export const Default = {
  args: {
    children: (
      <p>
        Nisi non anim et culpa. Sint magna dolore quis tempor deserunt pariatur
        id veniam enim ex.
      </p>
    ),
    size: "small",
  },
};
