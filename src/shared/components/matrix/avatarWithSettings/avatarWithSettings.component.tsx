import { useState } from 'react';
import { ReactComponent as ChevronDownSVG } from '../../../../images/icons/chevron-down.svg';
import { useAuthContext } from '../../../../modules/auth/auth.context';
import { Avatar, AvatarContainer, SettingsButton } from './avatarWithSettings.styles';
import { SettingsTooltip } from './settingsTooltip';

export const AvatarWithSettings = () => {
  const { user } = useAuthContext();
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  if (!user) {
    return null;
  }

  return (
    <AvatarContainer>
      <SettingsButton onClick={() => setIsTooltipOpen((isOpen) => !isOpen)}>
        <Avatar src={user?.avatar} alt="user avatar" />
        <ChevronDownSVG />
      </SettingsButton>

      {isTooltipOpen && <SettingsTooltip handleClose={() => setIsTooltipOpen(false)} />}
    </AvatarContainer>
  );
};
