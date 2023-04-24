import { useIntl } from 'react-intl';
import { Text, TextContainer } from './dndInfoContent.styles';
import dndInfoContentMessages from './dndInfoContent.messages';

interface DnDInfoContentProps {
  type: 'root' | 'expert' | 'intermediate' | 'shallow';
}

export const DnDInfoContent = ({ type }: DnDInfoContentProps) => {
  const intl = useIntl();
  const getInfoText = () => {
    switch (type) {
      case 'root':
        return (
          <TextContainer>
            <Text>{intl.formatMessage(dndInfoContentMessages.chooseTag)}</Text>
            <Text>{intl.formatMessage(dndInfoContentMessages.moveTags)}</Text>
            <Text>
              {'\n'}
              {intl.formatMessage(dndInfoContentMessages.noWorries)}
            </Text>
          </TextContainer>
        );
      case 'expert':
        return (
          <TextContainer>
            <Text>{intl.formatMessage(dndInfoContentMessages.selectTechnologies)}</Text>
            <Text>{intl.formatMessage(dndInfoContentMessages.thinkAboutSkills)}</Text>
            <Text>* {intl.formatMessage(dndInfoContentMessages.haveCommercialExp)}</Text>
            <Text>* {intl.formatMessage(dndInfoContentMessages.couldTeachNewbie)}</Text>
            <Text>* {intl.formatMessage(dndInfoContentMessages.couldDescribeToClient)}</Text>
          </TextContainer>
        );
      case 'intermediate':
        return (
          <TextContainer>
            <Text>{intl.formatMessage(dndInfoContentMessages.thinkAboutSkills)}</Text>
            <Text>* {intl.formatMessage(dndInfoContentMessages.haveSomeCommercialExp)}</Text>
            <Text>* {intl.formatMessage(dndInfoContentMessages.knowItIsMore)}</Text>
            <Text>* {intl.formatMessage(dndInfoContentMessages.couldShowNewbie)}</Text>
          </TextContainer>
        );
      case 'shallow':
        return (
          <TextContainer>
            <Text>{intl.formatMessage(dndInfoContentMessages.thinkAboutSkills)}</Text>
            <Text>* {intl.formatMessage(dndInfoContentMessages.haveExpOrNot)}</Text>
            <Text>* {intl.formatMessage(dndInfoContentMessages.usedOnceOrTwice)}</Text>
            <Text>* {intl.formatMessage(dndInfoContentMessages.knowButHaveToLearn)}</Text>
          </TextContainer>
        );
    }
  };
  return <>{getInfoText()}</>;
};
