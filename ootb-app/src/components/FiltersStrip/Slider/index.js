import React, {
  Fragment,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import "./FilterSlider.styles.scss";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import PortalDropDown from "./Portal";

export default function FilterSlider({
  list,
  width,
  isExpanded = true,
  handleExpandClick,
  tagsChildren,
  containerChildren,
  setShowSeparator,
  onNextClick,
  onPrevClick,
  currDropShow,
  handleClickOutside = () => {},
}) {
  const [overFlow, setOverFlow] = useState(false);
  const [currCount, setCurrCount] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [maxTranslateX, setMaxTranslateX] = useState(0);
  const [dropdownPosition, setDropdownPosition] = useState({
    x: 0,
    y: 0,
    width: 200,
  });
  const tagContainer = useRef(null);
  const filtersContainer = useRef([]);
  const prevItemWidth = useRef(0);
  const prevCount = useRef(currCount);
  const memoizedHandleClickOutside = useCallback(handleClickOutside, []);

  const handleCloseClick = () => {
    setCurrCount(0);
    setTranslateX(0);
    if (handleExpandClick) handleExpandClick();
  };
  useLayoutEffect(() => {
    if (tagContainer.current) {
      const container = tagContainer.current;
      setOverFlow(container.scrollWidth > container.clientWidth);
      if (setShowSeparator) {
        setShowSeparator(container.scrollWidth > container.clientWidth);
      }
    }
  }, [tagContainer, list]);

  useEffect(() => {
    if (tagContainer.current) {
      const containerWidth = tagContainer.current.clientWidth;
      const totalWidth = filtersContainer.current.reduce(
        (acc, el) => acc + el.offsetWidth,
        0,
      );
      let lastItemWidth = 0;
      if (filtersContainer.current.length > 2) {
        lastItemWidth =
          filtersContainer.current[filtersContainer.current.length - 1]
            .offsetWidth || 0;
      }
      setMaxTranslateX(totalWidth - containerWidth + lastItemWidth);
    }
  }, [list]);

  useEffect(() => {
    if (filtersContainer.current[currCount]) {
      const itemWidth = filtersContainer.current[currCount].offsetWidth;
      let newTranslateX = translateX;

      if (currCount > prevCount.current) {
        newTranslateX += itemWidth;
      } else if (currCount < prevCount.current) {
        newTranslateX -= prevItemWidth.current;
      }

      newTranslateX = Math.min(newTranslateX, maxTranslateX);
      newTranslateX = Math.max(newTranslateX, 0);

      setTranslateX(newTranslateX);
      prevItemWidth.current = itemWidth;
      prevCount.current = currCount;
    }
  }, [currCount, maxTranslateX]);

  useEffect(() => {
    const handleMouseDown = (event) => {
      memoizedHandleClickOutside(event);
    };
    document.addEventListener("mousedown", handleMouseDown);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, [memoizedHandleClickOutside]);

  const handlePrevClick = () => {
    if (onPrevClick) onPrevClick();
    if (currCount > 0) {
      setCurrCount((prev) => prev - 1); // Prevent going out of bounds
    }
  };

  const handleNextClick = () => {
    if (onNextClick) onNextClick();
    if (currCount < list.length - 2) {
      setCurrCount((prev) => prev + 1);
    }
  };

  const handleTagClick = (index) => {
    if (filtersContainer.current[index]) {
      const rect = filtersContainer.current[index].getBoundingClientRect();
      setDropdownPosition({ x: rect.right, y: rect.bottom, width: rect.width });
    }
  };

  if (!Array.isArray(list)) return null;
  return (
    <div
      className="impact-selected-filter-container"
      style={{ width: width ? width : "100%" }}
    >
      <div
        className={`impact-selected-filter-tags ${!isExpanded && "collapsed"}`}
        ref={tagContainer}
      >
        {Array.isArray(list) &&
          list.map((item, index) => {
            return (
              <div
                className="impact-selected-filter-wrapper"
                key={item.id}
                style={{
                  transform: `translateX(-${translateX}px)`,
                }}
                ref={(el) => {
                  if (el) {
                    filtersContainer.current[index] = el; // Dynamically assign each ref
                  }
                }}
                onClick={() => handleTagClick(index)}
              >
                {containerChildren ? containerChildren(item, index) : null}
                <div className="impact-selected-filter-tags-container">
                  {tagsChildren ? tagsChildren(item, index) : null}
                </div>
                {currDropShow === index && (
                  <PortalDropDown
                    tags={item?.values.slice(2, 5)}
                    filtersContainer={filtersContainer}
                    index={index}
                    showButton={item.values.length > 6}
                    tag={item}
                    viewAllAction={item.handleViewAll}
                    position={dropdownPosition}
                  />
                )}
              </div>
            );
          })}
      </div>
      {overFlow ? (
        <div className="impact-selected-filter-action-btns">
          {isExpanded ? (
            <Fragment>
              <div
                className="impact-selected-filter-action-btn prev"
                role="button"
                style={{ opacity: currCount === 0 ? "0.5" : 1 }}
                onClick={handlePrevClick}
              >
                <KeyboardArrowLeftIcon />
              </div>
              <div
                className="impact-selected-filter-action-btn next"
                role="button"
                style={{ opacity: currCount === list.length - 2 ? "0.5" : 1 }}
                onClick={handleNextClick}
              >
                <KeyboardArrowRightIcon />
              </div>
              {handleExpandClick && (
                <div
                  className="impact-selected-filter-action-btn next"
                  role="button"
                  style={{ opacity: currCount === list.length ? "0.5" : 1 }}
                  onClick={handleCloseClick}
                >
                  <CloseOutlinedIcon fontSize="small" />
                </div>
              )}
            </Fragment>
          ) : (
            <div
              className="impact-selected-filter-action-btn expand"
              role="button"
              style={{ opacity: currCount === list.length ? "0.5" : 1 }}
              onClick={handleExpandClick}
            >
              <p>{"+" + list.length}</p> <ChevronRightOutlinedIcon />
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
