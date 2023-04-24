import styled from 'styled-components';
import { color, zIndex } from '../../../theme';
import { BoldRegularText } from '../../../theme/typography';
import { Link } from '../link';

export const Container = styled.div`
  min-width: 190px;
  max-width: 350px;
  z-index: ${zIndex.header};
  background-color: ${color.codGray};
  position: fixed;
  bottom: 40px;
  right: 40px;
`;

export const FlexContainer = styled.div`
  display: flex;
  gap: 24px;
  flex-direction: column;
`;

export const LinkContainer = styled.div`
  width: 100%;
  margin-top: auto;
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
`;

export const StyledLink = styled(Link)`
  width: 100%;
  display: flex;
  justify-content: center;
`;
