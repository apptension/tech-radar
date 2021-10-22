import styled from 'styled-components';
import * as colors from '../../../theme/color';
import { ReactComponent as SearchIconSVG } from '../../../images/icons/search.svg';

export const Container = styled.div``;

export const InputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
`;

export const InputComponent = styled.input`
  font-size: 20px;
  background-color: transparent;
  border: none;
  outline: none;
  width: 100%;
  color: ${colors.white};
  ::placeholder {
    color: ${colors.boulder};
  }
`;

export const SearchIcon = styled(SearchIconSVG)`
  height: 100%;
`;

export const InputUnderline = styled.div`
  height: 2px;
  background: ${colors.gradient};
`;
