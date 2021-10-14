import styled from 'styled-components';
import { TitleTag as TitleTagComponent } from '../../shared/components/titleTag';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const TitleTag = styled(TitleTagComponent)`
  position: fixed;
  top: 38px;
  right: 39px;
  display: flex;
  align-items: center;
`;
