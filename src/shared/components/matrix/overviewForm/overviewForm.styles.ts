import styled from 'styled-components';
import { H2 } from '../../../../theme/typography';
import { ValueBox } from '../valueBox';

export const EditButton = styled.button`
  border: none;
  background-color: transparent;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const SectionTitle = styled.h2`
  ${H2};
`;

export const SectionHeader = styled.header`
  display: flex;
  align-items: center;
  gap: 18px;
`;

export const BoxesContainer = styled.div`
  display: flex;
  gap: 30px;
`;

export const SectionContainer = styled.section``;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

export const TextValueBox = styled(ValueBox)`
  padding-right: 0 !important;
  padding-bottom: 10px !important;
`;
