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
            a dream about duality and antithesis<br />
            a society where everyone prospers together
          </p>
        </div>
      </header>
      <p>
        {' '}
        Welcome to my website, I am Zhengfei, or Fei in brief.
        <br /><br />
        <b>I am building a startup to automate scientific research into information edges</b>.
        More boradly, my startup is built upon the intuition of general technology revolution:
        <ul>
          <li>
            AI is automating
            things into natural languages that unspecialized tasks and hierarchy;
          </li>
          <li>
            Such unspecialization
            has drastically different forms when diffusing into different industries.
          </li>
        </ul>
        <Link to="/subscribe" className="mailing-list-link">Keep posted for future articles about these intuitions and my startup!</Link>
        <br />
        And please feel free to read more{' '}
        <Link to="/miscellanies"><b>about me</b></Link>, check out my previous{' '}
        <Link to="/research"><b>research</b></Link>, or contact me via{' '}
        <a href="mailto:trorooro@gmail.com">email</a>.
        {/* Zhengfei(正非), in Mandarin,
        means &apos;correct and wrong&apos;, or, amusingly, &apos;yes, but..&apos;.
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
        Please feel free to read more{' '}
        <Link to="/miscellanies">about me</Link>, check out my{' '}
        <a href="/resume_zhengfei.pdf" target="_blank" rel="noopener noreferrer">resume</a>{' '}
        and <Link to="/research">research</Link>, or contact me via{' '}
        <a href="mailto:trorooro@gmail.com">email</a>. */}
      </p>
      {/* Embed publications preview below the main content
      <header><br /><br /></header>
      <h2><Link to="/research">Recent Publications</Link></h2>
      {data.slice(0, 2).map((publication) => (
        <PublicationCell data={publication} key={publication.id} authorName="Zhengfei Zhang" />
      ))}
      <p>
        <Link to="/research">See all research and publications →</Link>
      </p> */}
    </article>
  </Main>
);

export default Index;
