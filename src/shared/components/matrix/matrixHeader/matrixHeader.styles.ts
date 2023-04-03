import styled from 'styled-components';

export const Header = styled.header`
  position: absolute;
  padding-top: 32px;
  padding-right: 36px;
  display: flex;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
`;

export const Photo = styled.img`
  max-width: 100%;
`;

export const AvatarContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const Avatar = styled.img`
  width: 32px;
  height: 32px;
  margin-left: 24px;
  border-radius: 50%;
`;

export const SettingsButton = styled.button`
  display: flex;
  align-items: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;
