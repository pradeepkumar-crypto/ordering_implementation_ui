import React from "react";
import FilledIconLabelBadges from "./filledIconLabelBadges";
import FilledOnlyIconBadges from "./filledOnlyIconBadges";
import FilledOnlyLabelBadges from "./filledOnlyLabelBadges";

export default function FilledBadges({ label, icon, color, isIcon, ...args }) {
  if (isIcon && label) {
    return (
      <FilledIconLabelBadges
        label={label}
        icon={icon}
        color={color}
        {...args}
      />
    );
  }

  if (isIcon && !label) {
    return (
      <FilledOnlyIconBadges
        icon={icon}
        color={color}
        isIcon={isIcon}
        {...args}
      />
    );
  }

  return <FilledOnlyLabelBadges label={label} color={color} {...args} />;
}
