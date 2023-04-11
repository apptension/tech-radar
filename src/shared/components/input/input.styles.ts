import styled from 'styled-components';
import * as colors from '../../../theme/color';
import { ReactComponent as SearchIconSVG } from '../../../images/icons/search.svg';
import { ReactComponent as CloseIconSVG } from '../../../images/icons/close.svg';
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
  padding: 1px 2px;

  ::placeholder {
    color: ${colors.boulder};
  }
`;

export const SearchIcon = styled(SearchIconSVG)`
  height: 100%;
`;

export const CloseIcon = styled(CloseIconSVG)`
  height: 100%;
`;

export const CloseButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

export const InputUnderline = styled.div`
  height: 2px;
  background: ${colors.gradient};
`;
