import styled from 'styled-components';

import { TitleTag as TitleTagComponent } from '../../shared/components/titleTag';
import { Radar as RadarComponent } from '../../shared/components/radar';
import { Toolbar as ToolbarComponent } from '../../shared/components/toolbar';
import { zIndex } from '../../theme';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
`;

export const TitleTag = styled(TitleTagComponent)`
  position: absolute;
  top: 38px;
  right: 39px;
  display: flex;
  align-items: center;
  z-index: ${zIndex.overlay};
`;

export const Sidebar = styled.div`
  height: 100%;
  width: 411px;
`;

export const Viewer = styled.div`
  height: 100%;
  flex: 1;
  position: relative;
`;

export const Radar = styled(RadarComponent)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

export const Toolbar = styled(ToolbarComponent)`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 24px;
  z-index: ${zIndex.overlay};
`;
