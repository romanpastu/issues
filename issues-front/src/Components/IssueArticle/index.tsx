/* eslint-disable camelcase */
import React from 'react';

type IProps = {
    slug : string,
    redirect: Function,
    cover_image: string,
    name: string,
    id: string
}

const IssueArticle: React.FC<IProps> = ({ slug, redirect, id, cover_image, name }) => {
  return (
        <article key={slug} onClick={() => redirect(id)}>
            <img className="article-img" src={cover_image} alt={name} />
            <h1 className="article-title">
                {name}
            </h1>
        </article>
  );
};

export default IssueArticle;
