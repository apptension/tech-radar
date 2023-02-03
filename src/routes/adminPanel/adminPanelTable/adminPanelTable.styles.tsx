import styled from 'styled-components';
import { color } from '../../../theme';
import { regularBlack } from '../../../theme/border';

export const HEIGHT = '40px';

export const Styles = styled.div`
  padding: 1rem;
  overflow: scroll;
  height: 100%;

  table {
    border-spacing: 0;
    border: ${regularBlack};

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: ${regularBlack};
      border-right: ${regularBlack};

      :last-child {
        border-right: 0;
      }

      input {
        font-size: 1rem;
        padding: 0 0 0 5px;
        margin: 0;
        border: 0;
        height: ${HEIGHT};
        border-radius: 4px;
      }
    }
  }

  .pagination {
    padding: 0.5rem;
  }
`;

export const InlineSelectContainer = styled.div`
  .select__control {
    max-height: 70px;
  }

  .react-select__control {
    box-shadow: none;
    max-width: 475px;
    height: ${HEIGHT};
    flex-wrap: nowrap;

    &--menu-is-open {
      .react-select__indicator {
        transform: rotate(180deg);
      }
    }
  }

  .react-select__value-container {
    display: flex;
    flex-wrap: nowrap;
    padding-left: 0;
  }

  .react-select__indicator {
    padding: 0;
    &-separator {
      display: none;
    }
  }

  .react-select__placeholder {
    margin: 0;
  }

  .react-select__menu {
    top: 80%;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-top: none;
    box-shadow: none;

    &-list {
      max-height: 150px;
    }
  }

  .react-select__option {
    text-align: left;
    color: ${color.black};
    &:hover,
    &:focus {
      background: none;
      border: none;
    }

    &--is-focused {
      background: none;
      border: none;
    }
  }

  .react-select__input {
    &:focus {
      box-shadow: none;
    }
  }
`;

export const StyledSelect = styled.select`
  height: ${HEIGHT};
  min-width: 100px;
  border-radius: 4px;
`;
