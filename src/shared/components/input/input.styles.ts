import styled from 'styled-components';
import * as colors from '../../../theme/color';
import { ReactComponent as SearchIconSVG } from '../../../images/icons/search.svg';

export const SearchWrapper = styled.div``;

export const SearchInputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SearchInput = styled.input`
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

export const Image = styled.img`
  width: 100%;
`;
