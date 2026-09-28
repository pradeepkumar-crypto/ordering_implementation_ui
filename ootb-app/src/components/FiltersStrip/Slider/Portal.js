import ReactDOM from "react-dom";
import { Button } from "../../Button";
import React from "react";

const Portal = (props) => {
  return ReactDOM.createPortal(props.children, props.container);
};

const PortalDropDown = (props) => {
  const {
    filtersContainer,
    index,
    tags,
    showButton,
    tag,
    viewAllAction,
    position,
  } = props;

  if (!filtersContainer) return null;
  return (
    <Portal container={document.body}>
      <div
        className="impact-selected-filter-tags-dropdown"
        style={{
          top: position.y + 18,
          // this 200 is max width of the dropdown
          left:
            position.width > 200
              ? position.x - 200
              : position.x - position.width,
          width: position.width + "px",
        }}
      >
        <div className="impact-selected-filter-tag-container">
          {tags.map((tag, index) => {
            return (
              <div key={index} className="impact-selected-filter-tag-label">
                {tag.label}
              </div>
            );
          })}
        </div>
        {showButton && (
          <div className="impact-selected-filter-tags-actions-container">
            <div className="impact-notification-horizontal-separator" />
            <Button
              className=""
              iconPlacement="left"
              onClick={() => viewAllAction(tag)}
              size="large"
              variant="text"
            >
              {`View all (${tag.values.length})`}
            </Button>
          </div>
        )}
      </div>
    </Portal>
  );
};

export default PortalDropDown;
