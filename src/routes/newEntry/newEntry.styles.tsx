import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { color } from '../../theme';

const sharedStyles = `
    width: 300px;
    height: 30px;
`;

export const CenteredWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 1000px;
  width: 100%;
  padding-top: 10px;
  margin-bottom: 20px;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 760px;
  width: 100%;
  margin: 0 auto;
`;

export const StyledLabel = styled.label`
  margin: 10px 0;
`;

export const StyledInput = styled.input`
  ${sharedStyles};
`;

export const StyledSelect = styled.select`
  ${sharedStyles};
  cursor: pointer;
`;

export const StyledSubmitButton = styled.input.attrs({ type: 'submit' })`
  ${sharedStyles};
  margin-top: 20px;
  cursor: pointer;
`;

export const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 30px;
  background-color: ${color.white};
  color: ${color.black};
  text-decoration: none;
`;

export const SecondHeader = styled.h2`
  text-align: center;
`;

export const StyledParagraph = styled.p`
  text-align: center;
`;

export const TextError = styled.p`
  color: ${color.error};
`;
