import { Tag } from '../tag';

import { version } from '../../../../package.json';

export const VersionTag = ({ ...other }) => {
  const appVersion = version || 1.0;

  return <Tag {...other}>{appVersion}</Tag>;
};
