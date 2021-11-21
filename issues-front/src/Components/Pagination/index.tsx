/* eslint-disable camelcase */
import React, { MouseEventHandler } from 'react';
import './pagination.css';

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
        <div className='buttonContainer'>
            <button className='custom-btn btn-1' onClick={firstPage} disabled={currentPage === 1}>First page</button>
            <button className='custom-btn btn-1' onClick={nextPage} disabled={currentPage === numberOfPages}>Next Page</button>
            <button className='custom-btn btn-1' onClick={previousPage} disabled={currentPage === 1}>Prev Page</button>
            <button className='custom-btn btn-1' onClick={lastPage} disabled={currentPage === numberOfPages}>Last Page</button>
        </div>
  );
};

export default Pagination;
