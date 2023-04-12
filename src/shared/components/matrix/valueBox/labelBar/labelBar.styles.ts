import styled from 'styled-components';
import { color } from '../../../../../theme';
import { H2 } from '../../../../../theme/typography';
import { ReactComponent as InfoSVG } from '../../../../../images/icons/info-circle.svg';

export const Container = styled.div`
  background-color: ${color.codGray};
  border: 1px solid ${color.boulder};
  padding: 8px 24px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const LabelText = styled.span`
  ${H2};
  margin-left: auto;
`;

export const InfoIconContainer = styled.div`
  margin-left: auto;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const InfoIcon = styled(InfoSVG)`
  width: 26px;
  height: 26px;
  color: ${color.silver};
`;
