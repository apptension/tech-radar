import { useState } from 'react';
import { useTable, usePagination } from 'react-table';
import { TechnologyTable } from '../../../routes/admin/adminPanel/adminPanel.types';
import { TextField } from '../fields/TextField';
import { TablePagination } from '../pagination';
import { TableRadarTechnology } from '../radar/radar.types';
import { StyledTable, TableBodyRow, TableSaveCell } from './table.styles';

interface EditableCellProps {
  value: string | number;
  row: { index: number };
  column: { id: string };
  updateMyData: (index: number, id: string, value: string | number | boolean) => void;
}

interface TableProps {
  columns: TechnologyTable[];
  data: TableRadarTechnology[];
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

    return <TextField label="" value={value} onChange={onChange} onBlur={onBlur} />;
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
      autoResetPage: false,
    },
    usePagination
  );

  return (
    <>
      <StyledTable {...getTableProps()}>
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
              <TableBodyRow {...row.getRowProps()} style={{ position: 'relative' }}>
                {row.cells.map((cell) => {
                  if (cell.column.id === 'save') {
                    return <TableSaveCell {...cell.getCellProps()}>{cell.render('Cell')}</TableSaveCell>;
                  }
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                })}
              </TableBodyRow>
            );
          })}
        </tbody>
      </StyledTable>
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
