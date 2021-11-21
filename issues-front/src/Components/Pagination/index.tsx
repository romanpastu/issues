/* eslint-disable camelcase */
import React, { MouseEventHandler } from 'react';

type IProps = {
    firstPage : MouseEventHandler<HTMLButtonElement>,
    nextPage: MouseEventHandler<HTMLButtonElement>,
    previousPage: MouseEventHandler<HTMLButtonElement>,
    lastPage: MouseEventHandler<HTMLButtonElement>,
    currentPage: number,
    numberOfPages: number,
}

const Pagination: React.FC<IProps> = ({ firstPage, nextPage, previousPage, lastPage, currentPage, numberOfPages }) => {
  return (
        <div>
            <button onClick={firstPage} disabled={currentPage === 1}>First page</button>
            <button onClick={nextPage} disabled={currentPage === numberOfPages}>Next Page</button>
            <button onClick={previousPage} disabled={currentPage === 1}>Previous Page</button>
            <button onClick={lastPage} disabled={currentPage === numberOfPages}>Last Page</button>
        </div>
  );
};

export default Pagination;
