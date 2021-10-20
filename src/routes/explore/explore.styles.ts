import styled from 'styled-components';

import { zIndex } from '../../theme';
import { TitleTag as TitleTagComponent } from '../../shared/components/titleTag';
import { Toolbar as ToolbarComponent } from '../../shared/components/toolbar';
import { Loader as LoaderComponent } from '../../shared/components/loader';
import { ZoomControls as ZoomControlsComponent } from '../../shared/components/zoomControls';

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

export const SidebarWrapper = styled.div`
  height: 100%;
  width: 411px;
  min-width: 411px;
`;

type ViewerProps = {
  fullRadar: boolean;
};

export const Viewer = styled.div<ViewerProps>`
  height: 100%;
  flex: 1;
  display: flex;
  align-items: ${(props) => (props.fullRadar ? 'center' : 'flex-end')};
  justify-content: ${(props) => (props.fullRadar ? 'center' : 'flex-end')};
  width: ${(props) => (props.fullRadar ? '100%' : undefined)};
`;

export const Toolbar = styled(ToolbarComponent)`
  position: absolute;
  left: calc(50% + 205.5px);
  transform: translateX(-50%);
  bottom: 24px;
  z-index: ${zIndex.overlay};
`;

export const ZoomControls = styled(ZoomControlsComponent)`
  position: absolute;
  bottom: 24px;
  right: 35px;
`;

export const Loader = styled(LoaderComponent)`
  position: fixed;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
`;
