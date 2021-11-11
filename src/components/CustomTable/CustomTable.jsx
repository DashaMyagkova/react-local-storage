import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { func, oneOf, string, number, array } from 'prop-types';

import { eventActions } from '@store';
import { routes } from '@constants';
import { SearchField } from '@components';

import { formatTimestampToDateString, formatTimestampToDateStringWithTime } from '@methods';
import {
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
  Paper,
  Stack
} from '@mui/material';

import { headCells } from '@constants/mock';

const EmptyRows = ({ emptyRows }) => (
  <TableRow
    style={{
      height: 53 * emptyRows,
    }}
  >
    <TableCell colSpan={8} />
  </TableRow>
);
EmptyRows.propTypes = {
  emptyRows: number.isRequired,
};

const TableToolbar = ({ data, handleAllDeleteClick, handleCreateEvent, searchValue, handleSearch }) => {
  return (
    <Toolbar sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 }, borderBottom: 1, borderColor: "#D5D8DC" }}>
      <Stack width="100%" spacing={2} mb="15px">
        <Typography
          sx={{ flex: '1 1 100%', pt: "15px" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Created Events
        </Typography>
        <SearchField value={searchValue} onChange={handleSearch}/>
      </Stack>
      <Button variant="outlined" color="success" size="small"
        sx={{width: "10%", mr: "50px"}}
        onClick={handleCreateEvent}
      >
        Create Event
      </Button>
      {data.length > 0 && (   
        <Button variant="outlined" color="error" size="small"
          sx={{width: "10%", mr: "50px"}}
          onClick={handleAllDeleteClick}
        >
          Delete All</Button>
      )}
    </Toolbar>
  );
};

TableToolbar.propTypes = {
  data: array.isRequired,
  handleAllDeleteClick: func.isRequired,
  handleCreateEvent: func.isRequired,
  searchValue: string.isRequired,
  handleSearch: func.isRequired,
};

const EnhancedTableHead = ({order, orderBy, onRequestSort}) => {

  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align='left'
            sortDirection={orderBy === headCell.id && order}
          >
            {orderBy === headCell.id ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.name}
              </TableSortLabel>
            ) : headCell.name}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

EnhancedTableHead.propTypes = {
  onRequestSort: func.isRequired,
  order: oneOf(['asc', 'desc']).isRequired,
  orderBy: string.isRequired,
};

const descendingComparator = (a, b) => {
  a = new Date(a.createdAt);
  b = new Date(b.createdAt);
  return a>b ? -1 : a<b ? 1 : 0;
};

const getComparator = order => {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b)
    : (a, b) => -descendingComparator(a, b);
};

const TableContent = ({ data, page, rowsPerPage, order, emptyRows, handleValidateEvent, handleDeleteOneEvent }) => {
  return (
    <TableBody>
      {data
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .sort(getComparator(order))
        .map(row => {
          return (
            <TableRow hover key={`row-${formatTimestampToDateStringWithTime(row.createdAt)}`}>
              <TableCell align='left'>{row.name}</TableCell>
              <TableCell align='left'>{row.location}</TableCell>
              <TableCell align='left'>{formatTimestampToDateString(row.startDate)}</TableCell>
              <TableCell align='left'>{formatTimestampToDateString(row.endDate)}</TableCell>
              <TableCell align='left'>{row.status}</TableCell>
              <TableCell align='left'>{formatTimestampToDateStringWithTime(row.createdAt)}</TableCell>
              <TableCell align='left'>
                <Button variant="text" color="error" onClick={handleDeleteOneEvent(row.createdAt)}>Delete</Button>
              </TableCell>
              <TableCell align='left'>
                <Button variant="text" color="success" onClick={handleValidateEvent(row)}>Validate</Button>
              </TableCell>
            </TableRow>
          );
        })}
      {emptyRows > 0 && (<EmptyRows emptyRows={emptyRows} />)}
    </TableBody>
  );
};

TableContent.propTypes = {
  page: number.isRequired,
  rowsPerPage: number.isRequired,
  order: string.isRequired,
  emptyRows: number.isRequired,
  data: array.isRequired,
  handleValidateEvent: func.isRequired,
  handleDeleteOneEvent: func.isRequired,
};

const CustomTable = ({ data, handleAllDeleteClick, handleCreateEvent, handleDeleteOneEvent }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [order, setOrder] = useState('asc');
  const [orderBy] = useState('submittedAt');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [rows, setRows] = useState(data);
  const [searchValue, setSearchValue] = useState('');
  
  useEffect(() => {
    setRows(data);
  }, [data]);

  const handleSearchRows = () => {
    setRows(data);
    if(searchValue.length > 0) {
      const filteredRows = rows.filter(row => {
        return row.name.toLowerCase().includes(searchValue.toLowerCase());
      });
      setRows(filteredRows);
    } else {
      setRows(data);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      handleSearchRows();
    }, 2000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchValue]);

  const handleRequestSort = () => {
    const isAsc = order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleValidateEvent = event => () => {
    dispatch(eventActions.setCreatedEvent({ event }));
    navigate(routes.validateEvent);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableToolbar
          data={data}
          handleAllDeleteClick={handleAllDeleteClick}
          handleCreateEvent={handleCreateEvent}
          searchValue={searchValue}
          handleSearch={e => setSearchValue(e.target.value)}
        />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} size='medium' >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={data.length}
            />
            <TableContent
              page={page}
              rowsPerPage={rowsPerPage}
              order={order}
              emptyRows={emptyRows}
              data={rows}
              handleValidateEvent={handleValidateEvent}
              handleDeleteOneEvent={handleDeleteOneEvent}
            />
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[3, 6, 9]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

CustomTable.propTypes = {
  data: array.isRequired,
  handleAllDeleteClick: func.isRequired,
  handleCreateEvent: func.isRequired,
  handleDeleteOneEvent: func.isRequired,
};

export default CustomTable;

