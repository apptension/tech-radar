import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { color } from '../../theme';

export const CenteredWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 1000px;
  width: 100%;
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
  width: 300px;
`;

export const StyledSelect = styled.select`
  width: 300px;
`;

export const StyledSubmitButton = styled.input.attrs({ type: 'submit' })`
  margin-top: 20px;
  width: 300px;
`;

export const StyledLink = styled(Link)`
  width: 150px;
  height: 50px;
  background-color: ${color.white};
  color: ${color.black};
`;
