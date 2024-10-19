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
        Welcome to my website.
        <br /><br />
        I am currently a{' '}
        <a href="https://www.schwarzmanscholars.org">Schwarzman Scholar</a>
        , studying for a Master of Global Affairs.
        I graduated from{' '}
        <a href="http://www.teep.cnmm.tsinghua.edu.cn">Tsien&apos;s Class</a>{' '}
        at Tsinghua University in June 2024
        specializing in Mechanics and Computer Science, and{' '}
        was awarded a degree with honors.
        I was born and raised in Hangzhou, China.
        And Hangzhou is still my favorite city in the world.
        <br /><br />
        I am recently really interested in the intersection of artificial intelligence{' '}
        and real-world needs,
        such as climate and policy sectors, with a research and product focus.
        This interest also motivates my previous researches in{' '}
        <a href="https://scholar.google.com/citations?view_op=view_citation&hl=en&user=XibJqasAAAAJ&authuser=1&citation_for_view=XibJqasAAAAJ:u-x6o8ySG0sC">evolution strategies</a>{' '}
        and{' '}
        <a href="https://scholar.google.com/citations?view_op=view_citation&hl=en&user=XibJqasAAAAJ&authuser=1&citation_for_view=XibJqasAAAAJ:u5HHmVD_uO8C">reinforcement learning</a>.
        <br /><br />
        My first name has a literal meaning of &apos;right and wrong&apos; in Chinese,
        and that is why I love duality and antithesis, science and humanities.
        <br /><br />
        Please feel free to read more{' '}
        <Link to="/miscellanies">about me</Link>, or you can check out my{' '}
        <Link to="/resume">resume</Link>, <Link to="/publications">publications</Link>, or{' '}
        <Link to="/contact">contact</Link> me.
      </p>
      {/*
      <p>
        {' '}
        Source available{' '}
        <a href="https://github.com/mldangelo/personal-site">here</a>.
      </p>
      */}
    </article>
  </Main>
);

export default Index;
