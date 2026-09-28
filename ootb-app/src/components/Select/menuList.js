import React, { useRef, useEffect, useState } from "react";
import { FixedSizeList as List } from "react-window";
import { components } from "react-select";
import { Loader } from "../Loader";

// MenuList using react-window for virtualization
export const MenuList = (props) => {
  const { options, children, maxHeight, isLoading } = props;
  const height = 37; // Height of each option
  const [dynamicHeight, setDynamicHeight] = useState(
    Math.min(options.length * height, maxHeight)
  );

  const listRef = useRef();

  useEffect(() => {
    const dynamicHeight = Math.min(options.length * height, maxHeight);
    setDynamicHeight(dynamicHeight);
  }, [options]);

  const handleScroll = ({ scrollOffset, scrollUpdateWasRequested }) => {
    if (!listRef.current || scrollUpdateWasRequested) return;
    const totalHeight = options.length * height;
    if (scrollOffset + dynamicHeight >= totalHeight - 2) {
      if (
        props.selectProps &&
        typeof props.selectProps.onMenuScrollToBottom === "function"
      ) {
        props.selectProps.onMenuScrollToBottom();
      }
    }
  };

  if (isLoading) {
    return (
      <components.MenuList className="menulistScroll" {...props}>
        <div className="ia-select-loading-container">
          <Loader size="small" />
        </div>
      </components.MenuList>
    );
  }

  return (
    <components.MenuList className="menulistScroll" {...props}>
      <List
        ref={listRef}
        height={dynamicHeight}
        itemCount={options.length}
        itemSize={height}
        width="100%"
        onScroll={handleScroll}
      >
        {({ index, style }) => <div style={style}>{children[index]}</div>}
      </List>
    </components.MenuList>
  );
};
