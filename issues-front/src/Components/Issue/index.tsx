import React, { useEffect, useState } from 'react';
import { useLocation, RouteComponentProps } from 'react-router-dom';
import { backendUrl } from '../../constants';
import axios from 'axios';
import './issue.css';

type IIssue = {
  id: number,
  name: string,
  // eslint-disable-next-line camelcase
  cover_image: string,
  description: string
}

const Issue: React.FC<RouteComponentProps> = ({ history }) => {
  const location = useLocation();
  const filteredlocation: string = location.pathname.split('/')[2];
  const [data, setData] = useState<Array<IIssue>>([]);
  const [error, setError] = useState<boolean>(false);

  const goBack = (): void => {
    history.push('/home');
  };

  const getIssue = (): void => {
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
    <div className="issueContainer">
      {data && data.length > 0 && !error
        ? <><div className="img-container">
          <img className="article-img-issue" src={data[0].cover_image} alt={data[0].name} />
        </div>
          <div className="text-container">
            <p><b>Title</b>: {data[0].name}</p>
            <p><b>Description</b>: {data[0].description}</p>
          </div> </>
        : <div>
          <p>404 not found</p>
        </div>
      }
      <button className="custom-btn btn1" onClick={goBack}>Go back</button>
    </div>

  );
};

export default Issue;
