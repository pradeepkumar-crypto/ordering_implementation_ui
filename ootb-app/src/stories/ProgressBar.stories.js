import React, { useState } from "react";
import { ProgressBar as ProgressBarWrapper } from "../components/ProgressBar";
import { Button } from "../components/Button";
import { fn } from "@storybook/test";

export default {
  title: "Components/ProgressBar",
  component: ProgressBarWrapper,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Progress bar component visually represent the completion of task. It shows how much of tasks is done and how much is pending.",
      },
    },
  },
  argTypes: {
    value: {
      description: "Current value of the total progress.",
      table: {
        defaultValue: { summary: 10 },
        type: { summary: "number" },
      },
    },
    showTime: {
      description: "If true, displays time left for progress to complete.",
      table: {
        defaultValue: { summary: "true" },
        type: { summary: "boolean" },
      },
    },
    time: {
      description: "displays time left for progress to complete.",
      table: {
        defaultValue: { summary: "30" },
        type: { summary: "number" },
      },
    },
    customLabel: {
      description:
        "If provided, display custom label instead of default label.",
      table: {
        defaultValue: { summary: "" },
        type: { summary: "string" },
      },
    },
  },
};

const ProgressBar = (args) => {
  const [count, setCount] = useState(args.value);

  const handleClose = (type) => {
    if (type === "add" && count < 100) {
      setCount(count + 10);
    } else if (type === "minus" && count > 10) {
      setCount(count - 10);
    }
  };

  return (
    <>
      <ProgressBarWrapper {...args} value={count} />
      <div style={{ display: "flex", gap: "16px", marginTop: "20px" }}>
        <Button onClick={() => handleClose("add")} label="+">
          +
        </Button>
        <Button onClick={() => handleClose("minus")} label="-">
          -
        </Button>
      </div>
    </>
  );
};

export const Default = (args) => <ProgressBar {...args} />;

Default.args = {
  value: 10,
  showTime: true,
  time: 30,
};
