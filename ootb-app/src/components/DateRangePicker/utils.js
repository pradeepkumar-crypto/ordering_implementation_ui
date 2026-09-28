export const rangeSelectorTypes = [
  { id: "custom", value: "custom", label: "Custom" },
  { id: "last7Days", value: "last7Days", label: "Last 7 Days" },
  { id: "week", value: "week", label: "Week" },
  { id: "month", value: "month", label: "Month" },
  { id: "quarter", value: "quarter", label: "Quarter" },
  { id: "year", value: "year", label: "Year" },
];

export const setStartDateOffset = (selectedRange, day) => {
  switch (selectedRange) {
    case "last7Days":
      return day.subtract(7, "days");

    case "week":
      return day.startOf("week");

    case "month":
      return day.startOf("month");

    case "quarter":
      return day.startOf("quarter");

    case "year":
      return day.startOf("year");
  }
};
export const setEndDateOffset = (selectedRange, day) => {
  switch (selectedRange) {
    case "last7Days":
      return day.subtract(0, "days");

    case "week":
      return day.endOf("week");

    case "month":
      return day.endOf("month");

    case "quarter":
      return day.endOf("quarter");

    case "year":
      return day.endOf("year");
  }
};

export const calculatePosition = ({
  containerRef,
  dropDownContainerRef,
  setPosition,
}) => {
  // console.log(containerRef);
  const scrollY = document.documentElement.scrollTop; //window.scrollY ||
  const containerPos = containerRef.current?.getBoundingClientRect(); // overall container position
  const dropPos = dropDownContainerRef.current.getBoundingClientRect(); // drop-down container position
  const docWidth = document.documentElement.clientWidth;
  const docHeight = document.documentElement.clientHeight;

  // console.log("container pos::", containerPos);
  // console.log("scrollY pos::", scrollY);
  // console.log("dropContainer pos::", dropPos);
  // console.log("document height::", docHeight);

  let pos = {
    top: containerPos?.y + scrollY,
    bottom: 0,
    left: containerPos?.x,
    right: 0,
    offsetHeight: containerPos?.width,
    offsetWidth: containerPos?.height,
  };

  //console.log("If drop-down overflow height::", dropPos.y + scrollY);

  // if dropdown container overflow outside the overall screen width
  // if (dropWidth > docWidth) {
  //   pos = { ...pos, left: "unset", right: dropPos.width + 32 };
  // }

  //if dropdown container overflow outside the overall screen height
  // if (dropHeight + scrollY > docHeight) {
  //   pos = { ...pos, top: 0 }; //containerPos.y - 320 };
  // }

  //console.log("Updated position:", pos);
  setPosition({ ...pos });
};

export const formatMomentDate = (date, dateFormat = "YYYY-MM-DD") => {
  return date?.format(dateFormat);
};
