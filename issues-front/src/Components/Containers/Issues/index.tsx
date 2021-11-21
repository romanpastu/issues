/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import './IssueContainer.css';
import { RouteComponentProps } from 'react-router-dom';
import axios from 'axios';
import { backendUrl } from '../../../constants';
import { splitArray } from '../../../helpers';
import { useInput } from '../../../hooks';

type IIssue = {
  id: number,
  name: string,
  // eslint-disable-next-line camelcase
  cover_image: string,
  description: string
}

const IssuesItems: React.FC<RouteComponentProps> = ({ history }) => {
  const [data, setData] = useState<Array<IIssue>>();
  const [error, setError] = useState<boolean>(false);
  const [fetched, setFetched] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [paginatedIssues, setPaginatedIssues] = useState<Array<Array<IIssue>>>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(13);
  const [numberOfPages, setNumberOfPages] = useState<null | number>(null);
  const [searchValue, searchInput] = useInput({ type: 'text' });
  const [keywords, setKeywords] = useState<Array<string>>([]);

  const resetStates = () : void => {
    setLoaded(false);
    setFetched(false);
    setError(false);
    setNumberOfPages(null);
    setData([]);
    setPaginatedIssues([]);
  };

  const search = () : void => {
    const searchValues : Array<string> = searchValue.toString().split(',').map(s => s.trim());
    setKeywords((oldArr:Array<string>) => [...oldArr, ...searchValues]);
  };

  const firstPage = () : void => {
    setCurrentPage(1);
  };

  const nextPage = () : void => {
    setCurrentPage(currentPage + 1);
  };

  const previousPage = () : void => {
    setCurrentPage(currentPage - 1);
  };

  const lastPage = () : void => {
    if (numberOfPages) {
      setCurrentPage(numberOfPages);
    };
  };

  const redirect = (id: string) : void => {
    if (!id) return undefined;
    history.push('/issue/' + id);
  };

  const getIssues = (keywords? : Array<string>) => {
    resetStates();

    let url : string = `${backendUrl}/issues`;
    if (keywords) {
      url += `?q=${keywords.toString()}`;
    }
    axios.get(url)
      .then(res => {
        if (res.status === 400) {
          setError(true);
          setKeywords([]);
        } else if (res.status === 200) {
          setData((state: any) => [...state, res?.data][0]);
          setFetched(true);
          setKeywords([]);
        }
      }).catch(() => {
        setError(true);
      });
  };

  useEffect(() => {
    getIssues();
  }, []);

  useEffect(() => {
    if (keywords.length > 0) {
      getIssues(keywords);
    }
  }, [keywords]);

  useEffect(() => {
    if (fetched && data) {
      const numberOfPages : number = Math.ceil(data.length / itemsPerPage);
      setNumberOfPages(numberOfPages);
    }
  }, [fetched]);

  useEffect(() => {
    if (numberOfPages != null && data) {
      const newArr : IIssue[][] = splitArray(data, itemsPerPage);
      setPaginatedIssues((oldArr: any) => [...oldArr, newArr][0]);
      setLoaded(true);
    }
  }, [numberOfPages]);

  return (
    <div>
      {searchInput} <button onClick={search}>search</button>
      {!error && loaded
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
          {paginatedIssues?.length > 0 && <div>
            <button onClick={firstPage} disabled={currentPage === 1}>First page</button>
            <button onClick={nextPage} disabled={currentPage === numberOfPages}>Next Page</button>
            <button onClick={previousPage} disabled={currentPage === 1}>Previous Page</button>
            <button onClick={lastPage} disabled={currentPage === numberOfPages}>Last Page</button>
          </div>}
        </>
        : <p>loading</p>
      }
    </div>

  );
};

export default IssuesItems;
