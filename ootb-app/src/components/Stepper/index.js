import React from "react";
import Typography from "@mui/material/Typography";
import MUIStepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import PropTypes from "prop-types";

import "./Stepper.styles.scss";

const renderMUIStepper = ({
  steps,
  activeStep,
  orientation,
  handleStep,
  ...args
}) => (
  <MUIStepper
    className="ia-styles ia-stepper ia-stepper-horizontal"
    activeStep={activeStep}
    orientation={orientation}
    {...args}
  >
    {steps.length > 0 &&
      steps.map((step, index) => (
        <Step key={step.label} onClick={() => handleStep(index)}>
          <StepLabel
            optional={
              step.description ? (
                <Typography variant="caption">{step.description}</Typography>
              ) : null
            }
          >
            {step.label}
          </StepLabel>
        </Step>
      ))}
  </MUIStepper>
);

const renderProgressStepper = ({ steps, activeStep, handleStep }) => (
  <div className="ia-styles ia-stepper progress">
    <div className="progress-steps">
      {steps.map((step, index) => (
        <div
          key={step.label}
          className={`step ${index === activeStep ? "active" : ""} ${index < activeStep ? "completed" : ""}`}
          onClick={() => handleStep(index)}
        />
      ))}
    </div>
  </div>
);

const renderClassicStepper = ({ steps, activeStep, handleStep }) => (
  <div className="ia-stepper-classic">
    <div className="stepper-steps">
      {steps.map((step, index) => (
        <div
          key={step.label}
          className={`step ${index === activeStep ? "active" : ""} ${index < activeStep ? "completed" : ""}`}
          onClick={() => handleStep(index)}
        >
          <div className="step-number">{index + 1}</div>
          <div className="step-content">
            <div className="step-label">{step.label}</div>
            {step.description && (
              <div className="step-description">{step.description}</div>
            )}
          </div>
          {index < steps.length - 1 && <div className="step-connector" />}
        </div>
      ))}
    </div>
  </div>
);

export const Stepper = ({
  steps,
  activeStep,
  orientation = "horizontal",
  handleStep,
  variant = "mui",
  ...args
}) => {
  const stepperContent = {
    mui: () =>
      renderMUIStepper({ steps, activeStep, orientation, handleStep, ...args }),
    classic: () => renderClassicStepper({ steps, activeStep, handleStep }),
    progress: () => renderProgressStepper({ steps, activeStep, handleStep }),
  };

  return stepperContent[variant]();
};

Stepper.propTypes = {
  steps: PropTypes.array,
  activeStep: PropTypes.number,
  orientation: PropTypes.oneOf(["horizontal", "vertical"]),
  handleStep: PropTypes.func,
  variant: PropTypes.oneOf(["mui", "classic", "progress"]),
};
