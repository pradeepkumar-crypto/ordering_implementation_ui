import React from "react";
import { DynamicLayout } from "../DynamicLayout";
import { Button } from "../Button";
import { Stepper } from "../Stepper";
import "./CreateItemFlow.styles.scss";

export const CreateItemFlow = ({
  step = 1,
  totalSteps = 3,
  leftPanelWidth = 400,
  headings = [],
  children,
  onCancel,
  onNext,
  onPrev,
  onStepClick,
  stepperVariant = "progress",
  leftPanelTitle = "Create item",
  leftPanelDescription = "",
  leftPanelImage = null,
  actionsChildren = null,
}) => {
  const formatSteps = () => {
    let steps = [];
    for (let index = 0; index < totalSteps; index++) {
      steps.push({
        label: `Step ${index + 1}`,
        description: `Step ${index + 1} of ${totalSteps}`,
      });
    }
    return steps;
  };

  const LeftPanel = () => (
    <div className="left-panel-content">
      <div className="left-panel-title">
        <h1>{leftPanelTitle}</h1>
        <p>{leftPanelDescription}</p>
      </div>
      {leftPanelImage}
    </div>
  );

  const RightContent = ({ contentRef, hasScroll }) => (
    <>
      <Stepper
        steps={formatSteps()}
        activeStep={step - 1}
        handleStep={(index) => onStepClick && onStepClick(index + 1)}
        orientation="horizontal"
        variant={stepperVariant}
      />
      <div
        ref={contentRef}
        className={`content-wrapper ${!hasScroll ? "no-scroll" : ""}`}
      >
        {headings.map((heading, index) => (
          <div key={index} className="heading">
            <h2>{heading}</h2>
            {React.Children.toArray(children)[index]}
          </div>
        ))}
      </div>

      {actionsChildren ? (
        <div className="actions">{actionsChildren}</div>
      ) : (
        <div className="actions">
          {step === 1 ? (
            <Button variant="secondary" onClick={onCancel}>
              Cancel
            </Button>
          ) : (
            <Button variant="secondary" onClick={onPrev}>
              Previous
            </Button>
          )}
          <Button variant="primary" onClick={onNext}>
            {step === totalSteps ? "Submit" : "Next"}
          </Button>
        </div>
      )}
    </>
  );

  return (
    <DynamicLayout
      leftPanel={<LeftPanel />}
      rightContent={<RightContent />}
      leftPanelWidth={leftPanelWidth}
    />
  );
};
