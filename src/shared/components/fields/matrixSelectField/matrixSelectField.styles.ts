import styled, { css } from 'styled-components';
import { StylesConfig } from 'react-select';
import { color, fontWeight, zIndex } from '../../../../theme';
import { LabelMedium } from '../../../../theme/typography';

interface LabelProps {
  isRequired: boolean;
}

interface ColorDotProps {
  color: string;
}

const FIELD_HEIGHT = '60px';

export const Container = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const StyledLabel = styled.label<LabelProps>`
  ${LabelMedium};
  font-weight: ${fontWeight.bold};
  color: ${color.silver};
  margin-bottom: 12px;
  ${({ isRequired }) =>
    isRequired &&
    css`
      &:after {
        content: ' *';
        color: ${color.error};
      }
    `}
`;

export const TextError = styled.p`
  ${LabelMedium};
  color: ${color.error};
  margin-top: 12px;
  margin-bottom: 0;
`;

export const ColorDot = styled.div<ColorDotProps>`
  width: 16px;
  height: 16px;
  margin-left: 18px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
`;

export const ContainerWithColor = styled.div`
  display: flex;
  align-items: center;
`;

const getBorderColor = (isFocused: boolean, hasValue: boolean, isError: boolean) =>
  isFocused ? color.white : isError ? color.error : hasValue ? color.white : color.silver;

export const selectStyles: StylesConfig = {
  control: (base, { menuIsOpen, isFocused, hasValue, selectProps }) => ({
    ...base,
    backgroundColor: color.codGray,
    color: color.white,
    border: `1px solid ${getBorderColor(isFocused, hasValue, Boolean(selectProps['aria-invalid']))}`,
    borderRadius: '0px',
    boxShadow: 'none',
    paddingRight: '24px',
    paddingLeft: '24px',
    fontSize: '20px',
    lineHeight: '28px',
    borderBottom: `1px solid ${
      menuIsOpen ? 'transparent' : getBorderColor(isFocused, hasValue, Boolean(selectProps['aria-invalid']))
    }`,
    caretColor: color.schoolBusYellow,
    '&:hover': {
      boxShadow: 'none',
    },
    ':focus': {
      border: `1px solid ${color.white}`,
    },
  }),
  indicatorSeparator: () => ({}),
  dropdownIndicator: (_, { selectProps }) => ({
    display: 'flex',
    color: color.white,
    rotate: selectProps.menuIsOpen ? '180deg' : '0',
  }),
  valueContainer: (base) => ({
    ...base,
    height: FIELD_HEIGHT,
    paddingLeft: '0px',
  }),
  singleValue: (base, { selectProps: { menuIsOpen } }) => ({
    ...base,
    color: menuIsOpen ? color.scorpion : color.white,
  }),

  placeholder: (base, { selectProps: { menuIsOpen } }) => ({
    ...base,
    color: menuIsOpen ? color.scorpion : color.boulder,
  }),
  input: (base) => ({
    ...base,
    color: color.white,
  }),
  option: (base, { isSelected }) => ({
    ...base,
    background: 'transparent',
    padding: '14px 24px',
    color: isSelected ? color.white : color.silver,
    fontSize: '20px',
    lineHeight: '28px',
    cursor: 'pointer',
    ':hover': {
      color: color.white,
      background: color.mineShaft2,
    },
  }),
  menu: (base) => ({
    ...base,
    marginTop: 0,
    paddingTop: 0,
    paddingRight: '8px',
    paddingBottom: '8px',
    borderRadius: 0,
    border: `1px solid ${color.white}`,
    borderTop: 'none',
    background: color.codGray,
    zIndex: zIndex.header,
  }),
  menuList: (base) => ({
    ...base,
    paddingTop: 0,

    paddingBottom: '12px',
    background: 'transparent',
    '&::-webkit-scrollbar': {
      width: '8px',
    },
    '&::-webkit-scrollbar-track': {
      background: color.mineShaft,
      borderRadius: '100px',
    },
    '&::-webkit-scrollbar-thumb': {
      background: color.silver,
      borderRadius: '100px',
    },
  }),
};
