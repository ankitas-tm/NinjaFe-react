import React, { useMemo} from 'react'
import { useTable, usePagination, useFilters, useRowSelect } from 'react-table'
import { PropTypes } from "prop-types";
import ButtonComponent from './CustomButton';

//Table 
import MaUTable from "@mui/material/Table";
import TableBody from "@mui/material//TableBody";
import TableCell from "@mui/material//TableCell";
import TableHead from "@mui/material//TableHead";
import TableRow from "@mui/material//TableRow";
import TableFooter from "@mui/material//TableFooter";
import IconButton from "@mui/material//IconButton";
import TablePagination from "@mui/material//TablePagination";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

function Table({Cols, Records, pageLimitD, pageSizeR, customClass, defaultColHead, defaultColData, resetButton }) {
  const columns = useMemo(() => Cols, [Cols]);
  const data = useMemo(() => Records, [Records]);

  // Let's set up our default Filter UI
  const defaultColumn = React.useMemo(
    () => ({
      Filter: ""
    }),
    []
  );
     
  const tableInstance = useTable({
      columns,
      data,
      defaultColumn,
      initialState: { filters: [
        {
          id: defaultColHead,
          value: defaultColData,
        }
      ], pageSize: pageSizeR }
  }, useFilters, usePagination, useRowSelect)
 
  const { 
    getTableProps, 
    getTableBodyProps, 
    headerGroups, 
    page, 
    rows,
    nextPage, 
    canNextPage, 
    previousPage, 
    canPreviousPage, 
    gotoPage, 
    // pageOptions, 
    setPageSize, 
    prepareRow, 
    state,
    pageCount,
    setAllFilters
  } = tableInstance;

  const { pageIndex, pageSize } = state;

  return (
    <div>
      {resetButton && <ButtonComponent buttonClass={'me-2 tm-button'} clickFunc={() => setAllFilters([])} buttonText={'Reset'}/>}
      <MaUTable {...getTableProps()} className={customClass}>
        <TableHead>
            {headerGroups.map((headerGroup) => (
                <TableRow {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => {
                        return (
                          <TableCell {...column.getHeaderProps()}>
                            {column.render("Header")}
                            {column.canFilter ? <span> {column.render("Filter")} </span>: null}
                          </TableCell>
                        )
                    })}
                </TableRow>
            ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
            {
                page.map(row => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => {
                                return <TableCell {...cell.getCellProps()}>{cell.render('Cell')}</TableCell>
                            })}
                        </tr>
                    )
                })
            }
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={pageLimitD}
              component="td"
              count={rows.length}
              rowsPerPage={pageSize}
              page={pageIndex}
              boundaryCount={2}
              onPageChange={(e, p) => {
                gotoPage(p);
              }}
              onRowsPerPageChange={e => {
                setPageSize(Number(e.target.value));
              }}
              ActionsComponent={() => (
                <TablePaginationActions
                  {...{
                    previousPage,
                    nextPage,
                    gotoPage,
                    canPreviousPage,
                    canNextPage,
                    pageCount
                  }}
                />
              )}
            />
          </TableRow>
        </TableFooter>
      </MaUTable>
    </div>
  );
}

function TablePaginationActions({
  previousPage,
  nextPage,
  canPreviousPage,
  canNextPage,
}) {

  const handleBackButtonClick = () => {
    previousPage();
  };

  const handleNextButtonClick = () => {
    nextPage();
  };

  return (
    <div style={{ flexShrink: 0 }}>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={!canPreviousPage}
        aria-label="previous page"
      >
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={!canNextPage}
        aria-label="next page"
      >
        <KeyboardArrowRight />
      </IconButton>
    </div>
  );
}

Table.defaultProps = {
  pageSizeR: 10,
  pageLimitD: [2, 5, 10, 15, 20, 30],
  Records: [],
  Cols: [{
      Header: 'DP Number',
      id: "dpNo"
    },
    {
      Header: 'Full Name',
      id: "name",
    },
    {
      Header: 'Verification Date',
      id: "verificationDate",
    },
    {
      Header: 'Profile Status',
      id: "status",
    },
    {
      Header: 'Enrollemnt Status',
      id: "eligibleForLMS",
    }
  ],
}

Table.propTypes = {
  pageSizeR: PropTypes.number,
  pageLimitD: PropTypes.array,
  Records: PropTypes.array.isRequired,
  Cols: PropTypes.array.isRequired,
  resetButton: PropTypes.bool,
};
export default Table;