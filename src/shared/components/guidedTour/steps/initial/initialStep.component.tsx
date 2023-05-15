import { Tag } from '../../components/tag/tag.component';
import { TagsWrapper } from '../../components/tag/tag.styles';

const quadrants = ['Packages & Libraries', 'Products & Tools', 'Infrastructure', 'Languages & Frameworks'];

export const InitialStep = () => {
  return (
    <div>
      <p>
        The radar will let you explore all of the technologies, methods, and tools used here at Apptension and learn
        more about them. You will also get to see the technologies we have on our radar (pun intended) and, hopefully,
        get inspired.
      </p>
      <TagsWrapper>
        {quadrants.map((quadrant) => (
          <Tag key={quadrant} value={quadrant} />
        ))}
      </TagsWrapper>
    </div>
  );
};
