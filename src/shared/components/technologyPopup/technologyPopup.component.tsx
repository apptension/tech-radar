import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage, useIntl } from 'react-intl';
import { selectTechnologyId } from '../../../modules/technologyPopup/technologyPopup.selectors';
import { RadarTechnology } from '../radar/radar.types';
import { ReactComponent as CloseSVG } from '../../../images/icons/close.svg';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { Breakpoint } from '../../../theme/media';
import { closeTechnologyPopup } from '../../../modules/technologyPopup/technologyPopup.actions';
import { ReactComponent as InfoSVG } from '../../../images/icons/info-circle.svg';
import { renderWhenTrue } from '../../utils/rendering';
import { GetInTouch } from '../getInTouch';
import { Carousel } from '../carousel';
import { InfoTooltip } from '../infoTooltip';
import { InfoTooltipSizes } from '../infoTooltip/infoTooltip.component';
import {
  Container,
  CloseWrapper,
  Title,
  TagsWrapper,
  Tag,
  TechnologyIcon,
  Description,
  Block,
  BlockExpert,
  GetInTouchBlock,
  BlockWrapper,
  Head,
  Body,
  GetInTouchContainer,
} from './technologyPopup.styles';
import messages from './technologyPopup.messages';

export interface TechnologyPopupProps {
  technologies: RadarTechnology[];
}

export const TechnologyPopup = ({ technologies }: TechnologyPopupProps) => {
  const intl = useIntl();
  const { matches: isDesktop } = useMediaQuery({ above: Breakpoint.DESKTOP });
  const dispatch = useDispatch();
  const technologyId = useSelector(selectTechnologyId);
  const {
    label = '',
    ringLabel = '',
    teams = [],
    icon,
    description = '',
    projects = [],
    experts = '',
  } = technologies.find(({ id }) => id === technologyId) || {};
  const handleClosePopup = () => dispatch(closeTechnologyPopup());

  const renderIcon = renderWhenTrue(() => <TechnologyIcon src={icon?.url} alt={icon?.description} />);

  const projectsCarouselList = projects.map((project) => {
    return {
      header: project.name,
      description: project.description,
      imageSrc: `https:${project.image}`,
      url: project.url,
    };
  });

  const renderExpertsBlock = renderWhenTrue(() => (
    <Block>
      <BlockExpert>
        {experts} <FormattedMessage {...messages.specialists} />
      </BlockExpert>
      <InfoTooltip activator={<InfoSVG />} size={InfoTooltipSizes.BIG}>
        <FormattedMessage {...messages.expertsAmount} />
      </InfoTooltip>
    </Block>
  ));

  const renderDescription = renderWhenTrue(() => (
    <BlockWrapper>
      <Description>{description}</Description>
    </BlockWrapper>
  ));

  const renderExperts = renderWhenTrue(() => <BlockWrapper>{renderExpertsBlock(!!experts)}</BlockWrapper>);
  const renderProjects = renderWhenTrue(() => (
    <BlockWrapper>
      <Carousel items={projectsCarouselList} title={intl.formatMessage(messages.ourProjects)} />
    </BlockWrapper>
  ));

  return (
    <Container>
      <Head>
        <CloseWrapper onClick={handleClosePopup}>
          <CloseSVG />
        </CloseWrapper>
        <Title>
          {label}
          {renderIcon(!!icon)}
        </Title>
      </Head>
      <Body>
        <TagsWrapper>
          <Tag>{ringLabel}</Tag>
          {teams.map((team) => (
            <Tag key={team}>{team}</Tag>
          ))}
        </TagsWrapper>
        {renderDescription(!!description.length)}
        {renderExperts(experts > 0)}
        {renderProjects(!!projects.length)}
      </Body>
      <GetInTouchContainer>
        {!isDesktop ? (
          <GetInTouch />
        ) : (
          <>
            <GetInTouchBlock>
              <GetInTouch />
            </GetInTouchBlock>
            <GetInTouch asPopup />
          </>
        )}
      </GetInTouchContainer>
    </Container>
  );
};
