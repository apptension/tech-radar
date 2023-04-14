import { forwardRef } from 'react';
import Select, { Props } from 'react-select';
import { color } from '../../../../theme';
import { FIELD_HEIGHT } from '../fields.constants';
import { StyledLabel, TextError } from '../fields.styles';
import { Container } from './SelectField.styles';

interface SelectFieldProps extends Props {
  label: string;
  error?: string;
}

export type TOption = {
  label: string | number;
  value: string | number;
};

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ label, styles, error, ...props }, ref) => {
    return (
      <Container>
        <StyledLabel>{label}</StyledLabel>
        <Select
          styles={{
            control: (base) => ({
              ...base,
              backgroundColor: color.mineShaft2,
              border: `1px solid ${color.darkBorder}`,
              color: color.white,
              ':hover': {
                border: `1px solid ${color.border}`,
              },
            }),
            valueContainer: (base) => ({
              ...base,
              minHeight: FIELD_HEIGHT,
              maxHeight: '90px',
              overflowY: 'auto',
              padding: '8px 0 8px 16px',
            }),
            singleValue: (base) => ({
              ...base,
              color: color.white,
            }),
            placeholder: (base) => ({
              ...base,
              color: color.dustyGray,
            }),
            menuList: (base) => ({
              ...base,
              color: color.codGray,
            }),
            ...styles,
          }}
          {...props}
        />
        {error && <TextError>{error}</TextError>}
      </Container>
    );
  }
);
