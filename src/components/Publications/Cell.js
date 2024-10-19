// src/components/Publications/PublicationCell.js
import React from 'react';
import PropTypes from 'prop-types';
import './PublicationCell.css';

const PublicationCell = ({ data, authorName }) => {
  // Format authors and highlight your name in bold if it matches
  const formattedAuthors = data.authors.map(
    (author) => (author === authorName ? <strong key={author}>{author}</strong> : author),
  );

  return (
    <div className="publication-cell">
      <div className="publication-header">
        <h3 className="publication-title">
          <a href={data.link} target="_blank" rel="noopener noreferrer">
            {data.title}
          </a>
        </h3>
        <p className="publication-authors">
          {formattedAuthors.reduce((prev, curr) => [prev, ', ', curr])}
        </p>
        <p className="publication-source">{data.source}</p>
      </div>
    </div>
  );
};

PublicationCell.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    authors: PropTypes.arrayOf(PropTypes.string).isRequired,
    year: PropTypes.number.isRequired,
    image: PropTypes.string,
    source: PropTypes.string.isRequired,
  }).isRequired,
  authorName: PropTypes.string.isRequired,
};

export default PublicationCell;
