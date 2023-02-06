import { ChangeEvent } from 'react';
import { StyledSpan, PaginationWrapper, StyledInput, StyledFirstWord } from './tablePagination.styles';

interface TablePaginationProps {
  gotoPage: (page: number) => void;
  previousPage: () => void;
  nextPage: () => void;
  canPreviousPage: boolean;
  canNextPage: boolean;
  pageCount: number;
  pageIndex: number;
  pageOptions: number[];
  pageSize: number;
  setPageSize: (size: number) => void;
}

export const TablePagination = ({
  gotoPage,
  previousPage,
  nextPage,
  canPreviousPage,
  canNextPage,
  pageCount,
  pageIndex,
  pageOptions,
  pageSize,
  setPageSize,
}: TablePaginationProps) => {
  const handleGoToPage = (e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    const page = value ? Number(value) - 1 : 0;
    gotoPage(page);
  };

  const handlePageSize = (e: ChangeEvent<HTMLSelectElement>) => {
    const {
      target: { value },
    } = e;
    setPageSize(Number(value));
  };

  return (
    <PaginationWrapper>
      <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
        {'<<'}
      </button>
      <button onClick={previousPage} disabled={!canPreviousPage}>
        {'<'}
      </button>
      <button onClick={nextPage} disabled={!canNextPage}>
        {'>'}
      </button>
      <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
        {'>>'}
      </button>
      <StyledSpan>
        <StyledFirstWord>Page</StyledFirstWord>
        <strong>
          {pageIndex + 1} of {pageOptions.length}
        </strong>
      </StyledSpan>
      <StyledSpan>
        Go to page:
        <StyledInput
          type="number"
          min={1}
          max={pageOptions.length}
          defaultValue={pageIndex + 1}
          onChange={handleGoToPage}
        />
      </StyledSpan>
      <select value={pageSize} onChange={handlePageSize}>
        {[10, 20, 30, 40, 50].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </select>
    </PaginationWrapper>
  );
};
