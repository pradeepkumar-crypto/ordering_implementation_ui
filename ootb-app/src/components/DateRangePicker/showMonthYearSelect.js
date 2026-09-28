import React, { useState } from "react";
import moment from "moment";
import { Select } from "../Select";

export default function ShowMonthYearSelect({
  customYears,
  month,
  onMonthSelect,
  onYearSelect,
}) {
  const currentYear = new Date().getFullYear();
  const yrs = Array.from({ length: 10 }, (_, index) => {
    const year = (currentYear - 5 + index).toString();
    return { label: year, value: year };
  });
  const years = customYears && customYears.length > 0 ? customYears : yrs;
  const months = moment.months().map((label, value) => {
    return {
      label,
      value,
    };
  });

  const [open1, setOpen1] = useState(false);
  const [currentOptions1, setCurrentOptions1] = useState(months);
  const [open2, setOpen2] = useState(false);
  const [currentOptions2, setCurrentOptions2] = useState(years);

  // Always derive selected options from the month prop
  const selectedOptions1 = {
    label: month.format("MMMM"),
    value: month.month(),
  };
  const selectedOptions2 = {
    label: month.year().toString(),
    value: month.year().toString(),
  };

  return (
    <div className="date-range-picker-show-month-year-select-container">
      <div className="date-range-picker-month-select-container">
        <Select
          name="year-select"
          withPortal
          isWithSearch
          placeholder="month"
          dropDownPortalClassName={"date-range-picker-month-select-dropdown"}
          isOpen={open1}
          setIsOpen={setOpen1}
          currentOptions={currentOptions1}
          setCurrentOptions={setCurrentOptions1}
          initialOptions={months}
          selectedOptions={selectedOptions1}
          setSelectedOptions={() => {}}
          handleChange={(val) => {
            onMonthSelect(month, val.value);
          }}
          minWidth="80px"
        />
      </div>
      <div className="date-range-picker-year-select-container">
        <Select
          name="month-select"
          placeholder="year"
          isWithSearch
          withPortal
          dropDownPortalClassName={"date-range-picker-year-select-dropdown"}
          isOpen={open2}
          setIsOpen={setOpen2}
          currentOptions={currentOptions2}
          setCurrentOptions={setCurrentOptions2}
          initialOptions={years}
          selectedOptions={selectedOptions2}
          setSelectedOptions={() => {}}
          handleChange={(val) => {
            onYearSelect(month, val.value);
          }}
          minWidth="66px"
        />
      </div>
      {/* <select
        value={month.month()}
        onChange={(e) => {
          console.log(month, e.target.value);
          onMonthSelect(month, e.target.value);
        }}
      >
        {moment.months().map((label, value) => (
          <option value={value}>{label}</option>
        ))}
      </select>

      <select
        value={month.year()}
        onChange={(e) => onYearSelect(month, e.target.value)}
      >
        {currentOptions2.map((item) => (
          <option value={item.value}>{item.label}</option>
        ))}
      </select> */}
    </div>
  );
}
