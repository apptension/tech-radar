import { ComponentProps, ReactNode } from 'react';
import { LabelBar } from './labelBar';
import { Container, ContentContainer, Loader, ScrollableContainer } from './valueBox.styles';

interface ValueBoxProps extends ComponentProps<typeof LabelBar> {
  children: ReactNode;
  maxContentHeight?: string;
  isLoading?: boolean;
  withoutOverflow?: boolean;
}

export const ValueBox = ({
  children,
  maxContentHeight = '250px',
  withoutOverflow = false,
  isLoading = false,
  ...props
}: ValueBoxProps) => {
  return (
    <Container>
      <LabelBar {...props} />
      <ContentContainer>
        <ScrollableContainer maxHeight={maxContentHeight} withoutOverflow={withoutOverflow}>
          {isLoading ? <Loader /> : children}
        </ScrollableContainer>
      </ContentContainer>
    </Container>
  );
};
