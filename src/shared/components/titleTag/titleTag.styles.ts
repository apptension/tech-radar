import styled, { css, ThemeProps } from 'styled-components';
import theme from 'styled-theming';

import { H1, H1small } from '../../../theme/typography';
import { Logo as LogoComponent } from '../logo/logo.component';
import { Link as LinkComponent } from '../link';
import { VersionTag as VersionTagComponent } from '../versionTag';
import { color } from '../../../theme';
import { TitleTagSize, TitleTagTheme } from './titleTag.types';

const titleSmallStyles = css`
  ${H1small};
`;

export const Title = styled(H1)`
  ${theme('size', {
    [TitleTagSize.SMALL]: titleSmallStyles,
  })};
`;

const titleTagSizeSmallStyles = css`
  align-items: center;
`;

const titleTagSizeLargeStyles = css`
  align-items: flex-end;
`;

export const Container = styled.div<ThemeProps<TitleTagTheme>>`
  display: flex;
  align-items: center;
`;

export const TitleWithTagWrapper = styled.div`
  display: flex;

  ${theme('size', {
    [TitleTagSize.SMALL]: titleTagSizeSmallStyles,
    [TitleTagSize.LARGE]: titleTagSizeLargeStyles,
  })};
`;

interface VersionTagProps {
  size: TitleTagSize;
}

export const VersionTag = styled(VersionTagComponent)<VersionTagProps>`
  margin-left: 16px;
  padding-top: ${({ size }) => (size === TitleTagSize.LARGE ? '7px' : '6px')};
  padding-right: ${({ size }) => (size === TitleTagSize.LARGE ? '12px' : '10px')};
  background: ${color.gradient};
`;

export const Logo = styled(LogoComponent)`
  margin-right: 16px;
`;

export const LogoLink = styled(LinkComponent)`
  line-height: 0;
  padding: 0;
`;
