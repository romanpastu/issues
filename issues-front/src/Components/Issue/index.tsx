import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { backendUrl } from '../../constants';
import axios from 'axios';

const Issue = ({ history }: any) => {
  const location = useLocation();
  const filteredlocation = location.pathname.split('/')[2];

  const [data, setData] = useState<any>([]);
  const [error, setError] = useState<any>(false);

  const goBack = () => {
    history.push('/home');
  };

  const getIssue = () => {
    axios.get(`${backendUrl}/issues/${filteredlocation}`)
      .then(res => {
        if (res.status === 400) {
          setError(true);
        } else if (res.status === 200) {
          setData((state: any) => [...state, res?.data]);
        }
      }).catch(() => {
        setError(true);
      });
  };

  useEffect(() => {
    getIssue();
  }, []);

  return (
    <>
      {data && data.length > 0 && !error
        ? <>
        <img className="article-img" src={data[0].cover_image} alt={data[0].name} />
        <p>Title: {data[0].name}</p>
        <p>Description: {data[0].description}</p>
        </>
        : <p>404 not found</p>
      }
      <button onClick={goBack}>goBack</button>

  </>
  );
};

export default Issue;
