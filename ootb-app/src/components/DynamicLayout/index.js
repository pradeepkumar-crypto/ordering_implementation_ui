import React, { useRef, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import "./DynamicLayout.styles.scss";

export const DynamicLayout = ({
  leftPanel,
  rightContent,
  leftPanelWidth = 400,
  className,
  ...props
}) => {
  const contentRef = useRef(null);
  const [hasScroll, setHasScroll] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      if (contentRef.current) {
        const hasScrollbar =
          contentRef.current.scrollHeight > contentRef.current.clientHeight;
        setHasScroll(hasScrollbar);
      }
    };

    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [rightContent]);

  return (
    <Box className={`dynamic-layout-container ${className || ""}`} {...props}>
      <Box
        className="left-panel"
        style={{
          width: leftPanelWidth,
        }}
      >
        {leftPanel}
      </Box>
      <Box className="right-content">
        {React.cloneElement(rightContent, { contentRef, hasScroll })}
      </Box>
    </Box>
  );
};
