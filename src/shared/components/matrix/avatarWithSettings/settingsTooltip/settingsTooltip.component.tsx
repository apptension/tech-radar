import { ROUTES } from '../../../../../routes/app.constants';
import { ReactComponent as UserSVG } from '../../../../../images/icons/user.svg';
import { ReactComponent as LogoutSVG } from '../../../../../images/icons/logout.svg';
import { useAuthContext } from '../../../../../modules/auth/auth.context';
import { Container, Option, OptionButton, OptionIconContainer, OptionText, StyledLink } from './settingsTooltip.styles';

interface SettingsTooltipProps {
  handleClose: () => void;
}

export const SettingsTooltip = ({ handleClose }: SettingsTooltipProps) => {
  const { logout } = useAuthContext();

  return (
    <Container>
      <Option>
        <StyledLink onClick={handleClose} to={ROUTES.myProfile}>
          <OptionIconContainer>
            <UserSVG />
          </OptionIconContainer>
          <OptionText>My profile</OptionText>
        </StyledLink>
      </Option>

      <Option>
        <OptionButton onClick={logout}>
          <OptionIconContainer>
            <LogoutSVG />
          </OptionIconContainer>
          <OptionText>Log out</OptionText>
        </OptionButton>
      </Option>
    </Container>
  );
};
