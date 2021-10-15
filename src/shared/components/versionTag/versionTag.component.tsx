import React from 'react';
import { Tag } from '../tag';

export const VersionTag = ({ ...other }) => {
  const appVersion = process.env.REACT_APP_VERSION || 1.0;

  return <Tag {...other}>{appVersion}</Tag>;
};
