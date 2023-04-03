import { ComponentProps, HTMLAttributes, ReactNode } from 'react';
import { LabelBar } from './labelBar';
import { Container, ContentContainer, Loader, ScrollableContainer } from './valueBox.styles';

interface ValueBoxProps extends ComponentProps<typeof LabelBar>, HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  maxContentHeight?: string;
  maxWidth?: string;
  isLoading?: boolean;
  withoutOverflow?: boolean;
}

export const ValueBox = ({
  children,
  maxContentHeight = '250px',
  maxWidth,
  withoutOverflow = false,
  isLoading = false,
  label,
  infoContent,
  ...props
}: ValueBoxProps) => {
  return (
    <Container maxWidth={maxWidth}>
      <LabelBar label={label} infoContent={infoContent} />
      <ContentContainer maxHeight={maxContentHeight} {...props}>
        <ScrollableContainer withoutOverflow={withoutOverflow}>{isLoading ? <Loader /> : children}</ScrollableContainer>
      </ContentContainer>
    </Container>
  );
};
