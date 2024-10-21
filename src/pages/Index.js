import React from 'react';
import { Link } from 'react-router-dom';

import Main from '../layouts/Main';

const Index = () => (
  <Main
    description={
      "Zhengfei Zhang's Personal Website"
      + 'Zhengfei Zhang'
    }
  >
    <article className="post" id="index">
      <header>
        <div className="title">
          <h2>
            <Link to="/"> I dream</Link>
          </h2>
          <p>
            a dream with duality and antithesis.
          </p>
        </div>
      </header>
      <p>
        {' '}
        Welcome to my website, I am Zhengfei Zhang, or you can also call me Fei.
        <br /><br />
        I am currently a{' '}
        <a href="https://www.schwarzmanscholars.org">Schwarzman Scholar</a>
        , studying for a Master of Global Affairs.
        I graduated from{' '}
        <a href="http://www.teep.cnmm.tsinghua.edu.cn">Tsien&apos;s Class</a>{' '}
        at Tsinghua University in June 2024
        specializing in Mechanics and Computer Science, and{' '}
        was awarded a degree with honors.
        <br /><br />
        I am interested in the broad study of decision making theoretically and practically,
        with a sustainability focus when it comes to real-world applications.
        Here are some topics that recently went to my mind and my hand:
        <ul>
          <li>
            How does the real world system impose difficulties on reinforcement learning?
            And how to address these difficulties theoretically?<a href="https://scholar.google.com/citations?view_op=view_citation&hl=en&user=XibJqasAAAAJ&authuser=1&citation_for_view=XibJqasAAAAJ:u5HHmVD_uO8C"> [1]</a>
          </li>
          <li>
            How to parse grammar from climate policy documents in different dimensions?
            And can we in turn build a tool to assist revision? [working thesis]
          </li>
        </ul>
        One more thing.
        I love duality and antithesis, and you can find reasons or outcomes reflected in me.
        <ul>
          <li>My first name has a literal meaning of &apos;right and wrong&apos; in Chinese.</li>
          <li>
            My favorite city is Hangzhou, China, where a great lake sits at the center,{' '}
            and thousands years of Chinese culture lies within the lake.
          </li>
        </ul>
        Please feel free to read more{' '}
        <Link to="/miscellanies">about me</Link>, or you can check out my{' '}
        <a href="/resume_zhengfei.pdf" target="_blank" rel="noopener noreferrer">resume</a>{' '}
        and <Link to="/publications">publications</Link>.
      </p>
      {/*
      <p>
        Source available{' '}
        <a href="https://github.com/mldangelo/personal-site">here</a>.
      </p>
      */}
    </article>
  </Main>
);

export default Index;
