import { ReactComponent as BehanceSVG } from '../../../images/icons/social-media-behance.svg';
import { ReactComponent as FbSVG } from '../../../images/icons/social-media-fb.svg';
import { ReactComponent as GithubSVG } from '../../../images/icons/social-media-github.svg';
import { ReactComponent as InstagramSVG } from '../../../images/icons/social-media-instagram.svg';
import { ReactComponent as LinkedinSVG } from '../../../images/icons/social-media-linkedin.svg';
import { Container, SocialMediaLink, SvgGradient } from './socialMediaBar.styles';

const SvgBackground = () => (
  <SvgGradient aria-hidden="true" focusable="false">
    <linearGradient id="link-hover-gradient" x2="1" y2="1" gradientTransform="rotate(-50)">
      <stop offset="0%" stopColor="#FFDE00" stopOpacity={0.8} />
      <stop offset="100%" stopColor="#42F272" stopOpacity={0.8} />
    </linearGradient>
  </SvgGradient>
);

export const SocialMediaBar = () => {
  return (
    <Container>
      <SocialMediaLink href="https://github.com/apptension">
        <GithubSVG />
      </SocialMediaLink>
      <SocialMediaLink href="https://www.behance.net/apptension">
        <BehanceSVG />
      </SocialMediaLink>
      <SocialMediaLink href="https://www.instagram.com/apptension">
        <InstagramSVG />
      </SocialMediaLink>
      <SocialMediaLink href="https://www.facebook.com/apptension">
        <FbSVG />
      </SocialMediaLink>
      <SocialMediaLink href="https://linkedin.com/company/apptension">
        <LinkedinSVG />
      </SocialMediaLink>
      <SvgBackground />
    </Container>
  );
};
