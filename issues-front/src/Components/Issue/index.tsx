import React from 'react';
import issuesJson from '../../mockData/issues.json';
import { useLocation } from 'react-router-dom';

// slug console-34595-146303

const Issue = ({ history } : any) => {
  const location = useLocation();
  const filteredlocation = location.pathname.split('/')[2];
  const toDisplayEl = issuesJson.filter(i => i.slug === filteredlocation)[0];

  const goBack = () => {
    history.push('/home');
  };

  return (
    <>
      <p>This is the issue {filteredlocation}</p>
      <div>
        <img className="article-img" src={toDisplayEl.cover_image} alt={toDisplayEl.name} />
        <p>Title: {toDisplayEl.name}</p>
        <p>Description: {toDisplayEl.description}</p>
        <button onClick={goBack}>goBack</button>
      </div>
    </>
  );
};

export default Issue;
