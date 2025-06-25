import React from 'react';
import { Link } from 'react-router-dom';

import Main from '../layouts/Main';
import PublicationCell from '../components/Publications/Cell';
import data from '../data/publications';

const Research = () => {
  const authorName = 'Zhengfei Zhang';

  return (
    <Main title="Research" description="Explore my research interests and publications.">
      <article className="post" id="research">
        <header>
          <div className="title">
            <h2>
              <Link to="/research">Research</Link>
            </h2>
            <p>A collection of research that I am not too ashamed of</p>
          </div>
        </header>
        <p>
          To me, research and entrepreneurship are quite alike: you are responsible for your work
          and your team while creating something new. The allure of grounded exploration is my
          antidote to modern or post-modern nihilism, which is why I have pursued both equally
          for the past five years.
          <br /><br />
          Although I am now paving my way on the startup side, I remain passionate about
          reading and conducting research, and I hope to continue doing so in the future.
        </p>
        <div className="research-interests">
          <h3>Research Interests</h3>
          <p>
            I am interested in decision-making that bridges artificial intelligence
            and societal needs:
            Computational models give abstraction, societal systems give databases and constraints,
            and decition-making with responsibility stands between.
            Here are some topics that recently went to my mind and my hand:
          </p>
          <ul>
            <li>
              How does the outdated data and real-world constraints occur in societal systems
              impose difficulties on reinforcement learning?
              And how to address these difficulties provably?<a href="https://scholar.google.com/citations?view_op=view_citation&hl=en&user=XibJqasAAAAJ&authuser=1&citation_for_view=XibJqasAAAAJ:u5HHmVD_uO8C"> [1]</a>
            </li>
            <li>
              How to extract contextual variations and the implied preference in crafting incentives
              from Chinese environmental governance documents ? [Master Thesis]
            </li>
          </ul>
        </div>
        <h3>Published Work</h3>
        {data.map((publication) => (
          <PublicationCell data={publication} key={publication.id} authorName={authorName} />
        ))}
      </article>
    </Main>
  );
};

export default Research;
