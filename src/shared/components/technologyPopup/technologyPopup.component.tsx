import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FormattedMessage } from 'react-intl';
import { selectTechnologyId } from '../../../modules/technologyPopup/technologyPopup.selectors';
import { RadarTechnology } from '../radar/radar.types';
import { ReactComponent as CloseSVG } from '../../../images/icons/close.svg';
import { closeTechnologyPopup } from '../../../modules/technologyPopup/technologyPopup.actions';
import { renderWhenTrue } from '../../utils/rendering';
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
  BlockIcon,
  BlockLabel,
  BlockTitle,
  BlockExpert,
} from './technologyPopup.styles';
import messages from './technologyPopup.messages';

export interface TechnologyPopupProps {
  technologies: RadarTechnology[];
}

export const TechnologyPopup = ({ technologies }: TechnologyPopupProps) => {
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

  const renderIcon = renderWhenTrue(() => <TechnologyIcon src={icon?.url} alt={icon?.description} />);
  const links = [
    { url: github, label: messages.github },
    { url: specification, label: messages.specification },
    { url: projects, label: messages.projects },
  ].filter(({ url }) => !!url.length);
  const firstAlternative = alternatives[0];

  const renderLinks = renderWhenTrue(() => (
    <LinksWrapper>
      {links.map(({ url, label }, index) => (
        <Link href={url} target="_blank" key={index}>
          <FormattedMessage {...label} />
        </Link>
      ))}
    </LinksWrapper>
  ));

  const renderAlternativeBlock = renderWhenTrue(() => (
    <Block>
      <BlockTitle>
        <FormattedMessage {...messages.alternatives} />
      </BlockTitle>
      {firstAlternative.icon.url && (
        <BlockIcon src={firstAlternative.icon.url} alt={firstAlternative.icon.description} />
      )}
      <BlockLabel>{firstAlternative.label}</BlockLabel>
    </Block>
  ));

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
      {renderAlternativeBlock(!!firstAlternative)}
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
      {renderBlocks(!!experts.length || !!firstAlternative)}
    </Container>
  );
};
