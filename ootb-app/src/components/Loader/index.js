import React, { useMemo } from "react";

import "./Loader.styles.scss";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

export const Loader = ({
  size = "large",
  progress = "",
  showSkeleton = false,
  text = "Loading...",
}) => {
  const getSkeletonDimensions = (size) => {
    switch (size) {
      case "small":
        return { circular: 20, rectangularWidth: 200, rectangularHeight: 10 };
      case "medium":
        return { circular: 25, rectangularWidth: 250, rectangularHeight: 12 };
      case "large":
      default:
        return { circular: 30, rectangularWidth: 268, rectangularHeight: 12 };
    }
  };

  const skeletonDimensions = useMemo(() => getSkeletonDimensions(size), [size]);

  if (showSkeleton) {
    return (
      <Box display="flex" alignItems="center">
        <Skeleton
          variant="rectangular"
          width={skeletonDimensions.circular}
          height={skeletonDimensions.circular}
          sx={{ borderRadius: 1 }}
        />
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          ml={2}
        >
          <Skeleton
            variant="rectangular"
            width={skeletonDimensions.rectangularWidth}
            height={skeletonDimensions.rectangularHeight}
            style={{ marginBottom: 4 }}
          />
          <Skeleton
            variant="rectangular"
            width={skeletonDimensions.rectangularWidth}
            height={skeletonDimensions.rectangularHeight}
          />
        </Box>
      </Box>
    );
  }

  return (
    <div className="ia-styles ia-loader-container">
      <div className={`ia-styles ia-loader-outer ia-loader-${size}`}>
        <div className={`ia-loader ia-loader-inner`}>
          {size !== "small" && progress}
        </div>
      </div>

      {(progress || text) && <div className="ia-loaderText">{text}</div>}
    </div>
  );
};
