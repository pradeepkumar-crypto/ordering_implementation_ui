import React from 'react';
import { EmptyState } from '../../components/EmptyState';

export default function ReservedPage({ section }) {
  return (
    <EmptyState
      heading={section.reserved_heading}
      description={section.reserved_body}
    />
  );
}
