import React, { useState } from 'react';

import { ThemeProvider } from 'styled-components';
import { renderWhenTrue } from '../../utils/rendering';
import { TagSize } from '../tag/tag.types';
import {
  Container,
  ChevronIcon,
  Label,
  Tag,
  Icon,
  LABEL_BOTTOM_MARGIN,
  LABEL_HEIGHT,
  LIST_BOTTOM_PADDING,
  LIST_TOP_PADDING,
  Option,
  Options,
  OptionsContainer,
  OptionsContent,
  RemoveIcon,
  ToggleButton,
} from './dropdown.styles';
import { DropdownTheme } from './dropdown.types';

interface DropdownProps {
  label: string;
  options: string[];
  className?: string;
  value: null | string;
  setValue: (option: string | null) => void;
}

export const Dropdown = ({ label, options, value, setValue, className }: DropdownProps) => {
  const [open, setOpen] = useState(false);
  const optionsAmounts = options.length;
  const optionsHeight =
    optionsAmounts * LABEL_HEIGHT + (optionsAmounts - 1) * LABEL_BOTTOM_MARGIN + LIST_TOP_PADDING + LIST_BOTTOM_PADDING;
  const theme: DropdownTheme = { open };

  const closeDropdoown = () => setOpen(false);

  const toggleOpen = () => setOpen(!open);

  const handleToggleButtonClick = () => toggleOpen();

  const removeValue = () => setValue(null);

  const handleOptionClick = (option: string) => {
    value === option ? removeValue() : setValue(option);
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
      <Container className={className}>
        <div>
          <Label>{label}</Label>
          {!!value && (
            <Tag size={TagSize.SMALL} onRemove={removeValue}>
              {value}
            </Tag>
          )}
        </div>
        {renderToggleButton()}
        {renderOptions()}
      </Container>
    </ThemeProvider>
  );
};
