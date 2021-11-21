import React, { useEffect, useState } from 'react';
import './IssueContainer.css';
import issuesJson from '../../../mockData/issues.json';
import { RouteComponentProps } from 'react-router-dom';

function splitArray (flatArray: any, itemsPerPage: any) {
  const result = flatArray.reduce((resultArray: any, item: any, index: any) => {
    const chunkIndex = Math.floor(index / itemsPerPage);

    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = []; // start a new chunk
    }
    resultArray[chunkIndex].push(item);

    return resultArray;
  }, []);
  return result;
}

const IssuesItems: React.FC<RouteComponentProps> = function ({ history }) {
  const [issues] = useState<any>([...issuesJson]);
  const [paginatedIssues, setPaginatedIssues] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState<any>(1);
  const [itemsPerPage] = useState<any>(13);
  const [numberOfPages, setNumberOfPages] = useState<any>(null);

  useEffect(() => {
    // set the number of pages
    const numberOfPages = Math.ceil(issues.length / itemsPerPage);
    console.log(numberOfPages);
    setNumberOfPages(numberOfPages);
  }, []);

  useEffect(() => {
    if (numberOfPages != null) {
      const newArr = splitArray(issues, itemsPerPage);
      setPaginatedIssues((oldArr: any) => [...oldArr, newArr]);
    }
  }, [numberOfPages]);

  const firstPage = () => {
    setCurrentPage(1);
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const previousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const lastPage = () => {
    setCurrentPage(numberOfPages);
  };

  const redirect = (slug : any) => {
    if (!slug) return undefined;
    history.push('/issue/' + slug);
  };

  return (
        <div>
            <section className="cards">
                {paginatedIssues[0]?.length > 0 && paginatedIssues[0][currentPage - 1]?.length > 0 && paginatedIssues[0][currentPage - 1].map((i: any) => {
                  return (
                        <article key={i.slug} onClick={() => redirect(i.slug)}>
                            <img className="article-img" src={i.cover_image} alt={i.name} />
                            <h1 className="article-title">
                                {i.name}
                            </h1>
                        </article>
                  );
                })}
            </section>
            <div>
                <button onClick={firstPage} disabled={currentPage === 1}>First page</button>
                <button onClick={nextPage} disabled={currentPage === numberOfPages}>Next Page</button>
                <button onClick={previousPage} disabled={currentPage === 1}>Previous Page</button>
                <button onClick={lastPage} disabled={currentPage === numberOfPages}>Last Page</button>
            </div>
        </div>

  );
};

export default IssuesItems;
