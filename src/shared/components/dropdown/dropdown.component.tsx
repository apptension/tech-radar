import React, { useState } from 'react';

import { ThemeProvider } from 'styled-components';
import { FilterType } from '../../../modules/filters/filters.types';
import { renderWhenTrue } from '../../utils/rendering';
import { TagSize } from '../tag/tag.types';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { Breakpoint } from '../../../theme/media';
import {
  ChevronIcon,
  Container,
  Icon,
  Label,
  LABEL_BOTTOM_MARGIN,
  LABEL_HEIGHT,
  LIST_BOTTOM_PADDING,
  LIST_TOP_PADDING,
  Option,
  Options,
  OptionsContainer,
  OptionsContent,
  RemoveIcon,
  Tag,
  ToggleButton,
  LabelTagContainer,
  ToggleButtonContainer,
} from './dropdown.styles';
import { DropdownTheme } from './dropdown.types';

interface DropdownProps {
  label: string;
  options: string[];
  className?: string;
  value: null | string;
  onSelect: (option: FilterType) => void;
}

export const Dropdown = ({ label, options, value, onSelect, className }: DropdownProps) => {
  const { matches: isDesktop } = useMediaQuery({ above: Breakpoint.DESKTOP });
  const [open, setOpen] = useState(false);

  const optionsAmount = options.length;
  const optionsHeight =
    optionsAmount * LABEL_HEIGHT + (optionsAmount - 1) * LABEL_BOTTOM_MARGIN + LIST_TOP_PADDING + LIST_BOTTOM_PADDING;
  const theme: DropdownTheme = { open };

  const closeDropdoown = () => setOpen(false);

  const toggleOpen = () => setOpen(!open);

  const handleToggleButtonClick = () => toggleOpen();

  const removeValue = () => onSelect(null);

  const handleOptionClick = (option: string) => {
    value === option ? removeValue() : onSelect(option);
    closeDropdoown();
  };

  const renderToggleButton = () => (
    <ToggleButton onClick={handleToggleButtonClick}>
      <ChevronIcon />
    </ToggleButton>
  );

  const renderOptions = () => (
    <OptionsContainer height={optionsHeight}>
      <Options>
        <OptionsContent>
          {options.map((option: string) => (
            <Option key={option} active={value === option} onClick={() => handleOptionClick(option)}>
              <span title={option}>{option}</span>
              {renderRemoveIcon(value === option)}
            </Option>
          ))}
        </OptionsContent>
      </Options>
    </OptionsContainer>
  );

  const renderRemoveIcon = renderWhenTrue(() => (
    <Icon>
      <RemoveIcon />
    </Icon>
  ));

  return (
    <ThemeProvider theme={theme}>
      <Container className={`${className} ${open ? 'open-dropdown' : ''}`}>
        <LabelTagContainer>
          <Label>{label}</Label>
          {!!value && isDesktop && (
            <Tag size={TagSize.SMALL} onRemove={removeValue}>
              {value}
            </Tag>
          )}
        </LabelTagContainer>
        <ToggleButtonContainer>{renderToggleButton()}</ToggleButtonContainer>
        {renderOptions()}
      </Container>
    </ThemeProvider>
  );
};
