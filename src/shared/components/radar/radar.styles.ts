import styled from 'styled-components';

type ContainerProps = {
  fullRadar: boolean;
};

export const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: ${(props) => (props.fullRadar ? 'center' : 'flex-end')};
  justify-content: ${(props) => (props.fullRadar ? 'center' : 'flex-end')};
  width: ${(props) => (props.fullRadar ? '100%' : undefined)};
`;
