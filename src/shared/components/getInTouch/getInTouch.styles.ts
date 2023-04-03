import styled from 'styled-components';
import { color, zIndex } from '../../../theme';
import { BoldRegularText, H1small } from '../../../theme/typography';

export const Container = styled.div`
  position: absolute;
  bottom: 0;
  z-index: ${zIndex.header};
  background-color: ${color.codGray};
  border: 1px solid ${color.white};
  padding: 40px;
  display: flex;
  align-items: flex-end;
  height: 192px;
`;

export const LeftSideContainer = styled.div`
  min-width: 190px;
`;

export const Text = styled.p`
  ${H1small};
  margin-bottom: 16px;
`;

export const ContactOption = styled.div`
  padding: 12px 14px;
  border: 1px solid ${color.white};
  display: flex;
  align-items: center;
`;

export const ContactText = styled.a`
  ${BoldRegularText};
  text-decoration: none;
  color: ${color.white};
  letter-spacing: 0;
  margin-left: 13px;
`;

export const ContactsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 17px;
`;
