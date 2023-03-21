import styled from 'styled-components';

export const AvatarContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 4px;
`;

export const SettingsButton = styled.button`
  display: flex;
  align-items: center;
  background-color: transparent;
  border: none;
  margin-left: 24px;
  cursor: pointer;
  padding: 0;
`;
