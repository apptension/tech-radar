import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FormattedMessage } from 'react-intl';
import { selectTechnologyId } from '../../../modules/technologyPopup/technologyPopup.selectors';
import { RadarTechnology } from '../radar/radar.types';
import { ReactComponent as CloseSVG } from '../../../images/icons/close.svg';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { Breakpoint } from '../../../theme/media';
import { closeTechnologyPopup, openTechnologyPopup } from '../../../modules/technologyPopup/technologyPopup.actions';
import { renderWhenTrue } from '../../utils/rendering';
import { GetInTouch } from '../getInTouch';
import { TechnologyId } from '../../../modules/technologyPopup/technologyPopup.types';
import {
  Container,
  CloseWrapper,
  Title,
  TagsWrapper,
  Tag,
  TechnologyIcon,
  Description,
  LinksWrapper,
  Link,
  BlocksWrapper,
  Block,
  BlockButton,
  BlockIcon,
  BlockLabel,
  BlockTitle,
  BlockExpert,
  GetInTouchBlock,
} from './technologyPopup.styles';
import messages from './technologyPopup.messages';

export interface TechnologyPopupProps {
  technologies: RadarTechnology[];
}

export const TechnologyPopup = ({ technologies }: TechnologyPopupProps) => {
  const { matches: isDesktop } = useMediaQuery({ above: Breakpoint.DESKTOP });
  const dispatch = useDispatch();
  const technologyId = useSelector(selectTechnologyId);
  const {
    label = '',
    ringLabel = '',
    team = '',
    icon,
    description = '',
    github = '',
    specification = '',
    projects = '',
    alternatives = [],
    experts = '',
  } = technologies.find(({ id }) => id === technologyId) || {};
  const handleClosePopup = () => dispatch(closeTechnologyPopup());
  const handleOpenPopup = (technologyId: TechnologyId) => dispatch(openTechnologyPopup(technologyId));

  const renderIcon = renderWhenTrue(() => <TechnologyIcon src={icon?.url} alt={icon?.description} />);

  const links = [
    { url: github, label: messages.github },
    { url: specification, label: messages.specification },
    { url: projects, label: messages.projects },
  ].filter(({ url }) => !!url.length);

  const renderLinks = renderWhenTrue(() => (
    <LinksWrapper>
      {links.map(({ url, label }, index) => (
        <Link href={url} target="_blank" key={index}>
          <span>
            <FormattedMessage {...label} />
          </span>
        </Link>
      ))}
    </LinksWrapper>
  ));

  const renderAlternativeBlocks = renderWhenTrue(() =>
    alternatives.map(({ id, icon, label, description }, index) => (
      <BlockButton onClick={() => handleOpenPopup(id)} isClickAble={!!description} key={index}>
        <BlockTitle>
          <FormattedMessage {...messages.alternatives} />
        </BlockTitle>
        {icon.url && <BlockIcon src={icon.url} alt={icon.description} />}
        <BlockLabel>{label}</BlockLabel>
      </BlockButton>
    ))
  );

  const renderExpertsBlock = renderWhenTrue(() => (
    <Block>
      <BlockTitle>
        <FormattedMessage {...messages.experts} />
      </BlockTitle>
      <BlockExpert>{experts}</BlockExpert>
    </Block>
  ));

  const renderBlocks = renderWhenTrue(() => (
    <BlocksWrapper>
      {renderAlternativeBlocks(!!alternatives.length)}
      {renderExpertsBlock(!!experts)}
    </BlocksWrapper>
  ));

  return (
    <Container>
      <CloseWrapper onClick={handleClosePopup}>
        <CloseSVG />
      </CloseWrapper>
      <TagsWrapper>
        <Tag>{ringLabel}</Tag>
        <Tag>{team}</Tag>
      </TagsWrapper>
      <Title>
        {label}
        {renderIcon(!!icon)}
      </Title>
      <Description>{description}</Description>
      {renderLinks(!!links)}
      {renderBlocks(!!experts.length || !!alternatives.length)}
      {!isDesktop ? (
        <GetInTouch />
      ) : (
        <GetInTouchBlock>
          <GetInTouch />
        </GetInTouchBlock>
      )}
    </Container>
  );
};
