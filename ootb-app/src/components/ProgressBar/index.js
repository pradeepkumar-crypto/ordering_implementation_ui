import React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import "./ProgressBar.styles.scss";

export function ProgressBar(props) {
  const { value = 10, showTime = true, time = 30, customLabel } = props;
  return (
    <div className="progressbar_layout">
      <div className="progress_container progress_container_err">
        <div className="progressbar_label_container">
          {customLabel ? (
            <div className="label_name">{customLabel}</div>
          ) : (
            <div className="label_name">
              {`${Math.round(value)}%`}{" "}
              {showTime ? `| ${time} Seconds left` : null}
            </div>
          )}
        </div>
        <div className="progressbar_status">
          <LinearProgress variant="determinate" {...props} />
        </div>
      </div>
    </div>
  );
}
