import React from "react";
import MUIAccordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./Accordion.styles.scss";

export function Accordion({
  expanded,
  setExpanded,
  isMultiExpanded,
  data,
  onChange,
  isSingleItem,
  singleData,
  disabled,
}) {
  const handleSingleAccordionChange = (value) => {
    if (onChange) {
      onChange(value);
      return;
    }
    setExpanded(value);
  };

  const handleMultiAccordionChange = (value) => {
    if (onChange) {
      onChange(value);
      return;
    }

    if (isMultiExpanded && !expanded.includes(value)) {
      setExpanded([...expanded, value]);
    } else if (isMultiExpanded && expanded.includes(value)) {
      setExpanded(expanded.filter((item) => item !== value));
    } else if (expanded === value) {
      setExpanded("");
    } else {
      setExpanded(value);
    }
  };

  if (isSingleItem) {
    return (
      <div className="impact_accordion_main_container impact_accordion_main_container_single">
        <MUIAccordion
          className="accordion_main_container"
          defaultExpanded={expanded === singleData.value}
          onChange={() => handleSingleAccordionChange(singleData.value)}
          disabled={disabled}
        >
          <AccordionSummary
            className="accordion_header"
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            {singleData.header}
          </AccordionSummary>
          <AccordionDetails className="accordion_body">
            {singleData.content}
          </AccordionDetails>
        </MUIAccordion>
      </div>
    );
  }

  return (
    <div className="impact_accordion_main_container">
      {data.map((item, index) => {
        return (
          <MUIAccordion
            key={index}
            className="accordion_main_container"
            expanded={
              isMultiExpanded
                ? expanded.includes(item.value)
                : expanded === item.value
            }
            defaultExpanded={
              isMultiExpanded
                ? expanded.includes(item.value)
                : expanded === item.value
            }
            onChange={() => handleMultiAccordionChange(item.value)}
            disabled={disabled || item.disabled}
          >
            <AccordionSummary
              className="accordion_header"
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              {item.header}
            </AccordionSummary>
            <AccordionDetails className="accordion_body">
              {item.content}
            </AccordionDetails>
          </MUIAccordion>
        );
      })}
    </div>
  );
}
