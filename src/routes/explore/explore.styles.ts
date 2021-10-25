import styled, { css } from 'styled-components';

import { color, zIndex } from '../../theme';
import { TitleTag as TitleTagComponent } from '../../shared/components/titleTag';
import { Toolbar as ToolbarComponent } from '../../shared/components/toolbar';
import { Loader as LoaderComponent } from '../../shared/components/loader';
import { ZoomControls as ZoomControlsComponent } from '../../shared/components/zoomControls';
import { SIDEBAR_WIDTH, ZOOM_BUTTONS_WIDTH } from '../../shared/components/radar/radar.constants';
import { mediaQuery } from '../../theme/media';

export const LOADING_ANIMATION_MS = 500;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
`;

export const TitleTag = styled(TitleTagComponent)`
  position: absolute;
  top: 30px;
  left: 24px;
  right: initial;
  z-index: ${zIndex.overlay};
  display: flex;
  align-items: center;

  ${mediaQuery.desktop} {
    top: 38px;
    left: initial;
    right: 39px;
  }
`;

export const SidebarWrapper = styled.div`
  height: 100%;
  width: 100%;

  ${mediaQuery.desktop} {
    width: 411px;
    min-width: 411px;
  }
`;

export const Viewer = styled.div`
  height: 100%;
  flex: 1;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
`;

export const Toolbar = styled(ToolbarComponent)`
  position: absolute;
  left: calc(50% + ${SIDEBAR_WIDTH / 2}px - ${ZOOM_BUTTONS_WIDTH}px);
  transform: translateX(-50%);
  bottom: 24px;
  z-index: ${zIndex.contentOverlay};
  max-width: calc(100% - ${SIDEBAR_WIDTH}px - ${ZOOM_BUTTONS_WIDTH}px);
`;

export const ZoomControls = styled(ZoomControlsComponent)`
  position: absolute;
  bottom: 24px;
  right: 35px;
`;

export const Loader = styled(LoaderComponent)`
  position: absolute;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  transition: transform ${LOADING_ANIMATION_MS}ms ease-in-out;
`;

const loadingAnimationStyles = css`
  opacity: 0;

  ${Loader} {
    transform: translate(-50%) scale(0.5);
  }
`;

export const Loading = styled.div<{ visible: boolean; shouldDisplay: boolean }>`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: ${color.codGray};
  opacity: 1;
  transition: opacity ${LOADING_ANIMATION_MS}ms ease-in-out;
  z-index: ${zIndex.loader};
  ${({ visible }) => (visible ? null : loadingAnimationStyles)};
  display: ${({ shouldDisplay }) => (shouldDisplay ? 'block' : 'none')};
`;
