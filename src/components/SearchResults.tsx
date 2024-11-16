/** @jsxImportSource @emotion/react */
import * as React from 'react';
import { css, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { PositionHeader, SearchEngineHeader, TotalHeader } from './constants';
import { ISearchResponseModel } from '../models';

interface ISearchResultProps {
  items: ISearchResponseModel[]
}

const styles = { 
  headerLabel: css({ 
      fontWeight: "bold" 
  })
};

const SearchResults: React.FC<ISearchResultProps> = ({
  items
}) => {
  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell css={styles.headerLabel}>{SearchEngineHeader}</TableCell>
            <TableCell css={styles.headerLabel} align="right">{PositionHeader}</TableCell>
            <TableCell css={styles.headerLabel} align="right">{TotalHeader}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow
              key={item.searchEngine}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {item.searchEngine}
              </TableCell>
              <TableCell align="right">{item.positions}</TableCell>
              <TableCell align="right">{item.totalCount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default SearchResults;