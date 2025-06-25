import React from 'react';
import { Link } from 'react-router-dom';

import ContactIcons from '../Contact/ContactIcons';

const { PUBLIC_URL } = process.env; // set automatically from package.json:homepage

const SideBar = () => (
  <section id="sidebar" style={{ fontStretch: 'expanded' }}>
    <section id="intro">
      <Link to="/" className="logo">
        <img src={`${PUBLIC_URL}/images/me.jpg`} alt="" />
      </Link>
      <header>
        <h2>Zhengfei Zhang</h2>
        <h3>张
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;正非&nbsp;&nbsp;[&#x0288;&#x0282;&#x0259;&#x0302;&#x014b; f&#x00e9;i]
        </h3>
      </header>
    </section>
    <section className="blurb">
      <h2>About</h2>
      <p>
        Hi, I am Zhengfei.
        I am building a startup to automate scientific research into information edges.
        More broadly, in my previous research and industrial practice, I try
        to connect artificial intelligence (decision-making)
        and real-world needs (education, policy, and biotech) in a bilateral way.
        I am an alum of{' '}
        <a href="https://www.schwarzmanscholars.org/">Schwarzman Scholar</a>
        {' '}and Tsinghua{' '}
        <a href="https://www.teep.cnmm.tsinghua.edu.cn">Tsien&apos;s Class</a>.
      </p>
      <ul className="actions">
        <li>
          {window.location.pathname.includes('/miscellanies') ? (
            <a href="/resume_zhengfei.pdf" target="_blank" rel="noopener noreferrer" className="button">
              Learn More
            </a>
          ) : (
            <Link to="/miscellanies" className="button">
              Learn More
            </Link>
          )}
        </li>
      </ul>
    </section>

    <section id="footer">
      <ContactIcons />
      <p className="copyright">
        &copy; Zhengfei Zhang <Link to="/">zhengfei.info</Link>.
      </p>
    </section>
  </section>
);

export default SideBar;
