import { Text, TextContainer } from './dndInfoContent.styles';

interface DnDInfoContentProps {
  type: 'root' | 'expert' | 'intermediate' | 'shallow';
}

export const DnDInfoContent = ({ type }: DnDInfoContentProps) => {
  const getInfoText = () => {
    switch (type) {
      case 'root':
        return (
          <TextContainer>
            <Text>
              Choose any tag with technology and move it to the Expertise level you feel it can be referred to.
            </Text>
            <Text>You can also move all tags from one level to another.</Text>
            <Text>
              {'\n'}Don't worry, if there's something you don't find in the list, you can add it in the next “Step 3”
              under “Additional skills”.
            </Text>
          </TextContainer>
        );
      case 'expert':
        return (
          <TextContainer>
            <Text>Please select as many technologies you feel very confident about.</Text>
            <Text>Think about those skills like this: </Text>
            <Text>* you have commercial experience with the tech</Text>
            <Text>* you could teach a newbie how to work with this tech</Text>
            <Text>* you could describe its pros and cons to a client</Text>
          </TextContainer>
        );
      case 'intermediate':
        return (
          <TextContainer>
            <Text>Think about those skills like this: </Text>
            <Text>* you have some commercial experience with the tech</Text>
            <Text>
              * you know that there's still more to learn, but it doesn't stop you from using its most important
              features
            </Text>
            <Text>
              * you can show a newbie how you use the tech, but you are not 100% sure what you say is a good practice
            </Text>
          </TextContainer>
        );
      case 'shallow':
        return (
          <TextContainer>
            <Text>Think about those skills like this: </Text>
            <Text>* you may or may not have commercial experience with this tech</Text>
            <Text>* you used it once or twice in either a personal or a very short commercial project</Text>
            <Text>
              * you know what it's supposed to do but you are certain there's still a lot of stuff to learn about it
            </Text>
          </TextContainer>
        );
    }
  };
  return <>{getInfoText()}</>;
};
