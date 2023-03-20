import { useEffect } from 'react';
import { useHistory } from 'react-router';
import { useIntl } from 'react-intl';
import { ROUTES } from '../app.constants';
import { useAdminPanelContext } from '../../shared/components/adminPanel/adminPanelContext';
import { Button } from '../../shared/components/button';
import { LoginWrapper } from './login.styles';
import messages from './login.messages';

export const Login = () => {
  const history = useHistory();
  const { isLoading, user, signIn } = useAdminPanelContext();
  const intl = useIntl();

  useEffect(() => {
    if (user) {
      history.push(ROUTES.adminPanel);
    }
  }, [user]);

  return (
    <LoginWrapper>
      <p>{intl.formatMessage(messages.loginInfo)}</p>
      <Button isLoading={isLoading} onClick={signIn}>
        {intl.formatMessage(messages.signInGoogle)}
      </Button>
    </LoginWrapper>
  );
};
