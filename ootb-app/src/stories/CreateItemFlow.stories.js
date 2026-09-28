import React, { useState } from "react";
import { CreateItemFlow as CreateItemFlowWrapper } from "../components/CreateItemFlow";
import { Select } from "../components/Select";
import { TextArea } from "../components/TextArea";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import { Button } from "../components/Button";

export default {
  title: "Components/CreateItemFlow",
  component: CreateItemFlowWrapper,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  docs: {
    description: {
      component:
        "A create item flow is a UI component that allows users to create an item. It is often used in forms, settings, and surveys to capture user preferences or multiple selections.",
    },
  },
  argTypes: {
    stepperVariant: {
      options: ["mui", "classic", "progress"],
      control: { type: "radio" },
    },
    totalSteps: {
      defaultValue: 3,
      type: "number",
    },
    actionsChildren: {
      type: "Array Object",
      defaultValue: (
        <React.Fragment>
          <Button variant="secondary" onClick={() => {}}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => {}}>
            Submit
          </Button>
        </React.Fragment>
      ),
    },
  },
};

const createFlowContainerStyle = {
  backgroundColor: "lightgrey",
  flex: 1,
  display: "flex",
  // marginTop: "var(--header-height)",
  transition: "margin-left 0.3s ease, width 0.3s ease",
  overflow: "hidden",
  height: "100vh", // giving container height so that the children will take available space
};

const departmentOptions = [
  { label: "Department 1", value: "dept1" },
  { label: "Department 2", value: "dept2" },
  { label: "Department 3", value: "dept3" },
];

const classOptions = [
  { label: "Class 1", value: "class1" },
  { label: "Class 2", value: "class2" },
  { label: "Class 3", value: "class3" },
];

const channelOptions = [
  { label: "Channel 1", value: "channel1" },
  { label: "Channel 2", value: "channel2" },
  { label: "Channel 3", value: "channel3" },
];

const headings = ["Alert Details", "Configuration", "Review"];

const CreateItemFlow = (args) => {
  const [step, setStep] = useState(1);

  const handleCancel = () => {
    console.log("Cancelled");
    // Reset form or navigate back
  };

  const handleNext = () => {
    if (step === 3) {
      console.log("Form submitted!");
      return;
    }
    setStep((prev) => Math.min(prev + 1, 3));
  };

  const handlePrev = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleStepClick = (stepNumber) => {
    // Optional: Add validation before allowing step navigation
    setStep(stepNumber);
  };

  return (
    <div style={createFlowContainerStyle}>
      <CreateItemFlowWrapper
        {...args}
        onCancel={handleCancel}
        onNext={handleNext}
        onPrev={handlePrev}
        onStepClick={handleStepClick}
      />
    </div>
  );
};

export const Default = (args) => <CreateItemFlow {...args} />;

Default.args = {
  step: 1,
  headings: headings,
  leftPanelWidth: 200,
  leftPanelTitle: "Create Alert",
  leftPanelDescription:
    "Create and configure your alert settings. Follow the steps to set up your alert preferences.",
  leftPanelImage: <AccountBalanceOutlinedIcon />,
  stepperVariant: "progress",
  children: [
    // Alert Details Content
    <div className="form-section" key="alert-details">
      <div className="field">
        <div className="field-label">Alert name</div>
        <TextArea placeholder="Enter here..." width="100%" height="40px" />
      </div>
    </div>,

    // Configuration Content
    <div className="form-section" key="configuration">
      <div className="field-group">
        <div className="field">
          <div className="field-label">Department</div>
          <Select
            options={departmentOptions}
            placeholder="Select"
            onChange={(value) => console.log("Department selected:", value)}
          />
        </div>
        <div className="field">
          <div className="field-label">Class</div>
          <Select
            options={classOptions}
            placeholder="Select"
            onChange={(value) => console.log("Class selected:", value)}
          />
        </div>
      </div>
      <div className="field">
        <div className="field-label">Channel</div>
        <Select
          options={channelOptions}
          placeholder="Select"
          onChange={(value) => console.log("Channel selected:", value)}
        />
      </div>
    </div>,

    // Review Content
    <div className="form-section" key="review">
      <div className="field">
        <div className="field-label">Review your settings</div>
        <div style={{ marginTop: "16px" }}>
          <p>Please review your alert configuration before submitting.</p>
        </div>
      </div>
    </div>,
  ],
  actionsChildren: [
    <React.Fragment>
      <Button variant="tertiary" onClick={() => {}}>
        Cancel
      </Button>
      <Button variant="primary" onClick={() => {}}>
        Submit
      </Button>
    </React.Fragment>,
  ],
};
