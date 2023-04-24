import { useState } from 'react';
import { ReactComponent as ArrowRight } from '../../../images/icons/arrow-right.svg';
import {
  Header,
  ArrowButton,
  Box,
  BoxContainer,
  Frame,
  Wrapper,
  HeaderLabel,
  Thumbnail,
  ThumbnailContainer,
  Title,
  Description,
  ArrowLeft,
} from './carousel.styles';

interface CarouselItem {
  header: string;
  description: string;
  imageSrc: string;
  url: string;
}

interface CarouselProps {
  items: CarouselItem[];
  title: string;
}

export const Carousel = ({ items, title }: CarouselProps) => {
  const [current, setCurrent] = useState(0);

  const totalSlides = items.length - 1;
  const isFirst = current === 0;
  const isLast = current >= totalSlides;

  const prev = () => !isFirst && setCurrent((curr) => curr - 1);
  const next = () => !isLast && setCurrent((curr) => curr + 1);

  const carouselItems = items.map((item) => {
    return (
      <Box key={item.url}>
        <ThumbnailContainer>
          <Thumbnail src={item.imageSrc} alt={`${item.header} thumbnail`} />
        </ThumbnailContainer>
        <Title>{item.header}</Title>
        <Description>{item.description}</Description>
      </Box>
    );
  });

  return (
    <Wrapper>
      <Header>
        <ArrowButton disabled={isFirst} onClick={prev}>
          <ArrowLeft />
        </ArrowButton>
        <HeaderLabel>{title}</HeaderLabel>
        <ArrowButton disabled={isLast} onClick={next}>
          <ArrowRight />
        </ArrowButton>
      </Header>
      <Frame>
        <BoxContainer style={{ transform: `translateX(-${current}00%)` }}>{carouselItems}</BoxContainer>
      </Frame>
    </Wrapper>
  );
};
