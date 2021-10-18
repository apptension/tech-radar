import styled from 'styled-components';

import { H1, Paragraph } from '../../theme/typography';
import { LastUpdateInfo as LastUpdateInfoComponent } from '../../shared/components/lastUpdateInfo';

export const Container = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
`;

export const LogoWrapper = styled.div`
  height: 50px;
`;

export const Content = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: flex-start;
  padding-top: 110px;
  max-width: 1500px;
  margin: 0 auto;
`;

export const TextContent = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 56px;
  text-align: center;
  max-width: 722px;
`;

export const RadarContent = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-end;
`;

export const Image = styled.img`
  width: 100%;
`;

export const Title = styled(H1)``;

export const Description = styled(Paragraph)`
  margin: 48px 0;
`;

export const LastUpdateInfo = styled(LastUpdateInfoComponent)`
  position: absolute;
  bottom: 24px;
  right: 35px;
`;
