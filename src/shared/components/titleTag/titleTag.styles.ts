import styled, { css, ThemeProps } from 'styled-components';
import theme from 'styled-theming';

import { H1, H1small } from '../../../theme/typography';
import { Logo as LogoComponent } from '../logo/logo.component';
import { Link as LinkComponent } from '../link';
import { VersionTag as VersionTagComponent } from '../versionTag';
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

export const VersionTag = styled(VersionTagComponent)`
  margin-left: 16px;
`;

export const Logo = styled(LogoComponent)`
  margin-right: 16px;
`;

export const LogoLink = styled(LinkComponent)`
  line-height: 0;
  padding: 0;
`;
