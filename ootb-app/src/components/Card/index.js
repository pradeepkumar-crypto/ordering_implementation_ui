import React from "react";
import MUICard from "@mui/material/Card";
import "./Card.styles.scss";

export const Card = ({ size, children, ...args }) => {
  return (
    <MUICard
      className={`ia-styles ia-card ia-card-${size}`}
      {...args}
      sx={{
        padding: "20px",
        width: "100%",
        maxWidth: 500,
        minHeight: 300,
        ...args.sx,
      }}
    >
      {children}
    </MUICard>
  );
};
