import styled from 'styled-components';
import { InfoText, Title } from '../titleHeader/titleHeader.styles';

export const Header = styled.header`
  display: flex;
  max-width: 1000px;
`;

export const FinalStepHeader = styled(Header)`
  flex-direction: column;
  margin-bottom: 80px;
`;

export const FinalStepProgressContainer = styled.div`
  display: flex;
`;

export const FormProgressWrapper = styled.div`
  margin-right: 30px;
`;

export const FinalStepTitle = styled(Title)`
  margin-bottom: 40px;
  line-height: 61px;
`;

export const HeaderInfoText = styled(InfoText)``;
