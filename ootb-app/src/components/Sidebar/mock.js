import React from "react";

// normal routes icon
import GridViewIcon from "@mui/icons-material/GridView";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SellIcon from "@mui/icons-material/Sell";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import StorefrontIcon from "@mui/icons-material/Storefront";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import PaymentsIcon from "@mui/icons-material/Payments";
import BackupTableIcon from "@mui/icons-material/BackupTable";
import TungstenOutlinedIcon from "@mui/icons-material/TungstenOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";

// action routes icon
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

export const routes = [
  {
    value: "des-dash",
    label: "Decision Dashboard",
    icon: <GridViewIcon />,
    link: "/decision-dashboard",
    children: [],
  },
  {
    value: "mark-cal",
    label: "Marketing Calendar",
    icon: <CalendarMonthIcon />,
    link: "/marketing-calendar",
    children: [],
  },
  {
    value: "bas-pric",
    label: "Base Price Strategies",
    icon: <SellIcon />,
    tooltip: "testing",
    link: "/base-price-strategies",
    isDisabled: true,
    children: [],
  },
  {
    value: "rules",
    label: "Rules",
    icon: <GpsFixedIcon />,
    link: "/rules",
    children: [
      {
        value: "exp-rep",
        label: "Exception Report",
        icon: <AssessmentOutlinedIcon />,
        link: "/reporting",
        children: [],
      },
      {
        value: "pric-over",
        label: "Price Override History",
        icon: <ScheduleOutlinedIcon />,
        link: "/reporting",
        children: [],
      },
    ],
  },
  {
    value: "report",
    label: "Reporting",
    icon: <BackupTableIcon />,
    link: "/reporting",
    children: [
      {
        value: "comp-pos",
        label: "Competitor Positioning",
        icon: <TungstenOutlinedIcon />,
        link: "/reporting",
        children: [],
      },
      {
        value: "price-change",
        label: "Price Change Drivers",
        icon: <PsychologyOutlinedIcon />,
        link: "/reporting",
        isDisabled: true,
        children: [],
      },
      {
        value: "comp-price",
        label: "competitor Price Data",
        icon: <PaymentsOutlinedIcon />,
        link: "/reporting",
        children: [],
      },
    ],
  },
  {
    value: "stor-prod",
    label: "Stores & Product Config",
    icon: <StorefrontIcon />,
    link: "/store-product-configuration",
    children: [],
  },
  {
    value: "prod-det",
    label: "Product Details",
    icon: <Inventory2Icon />,
    link: "/product-details",
    children: [
      {
        value: "hind-sight-dashboard",
        label: "Hindsight dashboard",
        icon: <TungstenOutlinedIcon />,
        link: "/reporting",
      },
      {
        value: "in-season",
        label: "In Season",
        icon: <PsychologyOutlinedIcon />,
        link: "/reporting",
      },
      {
        value: "pre-season",
        label: "Pre Season",
        icon: <PsychologyOutlinedIcon />,
        link: "/pre-season",
      },
      {
        value: "monsoon-season",
        label: "Monsoon Season",
        icon: <PsychologyOutlinedIcon />,
        link: "/pre-season",
      },
      {
        value: "summer-season",
        label: "Summer Season",
        icon: <PsychologyOutlinedIcon />,
        link: "/pre-season",
      },
      {
        value: "monsoon-season",
        label: "Monsoon Season",
        icon: <PsychologyOutlinedIcon />,
        link: "/pre-season",
      },
      {
        value: "summer-season",
        label: "Summer Season",
        icon: <PsychologyOutlinedIcon />,
        link: "/pre-season",
      },
      {
        value: "monsoon-season",
        label: "Monsoon Season",
        icon: <PsychologyOutlinedIcon />,
        link: "/pre-season",
      },
      {
        value: "summer-season",
        label: "Summer Season",
        icon: <PsychologyOutlinedIcon />,
        link: "/pre-season",
      },
      {
        value: "monsoon-season",
        label: "Monsoon Season",
        icon: <PsychologyOutlinedIcon />,
        link: "/pre-season",
      },
      {
        value: "summer-season",
        label: "Summer Season",
        icon: <PsychologyOutlinedIcon />,
        link: "/pre-season",
      },
    ],
  },
  {
    value: "pric-zon",
    label: "Price Zone",
    icon: <PaymentsIcon />,
    link: "/price-zone",
    children: [],
  },
  {
    value: "pric-zon1",
    label: "Price Zone 1",
    icon: <PaymentsIcon />,
    link: "/price-zone",
    children: [],
  },
];

export const actionRoutes = [
  {
    value: "setting",
    label: "Setting",
    icon: <SettingsOutlinedIcon />,
    link: "/setting",
    children: [],
  },
];
