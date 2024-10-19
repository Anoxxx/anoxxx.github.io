import React from 'react';
import { Link } from 'react-router-dom';

import Main from '../layouts/Main';
import PublicationCell from '../components/Publications/Cell';
import data from '../data/publications';

const Publications = () => {
  const authorName = 'Zhengfei Zhang'; // Replace with your actual name

  return (
    <Main title="Publications" description="Explore my research and publications.">
      <article className="post" id="publications">
        <header>
          <div className="title">
            <h2>
              <Link to="/publications">Publications</Link>
            </h2>
            <p>A collection of researches that I am not too ashamed of</p>
          </div>
        </header>
        {data.map((publication) => (
          <PublicationCell data={publication} key={publication.id} authorName={authorName} />
        ))}
      </article>
    </Main>
  );
};

export default Publications;
