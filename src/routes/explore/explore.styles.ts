import styled, { css } from 'styled-components';

import { color, zIndex } from '../../theme';
import { TitleTag as TitleTagComponent } from '../../shared/components/titleTag';
import { Toolbar as ToolbarComponent } from '../../shared/components/toolbar';
import { Loader as LoaderComponent } from '../../shared/components/loader';
import { SIDEBAR_WIDTH } from '../../shared/components/radar/radar.constants';
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
    top: 32px;
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
  margin: 87px auto 0;
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const Toolbar = styled(ToolbarComponent)`
  position: absolute;
  left: calc(50% + ${SIDEBAR_WIDTH / 2}px);
  transform: translateX(-50%);
  bottom: 24px;
  z-index: ${zIndex.contentOverlay};
  max-width: calc(100% - ${SIDEBAR_WIDTH}px);
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

export const Error = styled.div<{ shouldDisplay: boolean }>`
  position: absolute;
  width: 100vw;
  bottom: 100px;
  background: ${color.codGray};
  z-index: ${zIndex.loader};
  display: ${({ shouldDisplay }) => (shouldDisplay ? 'flex' : 'none')};
  justify-content: center;
`;

export const Tooltip = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  max-width: 397px;
  opacity: 0;
  visibility: hidden;
  transition: opacity 200ms ease-in-out 250ms;
  width: fit-content;
`;

export const TooltipArrow = styled.div`
  position: absolute;
  width: 18px;
  height: 18px;
  background-color: ${color.mineShaft};
  transform-origin: center center;
  transform: rotate(45deg);
`;

export const TooltipContent = styled.p`
  position: relative;
  padding: 16px;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  width: 100%;
  background-color: ${color.mineShaft};
  box-shadow: 0 12px 8px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  color: ${color.silver};
  margin: 0;
`;
