import styled from 'styled-components';

import * as colors from '../../theme/color';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const LogoWrapper = styled.div`
  position: fixed;
  top: 38px;
  right: 39px;
  display: flex;
  align-items: center;
`;

export const Title = styled.div`
  font-size: 20px;
  margin: 0 16px;
`;

export const VersionTag = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.silver};
  width: 46px;
  height: 26px;
  border-radius: 28px;
  font-size: 12px;
  color: ${colors.mineShaft};
`;
