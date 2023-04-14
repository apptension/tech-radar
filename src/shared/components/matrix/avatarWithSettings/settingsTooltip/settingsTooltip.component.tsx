import { useIntl } from 'react-intl';
import { ROUTES } from '../../../../../routes/app.constants';
import { ReactComponent as UserSVG } from '../../../../../images/icons/user.svg';
import { ReactComponent as LogoutSVG } from '../../../../../images/icons/logout.svg';
import { useAuthContext } from '../../../../../modules/auth/auth.context';
import { Container, Option, OptionButton, OptionIconContainer, OptionText, StyledLink } from './settingsTooltip.styles';
import settingsTooltipMessages from './settingsTooltip.messages';

interface SettingsTooltipProps {
  handleClose: () => void;
}

export const SettingsTooltip = ({ handleClose }: SettingsTooltipProps) => {
  const { logout } = useAuthContext();
  const intl = useIntl();

  return (
    <Container>
      <Option>
        <StyledLink onClick={handleClose} to={ROUTES.myProfile}>
          <OptionIconContainer>
            <UserSVG />
          </OptionIconContainer>
          <OptionText>{intl.formatMessage(settingsTooltipMessages.myProfile)}</OptionText>
        </StyledLink>
      </Option>

      <Option>
        <OptionButton onClick={logout}>
          <OptionIconContainer>
            <LogoutSVG />
          </OptionIconContainer>
          <OptionText>{intl.formatMessage(settingsTooltipMessages.logOut)}</OptionText>
        </OptionButton>
      </Option>
    </Container>
  );
};
