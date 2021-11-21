import React, { useEffect, useState } from 'react';
import { useLocation, RouteComponentProps } from 'react-router-dom';
import { backendUrl } from '../../constants';
import axios from 'axios';
type IIssue = {
  id: number,
  name: string,
  // eslint-disable-next-line camelcase
  cover_image: string,
  description: string
}

const Issue : React.FC<RouteComponentProps> = ({ history }) => {
  const location = useLocation();
  const filteredlocation : string = location.pathname.split('/')[2];
  const [data, setData] = useState<Array<IIssue>>([]);
  const [error, setError] = useState<boolean>(false);

  const goBack = () : void => {
    history.push('/home');
  };

  const getIssue = () : void => {
    axios.get(`${backendUrl}/issues/${filteredlocation}`)
      .then(res => {
        if (res.status === 400) {
          setError(true);
        } else if (res.status === 200) {
          setData((state: Array<IIssue>) => [...state, res?.data]);
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
