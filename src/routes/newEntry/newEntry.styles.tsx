import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../../shared/components/button';
import { color } from '../../theme';

export const CenteredWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 1000px;
  width: 100%;
  padding: 24px 0;
  margin-bottom: 20px;
  margin: 0 auto;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 760px;
  width: 90%;
  margin: 0 auto;
  gap: 16px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 16px;
  width: 100%;
  justify-content: center;
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
