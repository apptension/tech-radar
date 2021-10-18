import styled from 'styled-components';

import { ReactComponent as SearchIconSVG } from '../../../images/icons/search.svg';
import * as colors from '../../../theme/color';

export const Container = styled.div`
  padding: 70px 35px;
  color: ${colors.white};
  height: 100vh;
  max-width: 20vw;
  min-width: 411px;
`;

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

export const ListWrapper = styled.div`
  margin-top: 87px;
  margin-bottom: 25px;
  display: flex;
  flex-direction: column;
  height: 850px;
  max-height: 100%;
  overflow: scroll;
`;

export const ListItem = styled.div`
  color: ${colors.boulder};
  font-size: 18px;
  margin: 10px 0;
`;
