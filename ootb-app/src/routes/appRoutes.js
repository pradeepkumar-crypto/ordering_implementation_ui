import React from 'react';
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import LayersOutlinedIcon from '@mui/icons-material/LayersOutlined';
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import { routes as demoRoutes, actionRoutes } from '../components/Sidebar/mock';
import { NAV_SECTIONS } from '../data/ootbData';

const ICONS = {
  checklist: <ChecklistOutlinedIcon />,
  database: <TableChartOutlinedIcon />,
  layers: <LayersOutlinedIcon />,
  code: <CodeOutlinedIcon />,
  map: <GridViewOutlinedIcon />,
};

export const OOTB_BASE_PATH = '/ootb';

export const ootbRoute = {
  value: 'ootb',
  label: 'OOTB',
  icon: <ChecklistOutlinedIcon />,
  link: `${OOTB_BASE_PATH}/${NAV_SECTIONS[0].id}`,
  children: NAV_SECTIONS.map((s) => ({
    value: s.id,
    label: s.label,
    icon: ICONS[s.icon] || <LayersOutlinedIcon />,
    link: `${OOTB_BASE_PATH}/${s.id}`,
  })),
};

export const routes = [ootbRoute, ...demoRoutes];
export { actionRoutes };
