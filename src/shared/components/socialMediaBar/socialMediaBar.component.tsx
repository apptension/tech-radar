import { ReactComponent as BehanceSVG } from '../../../images/icons/social-media-behance.svg';
import { ReactComponent as FbSVG } from '../../../images/icons/social-media-fb.svg';
import { ReactComponent as GithubSVG } from '../../../images/icons/social-media-github.svg';
import { ReactComponent as InstagramSVG } from '../../../images/icons/social-media-instagram.svg';
import { ReactComponent as LinkedinSVG } from '../../../images/icons/social-media-linkedin.svg';
import { Container } from './socialMediaBar.styles';

export const SocialMediaBar = () => {
  return (
    <Container>
      <a href="https://github.com/apptension" target="_blank" rel="noreferrer">
        <GithubSVG />
      </a>
      <a href="https://www.behance.net/apptension" target="_blank" rel="noreferrer">
        <BehanceSVG />
      </a>
      <a href="https://www.instagram.com/apptension" target="_blank" rel="noreferrer">
        <InstagramSVG />
      </a>
      <a href="https://www.facebook.com/apptension" target="_blank" rel="noreferrer">
        <FbSVG />
      </a>
      <a href="https://linkedin.com/company/apptension" target="_blank" rel="noreferrer">
        <LinkedinSVG />
      </a>
    </Container>
  );
};
