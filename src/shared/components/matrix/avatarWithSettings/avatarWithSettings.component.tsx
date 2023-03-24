import { useRef, useState } from 'react';
import { ReactComponent as ChevronDownSVG } from '../../../../images/icons/chevron-down.svg';
import { useAuthContext } from '../../../../modules/auth/auth.context';
import { useOutsideClick } from '../../../hooks/useOutsideClick/useOutsideClick.hook';
import { Avatar, AvatarContainer, SettingsButton } from './avatarWithSettings.styles';
import { SettingsTooltip } from './settingsTooltip';

export const AvatarWithSettings = () => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const avatarRef = useRef(null);

  const { user } = useAuthContext();
  useOutsideClick(avatarRef, () => setIsTooltipOpen(false));

  if (!user) {
    return null;
  }

  return (
    <AvatarContainer ref={avatarRef}>
      <SettingsButton onClick={() => setIsTooltipOpen((isOpen) => !isOpen)}>
        <Avatar src={user?.avatar} alt="user avatar" />
        <ChevronDownSVG />
      </SettingsButton>

      {isTooltipOpen && <SettingsTooltip handleClose={() => setIsTooltipOpen(false)} />}
    </AvatarContainer>
  );
};
