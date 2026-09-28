import React, { useState, useCallback } from "react";
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  DragOverlay,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useSortable, arrayMove, SortableContext } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

export const SortableAccordionList = ({
  data,
  handleMultiAccordionChange,
  checkExpand,
}) => {
  const [items, setItems] = useState(data);
  const [activeId, setActiveId] = useState(null);
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const handleDragStart = useCallback((event) => {
    setActiveId(event.active.id);
  }, []);

  const handleDragEnd = useCallback((event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setItems((items) => {
        // Extract IDs to find indices
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);
        if (oldIndex === -1 || newIndex === -1) return items;
        return arrayMove(items, oldIndex, newIndex);
      });
    }
    setActiveId(null);
  }, []);

  const handleDragCancel = useCallback(() => {
    setActiveId(null);
  }, []);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <SortableContext items={items}>
        <div className="impact-accordion-modern-main-container">
          {items.map((item) => (
            <SortableAccordionComp
              key={item.id}
              item={item}
              handleMultiAccordionChange={handleMultiAccordionChange}
              checkExpand={checkExpand}
            />
          ))}
        </div>
      </SortableContext>
      <DragOverlay
        adjustScale={false}
        style={{ width: "inherit", transformOrigin: "0 0" }}
      >
        {activeId ? (
          <SortableAccordionComp
            item={items.find((i) => i.id === activeId)}
            handleMultiAccordionChange={handleMultiAccordionChange}
            checkExpand={checkExpand}
            isDragging
            isOverlay
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

const SortableAccordionComp = ({
  item,
  handleMultiAccordionChange,
  checkExpand,
  isDragging,
  isOverlay,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: item.id,
    });

  const style = {
    transform: isDragging ? CSS.Transform.toString(transform) : undefined,
    transition: transition || undefined,
    width: "100%", // Ensures it matches the accordion width
  };

  const inlineStyles = {
    opacity: isDragging ? "0.5" : "1",
    transformOrigin: "50% 50%",
    // height: "140px",
    // width: "140px",
    borderRadius: "10px",
    cursor: isDragging ? "grabbing" : "grab",
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "column",
    boxShadow: isDragging
      ? "rgb(63 63 68 / 5%) 0px 2px 0px 2px, rgb(34 33 81 / 15%) 0px 2px 3px 2px"
      : "rgb(63 63 68 / 5%) 0px 0px 0px 1px, rgb(34 33 81 / 15%) 0px 1px 3px 0px",
    transform: isDragging ? "scale(1.05)" : "scale(1)",
    ...style,
  };

  return (
    <div
      ref={setNodeRef}
      style={inlineStyles}
      withOpacity={isDragging}
      className="impact-modern-accordion-container"
    >
      <div className="impact-modern-accordion-item">
        <div className="impact-modern-accordion-header">
          <div
            className="impact-modern-accordion-drag-icon"
            {...attributes}
            {...listeners}
            {...(isOverlay ? {} : { ...attributes, ...listeners })}
          >
            <DragIndicatorIcon />
          </div>
          <div
            className={`impact-modern-accordion-expand-icon ${checkExpand(
              item
            )}-icon`}
            onClick={(event) => {
              event.stopPropagation();
              handleMultiAccordionChange(item.value);
            }}
          >
            <KeyboardArrowRightIcon />
          </div>
          <div className="impact-modern-accordion-title">{item.header}</div>
        </div>
        <div className={`impact-modern-accordion-content ${checkExpand(item)}`}>
          {item.content}
        </div>
      </div>
    </div>
  );
};
