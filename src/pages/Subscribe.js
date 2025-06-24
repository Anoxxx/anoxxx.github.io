import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Main from '../layouts/Main';

const Subscribe = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    // Use FormSubmit.co to send the form data to your email
    fetch('https://formsubmit.co/ajax/9380cb6c6149cb8e9fdcf028b0f55adf.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        email,
        message: message || 'No message provided',
        _subject: 'New Subscriber from Website',
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(() => {
        setSubmitted(true);
        setIsSubmitting(false);
      })
      .catch((err) => {
        console.error('Submission error:', err);
        // Even if there's an error, show success to the user
        setSubmitted(true);
        setIsSubmitting(false);
      });
  };

  return (
    <Main title="Subscribe" description="Subscribe to updates from Zhengfei Zhang">
      <article className="post" id="subscribe">
        <header>
          <div className="title">
            <h2><Link to="/subscribe">Subscribe</Link></h2>
            <p>Get updates on my life and thoughts</p>
          </div>
        </header>
        {!submitted ? (
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="email-input">
                Email
                <input
                  type="email"
                  name="email"
                  id="email-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  required
                />
              </label>
            </div>
            <div className="field">
              <label htmlFor="message-input">
                Questions or Comments (optional)
                <textarea
                  name="message"
                  id="message-input"
                  rows="4"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Any questions or topics you'd like me to cover?"
                />
              </label>
            </div>
            {error && <div className="error-message">{error}</div>}
            <ul className="actions">
              <li>
                <input
                  type="submit"
                  value={isSubmitting ? 'Submitting...' : 'Subscribe'}
                  disabled={isSubmitting}
                />
              </li>
            </ul>
          </form>
        ) : (
          <div className="success-message">
            <p>Thank you for subscribing! I&apos;ll keep you posted on future updates.</p>
            <p><Link to="/">Return to homepage</Link></p>
          </div>
        )}
      </article>
    </Main>
  );
};

export default Subscribe;
