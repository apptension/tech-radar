import { useState } from 'react';
import { useTable, usePagination } from 'react-table';
import { ExtendedRadarTechnology, TechnologyTable } from '../adminPanel.types';
import { TablePagination } from './tablePagination.component';

interface EditableCellProps {
  value: string | number;
  row: { index: number };
  column: { id: string };
  updateMyData: (index: number, id: string, value: string | number | boolean) => void;
}

interface TableProps {
  columns: TechnologyTable[];
  data: ExtendedRadarTechnology[];
  updateMyData: (rowIndex: number, columnId: string, value: string | number | boolean) => void;
}

export function Table({ columns, data, updateMyData }: TableProps) {
  const EditableCell = ({ value: initialValue, row: { index }, column: { id }, updateMyData }: EditableCellProps) => {
    const [value, setValue] = useState(initialValue);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    };

    const onBlur = () => {
      updateMyData(index, id, value);
    };

    return <input value={value} onChange={onChange} onBlur={onBlur} />;
  };

  const defaultColumn = {
    Cell: EditableCell,
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      updateMyData,
    },
    usePagination
  );

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <TablePagination
        gotoPage={gotoPage}
        previousPage={previousPage}
        nextPage={nextPage}
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        pageCount={pageCount}
        pageIndex={pageIndex}
        pageOptions={pageOptions}
        pageSize={pageSize}
        setPageSize={setPageSize}
      />
    </>
  );
}
