import { useIntl } from 'react-intl';
import { useContentfulData } from '../../../hooks/useContentfulData/useContentfulData';
import { Tag } from '../components/tag/tag.component';
import { TagsWrapper } from '../components/tag/tag.styles';
import messages from '../guidedTour.messages';

export const InitialStep = () => {
  const intl = useIntl();
  const { radarQuadrants } = useContentfulData();

  return (
    <div style={{ width: 538 }}>
      <p>{intl.formatMessage(messages.initialStepDescription)}</p>
      <TagsWrapper>
        {radarQuadrants.map((quadrant) => (
          <Tag isStatic key={quadrant.id} value={quadrant.name} />
        ))}
      </TagsWrapper>
    </div>
  );
};
