import { ComponentProps, ReactNode } from 'react';
import { LabelBar } from './labelBar';
import { Container, ContentContainer, ScrollableContainer } from './valueBox.styles';

interface ValueBoxProps extends ComponentProps<typeof LabelBar> {
  children: ReactNode;
  maxContentHeight?: string;
}

export const ValueBox = ({ children, maxContentHeight = '250px', ...props }: ValueBoxProps) => {
  return (
    <Container>
      <LabelBar {...props} />
      <ContentContainer>
        <ScrollableContainer maxHeight={maxContentHeight}>{children}</ScrollableContainer>
      </ContentContainer>
    </Container>
  );
};
