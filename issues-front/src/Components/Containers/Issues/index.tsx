import React, { useEffect, useState } from 'react';
import './IssueContainer.css';
import { RouteComponentProps } from 'react-router-dom';
import axios from 'axios';
import { backendUrl } from '../../../constants';

function splitArray (flatArray: any, itemsPerPage: any) {
  const result = flatArray.reduce((resultArray: any, item: any, index: any) => {
    const chunkIndex = Math.floor(index / itemsPerPage);
    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [];
    }
    resultArray[chunkIndex].push(item);
    return resultArray;
  }, []);
  return result;
}

const IssuesItems: React.FC<RouteComponentProps> = function ({ history }) {
  const [data, setData] = useState<any>([]);
  const [error, setError] = useState<any>(false);
  const [fetched, setFetched] = useState<any>(false);
  const [loaded, setLoaded] = useState<any>(false);
  const [paginatedIssues, setPaginatedIssues] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState<any>(1);
  const [itemsPerPage] = useState<any>(13);
  const [numberOfPages, setNumberOfPages] = useState<any>(null);

  const getIssues = () => {
    axios.get(`${backendUrl}/issues`)
      .then(res => {
        if (res.status === 400) {
          setError(true);
        } else if (res.status === 200) {
          setData((state: any) => [...state, res?.data]);
          setFetched(true);
        }
      }).catch(() => {
        setError(true);
      });
  };

  useEffect(() => {
    // set the number of pages
    getIssues();
  }, []);

  useEffect(() => {
    if (fetched) {
      const numberOfPages = Math.ceil(data[0].length / itemsPerPage);
      setNumberOfPages(numberOfPages);
    }
  }, [fetched]);

  useEffect(() => {
    if (numberOfPages != null) {
      const newArr = splitArray(data[0], itemsPerPage);
      setPaginatedIssues((oldArr: any) => [...oldArr, newArr][0]);
      setLoaded(true);
    }
  }, [numberOfPages]);

  useEffect(() => {
    console.log('paginatedIssues');
    console.log(paginatedIssues);
    console.log(loaded);
    console.log(error);
  }, [paginatedIssues]);

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

  const redirect = (id: string) => {
    if (!id) return undefined;
    history.push('/issue/' + id);
  };

  return (
    <div> {
      !error && loaded
        ? <>
            <section className="cards">
                {paginatedIssues?.length > 0 && paginatedIssues[currentPage - 1]?.length > 0 && paginatedIssues[currentPage - 1].map((i: any) => {
                  return (
                        <article key={i.slug} onClick={() => redirect(i.id)}>
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
            </>
        : <p>loading</p>
    }
    </div>

  );
};

export default IssuesItems;
